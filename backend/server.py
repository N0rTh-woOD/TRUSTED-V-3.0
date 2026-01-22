from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage
import json
import jwt
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# LLM Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Auth Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    username: str
    password_hash: str
    is_admin: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

# Hardware Models
class HardwarePeripheral(BaseModel):
    name: str
    type: str
    interface: str

class Hardware(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    manufacturer: str
    core: str
    clock_speed: str
    memory: str
    flash: str
    peripherals: List[HardwarePeripheral]
    description: str
    image_url: Optional[str] = None
    price: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class HardwareCreate(BaseModel):
    name: str
    manufacturer: str
    core: str
    clock_speed: str
    memory: str
    flash: str
    peripherals: List[HardwarePeripheral]
    description: str
    image_url: Optional[str] = None
    price: Optional[str] = None

class Middleware(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str
    version: str
    description: str
    compatible_cores: List[str]
    logo_url: Optional[str] = None

class MiddlewareCreate(BaseModel):
    name: str
    type: str  # RTOS, BSP, SDK, Driver, Bootloader, Framework
    version: str
    description: str
    compatible_cores: List[str]
    compatible_hardware: List[str] = []  # Specific hardware IDs
    logo_url: Optional[str] = None
    download_url: Optional[str] = None
    documentation_url: Optional[str] = None

# Software Component Categories
COMPONENT_TYPES = ["RTOS", "BSP", "SDK", "Driver", "Bootloader", "Framework", "Library"]

class SoftwareComponent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str  # One of COMPONENT_TYPES
    version: str
    description: str
    compatible_cores: List[str] = []
    compatible_hardware: List[str] = []  # Hardware IDs
    features: List[str] = []
    logo_url: Optional[str] = None
    download_url: Optional[str] = None
    documentation_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SoftwareComponentCreate(BaseModel):
    name: str
    type: str
    version: str
    description: str
    compatible_cores: List[str] = []
    compatible_hardware: List[str] = []
    features: List[str] = []
    logo_url: Optional[str] = None
    download_url: Optional[str] = None
    documentation_url: Optional[str] = None

# User Account Update Models
class UserProfileUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None

class UserPasswordChange(BaseModel):
    current_password: str
    new_password: str

class BSP(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    version: str
    description: str
    compatible_hardware: List[str]

class SDK(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    version: str
    description: str
    download_url: Optional[str] = None

class ProjectVersion(BaseModel):
    version: int
    generated_at: datetime
    requirements: str
    hardware_id: str
    middleware_ids: List[str]
    peripherals: List[str]
    bsp_id: Optional[str] = None
    sdk_id: Optional[str] = None

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    name: str
    description: str
    hardware_id: str
    middleware_ids: List[str]
    peripherals: List[str] = []
    bsp_id: Optional[str] = None
    sdk_id: Optional[str] = None
    versions: List[ProjectVersion] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_id: Optional[str] = None
    role: str
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class IDEDownload(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    version: str
    platform: str
    download_url: str
    size: str
    description: str

class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str
    suggested_hardware: Optional[List[Dict[str, Any]]] = None
    suggested_middleware: Optional[List[Dict[str, Any]]] = None

class ProjectCreate(BaseModel):
    name: str
    description: str
    hardware_id: str
    middleware_ids: List[str]
    peripherals: List[str] = []
    bsp_id: Optional[str] = None
    sdk_id: Optional[str] = None
    requirements: str

class ProjectUpdate(BaseModel):
    hardware_id: Optional[str] = None
    middleware_ids: Optional[List[str]] = None
    peripherals: Optional[List[str]] = None
    bsp_id: Optional[str] = None
    sdk_id: Optional[str] = None
    requirements: Optional[str] = None

# Auth helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin_user(current_user: dict = Depends(get_current_user)):
    if not current_user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# Initialize sample data
async def init_sample_data():
    # Create admin user if not exists
    admin_exists = await db.users.find_one({"email": "admin@rvrust.com"})
    if not admin_exists:
        admin = User(
            email="admin@rvrust.com",
            username="admin",
            password_hash=get_password_hash("admin123"),
            is_admin=True
        )
        admin_dict = admin.model_dump()
        admin_dict['created_at'] = admin_dict['created_at'].isoformat()
        await db.users.insert_one(admin_dict)
        logging.info("Admin user created: admin@rvrust.com / admin123")
    
    # Check if data exists
    hardware_count = await db.hardware.count_documents({})
    if hardware_count == 0:
        sample_hardware = [
            {
                "id": str(uuid.uuid4()),
                "name": "SiFive HiFive1 Rev B",
                "manufacturer": "SiFive",
                "core": "RISC-V E31",
                "clock_speed": "320 MHz",
                "memory": "16 KB",
                "flash": "4 MB",
                "image_url": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
                "price": "$59",
                "peripherals": [
                    {"name": "GPIO", "type": "Digital I/O", "interface": "19 pins"},
                    {"name": "UART", "type": "Serial", "interface": "2 channels"},
                    {"name": "SPI", "type": "Serial Peripheral", "interface": "1 channel"},
                    {"name": "I2C", "type": "Two-Wire", "interface": "1 channel"},
                    {"name": "PWM", "type": "Pulse Width Modulation", "interface": "8 channels"}
                ],
                "description": "Arduino-compatible dev board with RISC-V core, perfect for IoT and embedded applications",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Kendryte K210",
                "manufacturer": "Canaan",
                "core": "RISC-V Dual Core 64-bit",
                "clock_speed": "400 MHz",
                "memory": "8 MB",
                "flash": "16 MB",
                "image_url": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
                "price": "$129",
                "peripherals": [
                    {"name": "Camera Interface", "type": "DVP", "interface": "Dual camera"},
                    {"name": "Audio", "type": "I2S", "interface": "8 channels"},
                    {"name": "LCD", "type": "Display", "interface": "8-bit MCU"},
                    {"name": "GPIO", "type": "Digital I/O", "interface": "32 pins"},
                    {"name": "Neural Network Processor", "type": "KPU", "interface": "Dedicated AI accelerator"}
                ],
                "description": "AI-capable RISC-V board with neural network processor, ideal for edge AI and vision applications",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "ESP32-C3",
                "manufacturer": "Espressif",
                "core": "RISC-V Single Core 32-bit",
                "clock_speed": "160 MHz",
                "memory": "400 KB",
                "flash": "4 MB",
                "image_url": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
                "price": "$39",
                "peripherals": [
                    {"name": "WiFi", "type": "Wireless", "interface": "802.11 b/g/n"},
                    {"name": "Bluetooth", "type": "Wireless", "interface": "BLE 5.0"},
                    {"name": "GPIO", "type": "Digital I/O", "interface": "22 pins"},
                    {"name": "ADC", "type": "Analog", "interface": "6 channels 12-bit"},
                    {"name": "SPI", "type": "Serial Peripheral", "interface": "3 channels"}
                ],
                "description": "WiFi/BLE enabled RISC-V microcontroller, perfect for IoT projects with wireless connectivity",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "StarFive VisionFive 2",
                "manufacturer": "StarFive",
                "core": "RISC-V Quad Core 64-bit",
                "clock_speed": "1.5 GHz",
                "memory": "8 GB",
                "flash": "eMMC/SD Card",
                "image_url": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
                "price": "$249",
                "peripherals": [
                    {"name": "Ethernet", "type": "Network", "interface": "Gigabit"},
                    {"name": "USB", "type": "Universal Serial Bus", "interface": "4x USB 3.0"},
                    {"name": "HDMI", "type": "Display", "interface": "4K output"},
                    {"name": "GPIO", "type": "Digital I/O", "interface": "40-pin header"},
                    {"name": "PCIe", "type": "Expansion", "interface": "Gen 2 x1"}
                ],
                "description": "High-performance RISC-V SBC for embedded Linux, suitable for edge computing and development",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.hardware.insert_many(sample_hardware)
        
        sample_middleware = [
            {
                "id": str(uuid.uuid4()),
                "name": "FreeRTOS",
                "type": "RTOS",
                "version": "10.5.1",
                "description": "Popular real-time operating system kernel, lightweight and suitable for microcontrollers",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit"],
                "logo_url": "https://www.freertos.org/logo.png"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Zephyr RTOS",
                "type": "RTOS",
                "version": "3.5.0",
                "description": "Scalable real-time operating system for connected, resource-constrained devices",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit", "RISC-V Quad Core 64-bit"],
                "logo_url": "https://www.zephyrproject.org/logo.png"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Embassy",
                "type": "Async Framework",
                "version": "0.3.0",
                "description": "Modern async Rust framework for embedded systems, optimized for RISC-V",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit"],
                "logo_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RTIC",
                "type": "Concurrency Framework",
                "version": "2.1.0",
                "description": "Real-Time Interrupt-driven Concurrency framework for Rust on RISC-V",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit"],
                "logo_url": None
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RT-Thread",
                "type": "RTOS",
                "version": "5.0.2",
                "description": "Open source IoT operating system with comprehensive middleware components",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit", "RISC-V Quad Core 64-bit"],
                "logo_url": None
            }
        ]
        await db.middleware.insert_many(sample_middleware)
        
        sample_ide = [
            {
                "id": str(uuid.uuid4()),
                "name": "RISC-V Rust Studio",
                "version": "1.2.0",
                "platform": "Windows x64",
                "download_url": "#",
                "size": "450 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for Windows"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RISC-V Rust Studio",
                "version": "1.2.0",
                "platform": "macOS",
                "download_url": "#",
                "size": "420 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for macOS"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RISC-V Rust Studio",
                "version": "1.2.0",
                "platform": "Linux x64",
                "download_url": "#",
                "size": "380 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for Linux"
            }
        ]
        await db.ide_downloads.insert_many(sample_ide)

@app.on_event("startup")
async def startup_event():
    await init_sample_data()

# Auth endpoints
@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserRegister):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = User(
        email=user_data.email,
        username=user_data.username,
        password_hash=get_password_hash(user_data.password),
        is_admin=False
    )
    
    user_dict = user.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    await db.users.insert_one(user_dict)
    
    # Create token
    access_token = create_access_token(data={"sub": user.id})
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "is_admin": user.is_admin
        }
    )

@api_router.post("/auth/login", response_model=Token)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user={
            "id": user["id"],
            "email": user["email"],
            "username": user["username"],
            "is_admin": user.get("is_admin", False)
        }
    )

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "username": current_user["username"],
        "is_admin": current_user.get("is_admin", False)
    }

# Chat endpoint with AI
@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    try:
        # Save user message
        user_msg = ChatMessage(
            session_id=request.session_id,
            user_id=current_user["id"],
            role="user",
            content=request.message
        )
        user_msg_dict = user_msg.model_dump()
        user_msg_dict['timestamp'] = user_msg_dict['timestamp'].isoformat()
        await db.chat_messages.insert_one(user_msg_dict)
        
        # Get hardware and middleware data for AI context
        hardware_list = await db.hardware.find({}, {"_id": 0}).to_list(100)
        middleware_list = await db.middleware.find({}, {"_id": 0}).to_list(100)
        
        # Initialize LLM
        system_message = f"""You are an expert AI assistant for RISC-V embedded systems development with Rust.
Your role is to analyze user requirements and suggest the best hardware and middleware from our catalog.

Available Hardware:
{json.dumps([{"name": hw["name"], "core": hw["core"], "description": hw["description"]} for hw in hardware_list], indent=2)}

Available Middleware:
{json.dumps([{"name": mw["name"], "type": mw["type"], "description": mw["description"]} for mw in middleware_list], indent=2)}

When user describes their project:
1. Analyze their requirements (performance, peripherals, features)
2. Recommend 1-3 most suitable hardware boards with clear reasoning
3. Recommend compatible middleware options
4. Be conversational and helpful
5. Ask clarifying questions if needed

Provide recommendations in a friendly, technical tone."""
        
        chat_instance = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=request.session_id,
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        # Send message
        user_message = UserMessage(text=request.message)
        ai_response = await chat_instance.send_message(user_message)
        
        # Save AI response
        ai_msg = ChatMessage(
            session_id=request.session_id,
            user_id=current_user["id"],
            role="assistant",
            content=ai_response
        )
        ai_msg_dict = ai_msg.model_dump()
        ai_msg_dict['timestamp'] = ai_msg_dict['timestamp'].isoformat()
        await db.chat_messages.insert_one(ai_msg_dict)
        
        # Detect hardware and middleware mentions
        suggested_hw = [hw for hw in hardware_list if hw["name"].lower() in ai_response.lower()]
        suggested_mw = [mw for mw in middleware_list if mw["name"].lower() in ai_response.lower()]
        
        return ChatResponse(
            response=ai_response,
            session_id=request.session_id,
            suggested_hardware=suggested_hw[:3] if suggested_hw else None,
            suggested_middleware=suggested_mw if suggested_mw else None
        )
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Hardware endpoints
@api_router.get("/hardware", response_model=List[Hardware])
async def get_hardware():
    hardware = await db.hardware.find({}, {"_id": 0}).to_list(1000)
    for hw in hardware:
        if isinstance(hw.get('created_at'), str):
            hw['created_at'] = datetime.fromisoformat(hw['created_at'])
    return hardware

@api_router.get("/hardware/{hardware_id}", response_model=Hardware)
async def get_hardware_by_id(hardware_id: str):
    hardware = await db.hardware.find_one({"id": hardware_id}, {"_id": 0})
    if not hardware:
        raise HTTPException(status_code=404, detail="Hardware not found")
    if isinstance(hardware.get('created_at'), str):
        hardware['created_at'] = datetime.fromisoformat(hardware['created_at'])
    return hardware

# Admin - Hardware CRUD
@api_router.post("/admin/hardware", response_model=Hardware)
async def create_hardware(hardware_data: HardwareCreate, current_user: dict = Depends(get_current_admin_user)):
    hardware = Hardware(**hardware_data.model_dump())
    hardware_dict = hardware.model_dump()
    hardware_dict['created_at'] = hardware_dict['created_at'].isoformat()
    await db.hardware.insert_one(hardware_dict)
    return hardware

@api_router.put("/admin/hardware/{hardware_id}", response_model=Hardware)
async def update_hardware(hardware_id: str, hardware_data: HardwareCreate, current_user: dict = Depends(get_current_admin_user)):
    existing = await db.hardware.find_one({"id": hardware_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Hardware not found")
    
    update_data = hardware_data.model_dump()
    await db.hardware.update_one({"id": hardware_id}, {"$set": update_data})
    
    updated = await db.hardware.find_one({"id": hardware_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@api_router.delete("/admin/hardware/{hardware_id}")
async def delete_hardware(hardware_id: str, current_user: dict = Depends(get_current_admin_user)):
    result = await db.hardware.delete_one({"id": hardware_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Hardware not found")
    return {"message": "Hardware deleted successfully"}

# Middleware endpoints
@api_router.get("/middleware", response_model=List[Middleware])
async def get_middleware():
    middleware = await db.middleware.find({}, {"_id": 0}).to_list(1000)
    return middleware

@api_router.get("/middleware/compatible/{core}", response_model=List[Middleware])
async def get_compatible_middleware(core: str):
    middleware = await db.middleware.find(
        {"compatible_cores": core},
        {"_id": 0}
    ).to_list(1000)
    return middleware

# Admin - Middleware CRUD
@api_router.post("/admin/middleware", response_model=Middleware)
async def create_middleware(middleware_data: MiddlewareCreate, current_user: dict = Depends(get_current_admin_user)):
    middleware = Middleware(**middleware_data.model_dump())
    middleware_dict = middleware.model_dump()
    await db.middleware.insert_one(middleware_dict)
    return middleware

@api_router.put("/admin/middleware/{middleware_id}", response_model=Middleware)
async def update_middleware(middleware_id: str, middleware_data: MiddlewareCreate, current_user: dict = Depends(get_current_admin_user)):
    existing = await db.middleware.find_one({"id": middleware_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Middleware not found")
    
    update_data = middleware_data.model_dump()
    await db.middleware.update_one({"id": middleware_id}, {"$set": update_data})
    
    updated = await db.middleware.find_one({"id": middleware_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/middleware/{middleware_id}")
async def delete_middleware(middleware_id: str, current_user: dict = Depends(get_current_admin_user)):
    result = await db.middleware.delete_one({"id": middleware_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Middleware not found")
    return {"message": "Middleware deleted successfully"}

# Project endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_user_projects(current_user: dict = Depends(get_current_user)):
    projects = await db.projects.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    for proj in projects:
        if isinstance(proj.get('created_at'), str):
            proj['created_at'] = datetime.fromisoformat(proj['created_at'])
        if isinstance(proj.get('updated_at'), str):
            proj['updated_at'] = datetime.fromisoformat(proj['updated_at'])
        for ver in proj.get('versions', []):
            if isinstance(ver.get('generated_at'), str):
                ver['generated_at'] = datetime.fromisoformat(ver['generated_at'])
    return projects

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate, current_user: dict = Depends(get_current_user)):
    version = ProjectVersion(
        version=1,
        generated_at=datetime.now(timezone.utc),
        requirements=project_data.requirements,
        hardware_id=project_data.hardware_id,
        middleware_ids=project_data.middleware_ids,
        peripherals=project_data.peripherals,
        bsp_id=project_data.bsp_id,
        sdk_id=project_data.sdk_id
    )
    
    project = Project(
        user_id=current_user["id"],
        name=project_data.name,
        description=project_data.description,
        hardware_id=project_data.hardware_id,
        middleware_ids=project_data.middleware_ids,
        peripherals=project_data.peripherals,
        bsp_id=project_data.bsp_id,
        sdk_id=project_data.sdk_id,
        versions=[version]
    )
    
    project_dict = project.model_dump()
    project_dict['created_at'] = project_dict['created_at'].isoformat()
    project_dict['updated_at'] = project_dict['updated_at'].isoformat()
    project_dict['versions'][0]['generated_at'] = project_dict['versions'][0]['generated_at'].isoformat()
    
    await db.projects.insert_one(project_dict)
    return project

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, update_data: ProjectUpdate, current_user: dict = Depends(get_current_user)):
    existing = await db.projects.find_one({"id": project_id, "user_id": current_user["id"]}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Create new version if any config changed
    changed = False
    if update_data.hardware_id and update_data.hardware_id != existing["hardware_id"]:
        changed = True
    if update_data.middleware_ids and update_data.middleware_ids != existing["middleware_ids"]:
        changed = True
    if update_data.peripherals and update_data.peripherals != existing.get("peripherals", []):
        changed = True
    
    if changed:
        # Create new version
        new_version_num = len(existing["versions"]) + 1
        new_version = {
            "version": new_version_num,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "requirements": update_data.requirements or existing["versions"][-1]["requirements"],
            "hardware_id": update_data.hardware_id or existing["hardware_id"],
            "middleware_ids": update_data.middleware_ids or existing["middleware_ids"],
            "peripherals": update_data.peripherals or existing.get("peripherals", []),
            "bsp_id": update_data.bsp_id or existing.get("bsp_id"),
            "sdk_id": update_data.sdk_id or existing.get("sdk_id")
        }
        
        await db.projects.update_one(
            {"id": project_id},
            {
                "$set": {
                    "hardware_id": update_data.hardware_id or existing["hardware_id"],
                    "middleware_ids": update_data.middleware_ids or existing["middleware_ids"],
                    "peripherals": update_data.peripherals or existing.get("peripherals", []),
                    "bsp_id": update_data.bsp_id or existing.get("bsp_id"),
                    "sdk_id": update_data.sdk_id or existing.get("sdk_id"),
                    "updated_at": datetime.now(timezone.utc).isoformat()
                },
                "$push": {"versions": new_version}
            }
        )
    
    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    for ver in updated.get('versions', []):
        if isinstance(ver.get('generated_at'), str):
            ver['generated_at'] = datetime.fromisoformat(ver['generated_at'])
    return updated

@api_router.get("/projects/{project_id}/download/{version}")
async def download_project(project_id: str, version: int, current_user: dict = Depends(get_current_user)):
    project = await db.projects.find_one({"id": project_id, "user_id": current_user["id"]}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # In a real implementation, generate ZIP file here
    return {"download_url": f"#download-{project_id}-v{version}", "message": "Project download feature coming soon"}

# IDE Downloads
@api_router.get("/ide-downloads", response_model=List[IDEDownload])
async def get_ide_downloads():
    downloads = await db.ide_downloads.find({}, {"_id": 0}).to_list(1000)
    return downloads

# Admin - User management
@api_router.get("/admin/users")
async def get_all_users(current_user: dict = Depends(get_current_admin_user)):
    users = await db.users.find({}, {"_id": 0, "password_hash": 0}).to_list(1000)
    for user in users:
        if isinstance(user.get('created_at'), str):
            user['created_at'] = datetime.fromisoformat(user['created_at'])
    return users

@api_router.delete("/admin/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_admin_user)):
    if user_id == current_user["id"]:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    result = await db.users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

# Admin - Stats
@api_router.get("/admin/stats")
async def get_admin_stats(current_user: dict = Depends(get_current_admin_user)):
    hardware_count = await db.hardware.count_documents({})
    middleware_count = await db.middleware.count_documents({})
    software_count = await db.software_components.count_documents({})
    users_count = await db.users.count_documents({})
    projects_count = await db.projects.count_documents({})
    ide_count = await db.ide_downloads.count_documents({})
    
    # Get counts by software component type
    software_by_type = {}
    for ctype in COMPONENT_TYPES:
        count = await db.software_components.count_documents({"type": ctype})
        software_by_type[ctype] = count
    
    return {
        "hardware": hardware_count,
        "middleware": middleware_count,
        "software_components": software_count,
        "software_by_type": software_by_type,
        "users": users_count,
        "projects": projects_count,
        "ide_downloads": ide_count
    }

# Chat history
@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str, current_user: dict = Depends(get_current_user)):
    messages = await db.chat_messages.find(
        {"session_id": session_id, "user_id": current_user["id"]},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(1000)
    
    for msg in messages:
        if isinstance(msg.get('timestamp'), str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return {"messages": messages}

# User Account Management (Self-service)
@api_router.put("/account/profile")
async def update_user_profile(update_data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    update_fields = {}
    
    if update_data.username:
        update_fields["username"] = update_data.username
    
    if update_data.email:
        # Check if email already exists
        existing = await db.users.find_one({"email": update_data.email, "id": {"$ne": current_user["id"]}})
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        update_fields["email"] = update_data.email
    
    if update_fields:
        await db.users.update_one({"id": current_user["id"]}, {"$set": update_fields})
    
    updated_user = await db.users.find_one({"id": current_user["id"]}, {"_id": 0, "password_hash": 0})
    return updated_user

@api_router.put("/account/password")
async def change_password(password_data: UserPasswordChange, current_user: dict = Depends(get_current_user)):
    # Get full user with password hash
    user = await db.users.find_one({"id": current_user["id"]})
    
    if not verify_password(password_data.current_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    new_hash = get_password_hash(password_data.new_password)
    await db.users.update_one({"id": current_user["id"]}, {"$set": {"password_hash": new_hash}})
    
    return {"message": "Password changed successfully"}

@api_router.delete("/account")
async def delete_own_account(current_user: dict = Depends(get_current_user)):
    # Delete user's projects
    await db.projects.delete_many({"user_id": current_user["id"]})
    # Delete user's chat messages
    await db.chat_messages.delete_many({"user_id": current_user["id"]})
    # Delete user account
    await db.users.delete_one({"id": current_user["id"]})
    
    return {"message": "Account deleted successfully"}

@api_router.get("/account/projects/stats")
async def get_user_project_stats(current_user: dict = Depends(get_current_user)):
    projects = await db.projects.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(1000)
    
    total_projects = len(projects)
    total_versions = sum(len(p.get("versions", [])) for p in projects)
    
    # Get unique hardware and middleware used
    hardware_ids = set()
    middleware_ids = set()
    for p in projects:
        hardware_ids.add(p.get("hardware_id"))
        middleware_ids.update(p.get("middleware_ids", []))
    
    return {
        "total_projects": total_projects,
        "total_versions": total_versions,
        "unique_hardware_used": len(hardware_ids),
        "unique_middleware_used": len(middleware_ids)
    }

# Delete user's own project
@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.projects.delete_one({"id": project_id, "user_id": current_user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# Software Components CRUD (Admin)
@api_router.get("/software-components")
async def get_software_components(component_type: Optional[str] = None):
    query = {}
    if component_type:
        query["type"] = component_type
    components = await db.software_components.find(query, {"_id": 0}).to_list(1000)
    return components

@api_router.get("/software-components/compatible/{hardware_id}")
async def get_compatible_software(hardware_id: str):
    hardware = await db.hardware.find_one({"id": hardware_id}, {"_id": 0})
    if not hardware:
        raise HTTPException(status_code=404, detail="Hardware not found")
    
    core = hardware.get("core", "")
    components = await db.software_components.find({
        "$or": [
            {"compatible_cores": core},
            {"compatible_hardware": hardware_id}
        ]
    }, {"_id": 0}).to_list(1000)
    return components

@api_router.post("/admin/software-components", response_model=SoftwareComponent)
async def create_software_component(component_data: SoftwareComponentCreate, current_user: dict = Depends(get_current_admin_user)):
    if component_data.type not in COMPONENT_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid type. Must be one of: {COMPONENT_TYPES}")
    
    component = SoftwareComponent(**component_data.model_dump())
    component_dict = component.model_dump()
    component_dict['created_at'] = component_dict['created_at'].isoformat()
    await db.software_components.insert_one(component_dict)
    return component

@api_router.put("/admin/software-components/{component_id}", response_model=SoftwareComponent)
async def update_software_component(component_id: str, component_data: SoftwareComponentCreate, current_user: dict = Depends(get_current_admin_user)):
    existing = await db.software_components.find_one({"id": component_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Component not found")
    
    if component_data.type not in COMPONENT_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid type. Must be one of: {COMPONENT_TYPES}")
    
    update_data = component_data.model_dump()
    await db.software_components.update_one({"id": component_id}, {"$set": update_data})
    
    updated = await db.software_components.find_one({"id": component_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@api_router.delete("/admin/software-components/{component_id}")
async def delete_software_component(component_id: str, current_user: dict = Depends(get_current_admin_user)):
    result = await db.software_components.delete_one({"id": component_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Component not found")
    return {"message": "Component deleted successfully"}

# Admin - IDE Management
@api_router.post("/admin/ide-downloads", response_model=IDEDownload)
async def create_ide_download(ide_data: dict, current_user: dict = Depends(get_current_admin_user)):
    ide = IDEDownload(**ide_data)
    ide_dict = ide.model_dump()
    await db.ide_downloads.insert_one(ide_dict)
    return ide

@api_router.put("/admin/ide-downloads/{ide_id}", response_model=IDEDownload)
async def update_ide_download(ide_id: str, ide_data: dict, current_user: dict = Depends(get_current_admin_user)):
    existing = await db.ide_downloads.find_one({"id": ide_id})
    if not existing:
        raise HTTPException(status_code=404, detail="IDE download not found")
    
    await db.ide_downloads.update_one({"id": ide_id}, {"$set": ide_data})
    updated = await db.ide_downloads.find_one({"id": ide_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/ide-downloads/{ide_id}")
async def delete_ide_download(ide_id: str, current_user: dict = Depends(get_current_admin_user)):
    result = await db.ide_downloads.delete_one({"id": ide_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="IDE download not found")
    return {"message": "IDE download deleted successfully"}

# Get component types
@api_router.get("/component-types")
async def get_component_types():
    return {"types": COMPONENT_TYPES}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()