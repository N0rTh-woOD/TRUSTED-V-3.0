from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage
import json

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

# LLM Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Models
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
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Middleware(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: str
    version: str
    description: str
    compatible_cores: List[str]

class ProjectVersion(BaseModel):
    version: int
    generated_at: datetime
    requirements: str
    hardware_id: str
    middleware_ids: List[str]

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    hardware_id: str
    middleware_ids: List[str]
    versions: List[ProjectVersion] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
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
    detected_hardware: Optional[List[str]] = None
    detected_middleware: Optional[List[str]] = None

# Initialize sample data
async def init_sample_data():
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
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Zephyr RTOS",
                "type": "RTOS",
                "version": "3.5.0",
                "description": "Scalable real-time operating system for connected, resource-constrained devices",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit", "RISC-V Quad Core 64-bit"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Embassy",
                "type": "Async Framework",
                "version": "0.3.0",
                "description": "Modern async Rust framework for embedded systems, optimized for RISC-V",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RTIC",
                "type": "Concurrency Framework",
                "version": "2.1.0",
                "description": "Real-Time Interrupt-driven Concurrency framework for Rust on RISC-V",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit"]
            },
            {
                "id": str(uuid.uuid4()),
                "name": "RT-Thread",
                "type": "RTOS",
                "version": "5.0.2",
                "description": "Open source IoT operating system with comprehensive middleware components",
                "compatible_cores": ["RISC-V E31", "RISC-V Single Core 32-bit", "RISC-V Dual Core 64-bit", "RISC-V Quad Core 64-bit"]
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

# Chat endpoint with AI
@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Save user message
        user_msg = ChatMessage(
            session_id=request.session_id,
            role="user",
            content=request.message
        )
        user_msg_dict = user_msg.model_dump()
        user_msg_dict['timestamp'] = user_msg_dict['timestamp'].isoformat()
        await db.chat_messages.insert_one(user_msg_dict)
        
        # Get chat history for context
        history = await db.chat_messages.find(
            {"session_id": request.session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(50)
        
        # Initialize LLM
        system_message = """You are an expert AI assistant for RISC-V embedded systems development with Rust.
Your role is to:
1. Analyze user requirements for embedded systems projects
2. Recommend suitable RISC-V hardware boards based on their needs
3. Suggest appropriate middleware (RTOS, frameworks) for their application
4. Detect changes in requirements and alert users

When analyzing requirements, consider:
- Performance needs (CPU speed, cores)
- Peripherals required (GPIO, UART, SPI, I2C, WiFi, BLE, etc.)
- Memory and storage requirements
- Power constraints
- Specific features (AI, wireless, display, etc.)

Provide clear, technical recommendations with reasoning."""
        
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
            role="assistant",
            content=ai_response
        )
        ai_msg_dict = ai_msg.model_dump()
        ai_msg_dict['timestamp'] = ai_msg_dict['timestamp'].isoformat()
        await db.chat_messages.insert_one(ai_msg_dict)
        
        # Try to detect hardware and middleware mentions
        hardware_list = await db.hardware.find({}, {"_id": 0, "name": 1, "id": 1}).to_list(100)
        middleware_list = await db.middleware.find({}, {"_id": 0, "name": 1, "id": 1}).to_list(100)
        
        detected_hw = [hw["name"] for hw in hardware_list if hw["name"].lower() in ai_response.lower()]
        detected_mw = [mw["name"] for mw in middleware_list if mw["name"].lower() in ai_response.lower()]
        
        return ChatResponse(
            response=ai_response,
            session_id=request.session_id,
            detected_hardware=detected_hw if detected_hw else None,
            detected_middleware=detected_mw if detected_mw else None
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

# Project endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(1000)
    for proj in projects:
        if isinstance(proj.get('created_at'), str):
            proj['created_at'] = datetime.fromisoformat(proj['created_at'])
        for ver in proj.get('versions', []):
            if isinstance(ver.get('generated_at'), str):
                ver['generated_at'] = datetime.fromisoformat(ver['generated_at'])
    return projects

class ProjectCreate(BaseModel):
    name: str
    description: str
    hardware_id: str
    middleware_ids: List[str]
    requirements: str

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    version = ProjectVersion(
        version=1,
        generated_at=datetime.now(timezone.utc),
        requirements=project_data.requirements,
        hardware_id=project_data.hardware_id,
        middleware_ids=project_data.middleware_ids
    )
    
    project = Project(
        name=project_data.name,
        description=project_data.description,
        hardware_id=project_data.hardware_id,
        middleware_ids=project_data.middleware_ids,
        versions=[version]
    )
    
    project_dict = project.model_dump()
    project_dict['created_at'] = project_dict['created_at'].isoformat()
    project_dict['versions'][0]['generated_at'] = project_dict['versions'][0]['generated_at'].isoformat()
    
    await db.projects.insert_one(project_dict)
    return project

# IDE Downloads
@api_router.get("/ide-downloads", response_model=List[IDEDownload])
async def get_ide_downloads():
    downloads = await db.ide_downloads.find({}, {"_id": 0}).to_list(1000)
    return downloads

# Chat history
@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    messages = await db.chat_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(1000)
    
    for msg in messages:
        if isinstance(msg.get('timestamp'), str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return {"messages": messages}

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