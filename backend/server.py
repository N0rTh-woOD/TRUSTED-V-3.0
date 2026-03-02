from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import StreamingResponse
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
import zipfile
import io
import asyncio

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

# LLM Settings Model (Admin configurable)
class LLMSettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = "llm_settings"  # Singleton
    provider: str = "gemini"  # openai, anthropic, gemini
    model: str = "gemini-3-flash-preview"
    api_key_type: str = "emergent"  # emergent or custom
    custom_api_key: Optional[str] = None
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_by: Optional[str] = None

class LLMSettingsUpdate(BaseModel):
    provider: str
    model: str
    api_key_type: str = "emergent"
    custom_api_key: Optional[str] = None

# Project Generation Models
class ProjectGenerationRequest(BaseModel):
    name: str
    description: str
    hardware_id: str
    middleware_ids: List[str]
    software_component_ids: List[str] = []
    peripherals: List[str] = []
    additional_requirements: str = ""

class GeneratedFile(BaseModel):
    path: str
    content: str

class ProjectGenerationResponse(BaseModel):
    project_id: str
    version: int
    files: List[GeneratedFile]
    message: str

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

# LLM Helper Functions
async def get_llm_settings():
    """Get current LLM settings from database or return defaults"""
    settings = await db.llm_settings.find_one({"id": "llm_settings"}, {"_id": 0})
    if not settings:
        return {
            "id": "llm_settings",
            "provider": "gemini",
            "model": "gemini-3-flash-preview",
            "api_key_type": "emergent",
            "custom_api_key": None
        }
    return settings

async def get_llm_chat(session_id: str, system_message: str):
    """Create LLM chat instance based on current settings"""
    settings = await get_llm_settings()
    
    # Determine API key to use
    if settings.get("api_key_type") == "custom" and settings.get("custom_api_key"):
        api_key = settings["custom_api_key"]
    else:
        api_key = EMERGENT_LLM_KEY
    
    chat = LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message=system_message
    )
    
    # Configure provider and model
    provider = settings.get("provider", "gemini")
    model = settings.get("model", "gemini-3-flash-preview")
    chat.with_model(provider, model)
    
    return chat

# Code Generation Templates
def get_cargo_toml_template(project_name: str, hardware: dict, middleware: list, software: list):
    """Generate Cargo.toml content"""
    deps = []
    
    # Add riscv dependencies
    deps.append('riscv = "0.11"')
    deps.append('riscv-rt = "0.12"')
    deps.append('panic-halt = "0.2"')
    
    # Add embedded-hal
    deps.append('embedded-hal = "1.0"')
    
    # Add middleware-specific dependencies
    for mw in middleware:
        if "freertos" in mw.get("name", "").lower():
            deps.append('# FreeRTOS integration (configure based on your setup)')
        if "zephyr" in mw.get("name", "").lower():
            deps.append('# Zephyr RTOS integration')
    
    deps_str = "\n".join(deps)
    
    return f'''[package]
name = "{project_name.lower().replace(" ", "_").replace("-", "_")}"
version = "0.1.0"
edition = "2021"
authors = ["TrusteD-V Project Generator"]

[dependencies]
{deps_str}

[profile.release]
opt-level = "s"
lto = true
codegen-units = 1
debug = false

[profile.dev]
opt-level = 1
debug = true
'''

def get_memory_x_template(hardware: dict):
    """Generate memory.x linker script based on hardware"""
    memory_size = hardware.get("memory", "16 KB").upper()
    flash_size = hardware.get("flash", "4 MB").upper()
    
    # Parse memory sizes
    mem_kb = 16
    if "KB" in memory_size:
        mem_kb = int(memory_size.replace("KB", "").strip())
    elif "MB" in memory_size:
        mem_kb = int(memory_size.replace("MB", "").strip()) * 1024
    
    flash_kb = 4096
    if "KB" in flash_size:
        flash_kb = int(flash_size.replace("KB", "").strip())
    elif "MB" in flash_size:
        flash_kb = int(flash_size.replace("MB", "").strip()) * 1024
    
    return f'''/* Memory layout for {hardware.get("name", "RISC-V")} */
/* Core: {hardware.get("core", "RISC-V")} @ {hardware.get("clock_speed", "Unknown")} */

MEMORY
{{
    FLASH : ORIGIN = 0x20000000, LENGTH = {flash_kb}K
    RAM   : ORIGIN = 0x80000000, LENGTH = {mem_kb}K
}}

REGION_ALIAS("REGION_TEXT", FLASH);
REGION_ALIAS("REGION_RODATA", FLASH);
REGION_ALIAS("REGION_DATA", RAM);
REGION_ALIAS("REGION_BSS", RAM);
REGION_ALIAS("REGION_HEAP", RAM);
REGION_ALIAS("REGION_STACK", RAM);
'''

def get_cargo_config_template(hardware: dict):
    """Generate .cargo/config.toml"""
    core = hardware.get("core", "").lower()
    
    # Determine target based on core
    if "64" in core:
        target = "riscv64imac-unknown-none-elf"
    elif "32" in core or "e31" in core:
        target = "riscv32imac-unknown-none-elf"
    else:
        target = "riscv32imac-unknown-none-elf"
    
    return f'''[build]
target = "{target}"

[target.{target}]
runner = "qemu-system-riscv32 -machine virt -nographic -semihosting-config enable=on -kernel"
rustflags = [
    "-C", "link-arg=-Tmemory.x",
    "-C", "link-arg=-Tlink.x",
]

[env]
DEFMT_LOG = "trace"
'''

def get_build_rs_template():
    """Generate build.rs"""
    return '''use std::env;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;

fn main() {
    // Put the linker script somewhere the linker can find it
    let out = &PathBuf::from(env::var_os("OUT_DIR").unwrap());
    
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(include_bytes!("memory.x"))
        .unwrap();
    
    println!("cargo:rustc-link-search={}", out.display());
    println!("cargo:rerun-if-changed=memory.x");
    println!("cargo:rerun-if-changed=build.rs");
}
'''

async def generate_code_with_llm(
    project_name: str,
    description: str,
    hardware: dict,
    middleware: list,
    software: list,
    peripherals: list,
    additional_requirements: str
):
    """Use LLM to generate main.rs and driver code"""
    
    system_prompt = """You are an expert embedded systems developer specializing in RISC-V architecture and Rust programming.
You generate production-quality, well-documented Rust code for embedded systems.
Always include proper error handling, safety comments, and follow Rust embedded best practices.
Use #![no_std] and #![no_main] attributes for embedded projects.
Include detailed comments explaining the code structure and hardware interactions."""
    
    # Build the prompt with all project details
    peripheral_list = ", ".join(peripherals) if peripherals else "None specified"
    middleware_names = ", ".join([m.get("name", "") for m in middleware]) if middleware else "None"
    software_names = ", ".join([s.get("name", "") for s in software]) if software else "None"
    
    user_prompt = f"""Generate a complete Rust embedded project for RISC-V with the following specifications:

**Project Name:** {project_name}
**Description:** {description}

**Hardware:**
- Board: {hardware.get("name", "Unknown")}
- Manufacturer: {hardware.get("manufacturer", "Unknown")}
- Core: {hardware.get("core", "RISC-V")}
- Clock Speed: {hardware.get("clock_speed", "Unknown")}
- Memory: {hardware.get("memory", "Unknown")}
- Flash: {hardware.get("flash", "Unknown")}

**Middleware/RTOS:** {middleware_names}

**Software Components:** {software_names}

**Peripherals to Initialize:** {peripheral_list}

**Additional Requirements:** {additional_requirements if additional_requirements else "None"}

Please generate the following files in JSON format with this exact structure:
{{
    "files": [
        {{"path": "src/main.rs", "content": "..."}},
        {{"path": "src/lib.rs", "content": "..."}},
        {{"path": "src/drivers/mod.rs", "content": "..."}},
        {{"path": "src/drivers/gpio.rs", "content": "..."}},
        {{"path": "src/drivers/uart.rs", "content": "..."}}
    ]
}}

Requirements for the code:
1. Use #![no_std] and #![no_main] for bare-metal
2. Include proper panic handler using panic-halt
3. Initialize all specified peripherals
4. Add comprehensive documentation comments
5. Include a main loop with example usage
6. Create driver modules for each peripheral type
7. Use embedded-hal traits where appropriate
8. Include proper memory safety considerations

Return ONLY the JSON object, no additional text or markdown formatting."""

    try:
        chat = await get_llm_chat(
            session_id=f"codegen-{uuid.uuid4()}",
            system_message=system_prompt
        )
        
        response = await chat.send_message(UserMessage(text=user_prompt))
        
        # Parse the JSON response
        # Clean up response if it has markdown code blocks
        response_text = response.strip()
        if response_text.startswith("```"):
            # Remove markdown code blocks
            lines = response_text.split("\n")
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines[-1].strip() == "```":
                lines = lines[:-1]
            response_text = "\n".join(lines)
        
        try:
            result = json.loads(response_text)
            return result.get("files", [])
        except json.JSONDecodeError:
            # If JSON parsing fails, create a basic structure
            logging.error(f"Failed to parse LLM response as JSON: {response_text[:500]}")
            return get_fallback_code_files(project_name, hardware, peripherals)
            
    except Exception as e:
        logging.error(f"LLM code generation failed: {str(e)}")
        return get_fallback_code_files(project_name, hardware, peripherals)

def get_fallback_code_files(project_name: str, hardware: dict, peripherals: list):
    """Generate basic code files if LLM fails"""
    
    peripheral_inits = ""
    for p in peripherals:
        peripheral_inits += f"    // TODO: Initialize {p}\n"
    
    main_rs = f'''#![no_std]
#![no_main]

use panic_halt as _;
use riscv_rt::entry;

mod drivers;

/// Entry point for {project_name}
/// Hardware: {hardware.get("name", "RISC-V Board")}
/// Core: {hardware.get("core", "RISC-V")}
#[entry]
fn main() -> ! {{
    // Initialize hardware
{peripheral_inits if peripheral_inits else "    // No peripherals configured"}
    
    // Main application loop
    loop {{
        // TODO: Add your application logic here
        riscv::asm::wfi(); // Wait for interrupt
    }}
}}
'''

    lib_rs = f'''#![no_std]

//! {project_name} - RISC-V Embedded Project
//! 
//! Generated by TrusteD-V Platform
//! Hardware: {hardware.get("name", "Unknown")}

pub mod drivers;

/// Board configuration constants
pub mod config {{
    /// System clock frequency in Hz
    pub const CLOCK_FREQ: u32 = {hardware.get("clock_speed", "320 MHz").replace(" MHz", "").replace(" ", "")}000000;
}}
'''

    drivers_mod = '''//! Hardware drivers module

pub mod gpio;
pub mod uart;

pub use gpio::*;
pub use uart::*;
'''

    gpio_driver = '''//! GPIO Driver for RISC-V
//! 
//! Provides basic GPIO functionality

use embedded_hal::digital::{InputPin, OutputPin, ErrorType};

/// GPIO Pin representation
pub struct GpioPin {
    pin_number: u8,
    is_output: bool,
}

impl GpioPin {
    /// Create a new GPIO pin
    pub const fn new(pin_number: u8) -> Self {
        Self {
            pin_number,
            is_output: false,
        }
    }
    
    /// Configure pin as output
    pub fn into_output(mut self) -> Self {
        self.is_output = true;
        // TODO: Configure hardware registers
        self
    }
    
    /// Configure pin as input
    pub fn into_input(mut self) -> Self {
        self.is_output = false;
        // TODO: Configure hardware registers
        self
    }
}

#[derive(Debug)]
pub struct GpioError;

impl embedded_hal::digital::Error for GpioError {
    fn kind(&self) -> embedded_hal::digital::ErrorKind {
        embedded_hal::digital::ErrorKind::Other
    }
}

impl ErrorType for GpioPin {
    type Error = GpioError;
}

impl OutputPin for GpioPin {
    fn set_low(&mut self) -> Result<(), Self::Error> {
        // TODO: Set pin low via hardware register
        Ok(())
    }
    
    fn set_high(&mut self) -> Result<(), Self::Error> {
        // TODO: Set pin high via hardware register
        Ok(())
    }
}

impl InputPin for GpioPin {
    fn is_high(&mut self) -> Result<bool, Self::Error> {
        // TODO: Read pin state from hardware register
        Ok(false)
    }
    
    fn is_low(&mut self) -> Result<bool, Self::Error> {
        // TODO: Read pin state from hardware register
        Ok(true)
    }
}
'''

    uart_driver = '''//! UART Driver for RISC-V
//! 
//! Provides serial communication functionality

use embedded_hal::serial::{ErrorType, Write};

/// UART peripheral
pub struct Uart {
    base_address: usize,
    baud_rate: u32,
}

impl Uart {
    /// Create a new UART instance
    pub const fn new(base_address: usize, baud_rate: u32) -> Self {
        Self {
            base_address,
            baud_rate,
        }
    }
    
    /// Initialize the UART peripheral
    pub fn init(&mut self) {
        // TODO: Configure UART registers
        // - Set baud rate divisor
        // - Enable TX/RX
        // - Configure data format (8N1)
    }
    
    /// Write a byte to UART
    pub fn write_byte(&mut self, byte: u8) {
        // TODO: Wait for TX buffer empty, then write byte
        let _ = byte;
    }
    
    /// Read a byte from UART (blocking)
    pub fn read_byte(&mut self) -> u8 {
        // TODO: Wait for RX data available, then read byte
        0
    }
}

#[derive(Debug)]
pub struct UartError;

impl embedded_hal::serial::Error for UartError {
    fn kind(&self) -> embedded_hal::serial::ErrorKind {
        embedded_hal::serial::ErrorKind::Other
    }
}

impl ErrorType for Uart {
    type Error = UartError;
}

impl Write for Uart {
    fn write(&mut self, buf: &[u8]) -> Result<(), Self::Error> {
        for byte in buf {
            self.write_byte(*byte);
        }
        Ok(())
    }
    
    fn flush(&mut self) -> Result<(), Self::Error> {
        // TODO: Wait for TX complete
        Ok(())
    }
}
'''

    return [
        {"path": "src/main.rs", "content": main_rs},
        {"path": "src/lib.rs", "content": lib_rs},
        {"path": "src/drivers/mod.rs", "content": drivers_mod},
        {"path": "src/drivers/gpio.rs", "content": gpio_driver},
        {"path": "src/drivers/uart.rs", "content": uart_driver},
    ]

def create_project_zip(
    project_name: str,
    files: list,
    cargo_toml: str,
    memory_x: str,
    cargo_config: str,
    build_rs: str,
    readme: str
):
    """Create a ZIP file containing all project files"""
    
    zip_buffer = io.BytesIO()
    
    safe_name = project_name.lower().replace(" ", "_").replace("-", "_")
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
        # Add Cargo.toml
        zf.writestr(f"{safe_name}/Cargo.toml", cargo_toml)
        
        # Add memory.x
        zf.writestr(f"{safe_name}/memory.x", memory_x)
        
        # Add .cargo/config.toml
        zf.writestr(f"{safe_name}/.cargo/config.toml", cargo_config)
        
        # Add build.rs
        zf.writestr(f"{safe_name}/build.rs", build_rs)
        
        # Add README.md
        zf.writestr(f"{safe_name}/README.md", readme)
        
        # Add generated source files
        for file in files:
            file_path = file.get("path", "")
            file_content = file.get("content", "")
            if file_path and file_content:
                zf.writestr(f"{safe_name}/{file_path}", file_content)
        
        # Add .gitignore
        gitignore = '''target/
Cargo.lock
*.swp
*.swo
.DS_Store
'''
        zf.writestr(f"{safe_name}/.gitignore", gitignore)
    
    zip_buffer.seek(0)
    return zip_buffer

# Initialize sample data
async def init_sample_data():
    # Create admin user if not exists - Updated credentials
    admin_exists = await db.users.find_one({"email": "admin@trusted-v.com"})
    if not admin_exists:
        admin = User(
            email="admin@trusted-v.com",
            username="admin",
            password_hash=get_password_hash("bosch@2425"),
            is_admin=True
        )
        admin_dict = admin.model_dump()
        admin_dict['created_at'] = admin_dict['created_at'].isoformat()
        await db.users.insert_one(admin_dict)
        logging.info("Admin user created")
    else:
        # Update existing admin password to new credentials
        await db.users.update_one(
            {"email": "admin@trusted-v.com"},
            {"$set": {"password_hash": get_password_hash("bosch@2425")}}
        )
        logging.info("Admin password updated")
    
    # Create sample users (not displayed anywhere on the platform)
    sample_users = [
        {"email": "developer@example.com", "username": "developer", "password": "dev@12345"},
        {"email": "engineer@example.com", "username": "engineer", "password": "eng@12345"},
        {"email": "tester@example.com", "username": "tester", "password": "test@12345"},
    ]
    for user_data in sample_users:
        user_exists = await db.users.find_one({"email": user_data["email"]})
        if not user_exists:
            user = User(
                email=user_data["email"],
                username=user_data["username"],
                password_hash=get_password_hash(user_data["password"]),
                is_admin=False
            )
            user_dict = user.model_dump()
            user_dict['created_at'] = user_dict['created_at'].isoformat()
            await db.users.insert_one(user_dict)
    
    # Check if data exists - Use ONLY Indian RISC-V hardware
    hardware_count = await db.hardware.count_documents({})
    # Clear existing hardware to replace with Indian boards only
    if hardware_count > 0:
        await db.hardware.delete_many({})
    
    # Indian RISC-V Hardware Only - Mindgrove and C-DAC chips only
    indian_hardware = [
        {
            "id": str(uuid.uuid4()),
            "name": "ARIES V3.0",
            "manufacturer": "C-DAC",
            "core": "VEGA ET1031 32-bit RISC-V",
            "clock_speed": "100 MHz",
            "memory": "256 KB SRAM",
            "flash": "External SPI Flash",
            "image_url": None,
            "price": "₹2,500",
            "peripherals": [
                {"name": "GPIO", "type": "Digital I/O", "interface": "32 pins"},
                {"name": "UART", "type": "Serial", "interface": "3 channels"},
                {"name": "SPI", "type": "Serial Peripheral", "interface": "2 channels"},
                {"name": "I2C", "type": "Two-Wire", "interface": "2 channels"},
                {"name": "Timer", "type": "Timer/Counter", "interface": "4 channels"}
            ],
            "description": "Made in India RISC-V development board with VEGA processor from C-DAC, ideal for IoT and embedded applications",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "ARIES IoT v2",
            "manufacturer": "C-DAC",
            "core": "VEGA RISC-V 32-bit",
            "clock_speed": "80 MHz",
            "memory": "128 KB SRAM",
            "flash": "4 MB External",
            "image_url": None,
            "price": "₹1,800",
            "peripherals": [
                {"name": "GPIO", "type": "Digital I/O", "interface": "24 pins"},
                {"name": "UART", "type": "Serial", "interface": "2 channels"},
                {"name": "SPI", "type": "Serial Peripheral", "interface": "1 channel"},
                {"name": "I2C", "type": "Two-Wire", "interface": "1 channel"},
                {"name": "ADC", "type": "Analog", "interface": "4 channels 12-bit"}
            ],
            "description": "Compact IoT-focused RISC-V board from C-DAC for sensor networks, wearables and edge computing",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "VEGA DHRUV64 Evaluation",
            "manufacturer": "C-DAC",
            "core": "VEGA AS2161 DHRUV64 Dual-Core 64-bit",
            "clock_speed": "1 GHz",
            "memory": "2 GB DDR4",
            "flash": "eMMC/SD Card",
            "image_url": None,
            "price": "₹25,000",
            "peripherals": [
                {"name": "Ethernet", "type": "Network", "interface": "Gigabit"},
                {"name": "USB", "type": "Universal Serial Bus", "interface": "USB 3.0"},
                {"name": "HDMI", "type": "Display", "interface": "1080p output"},
                {"name": "GPIO", "type": "Digital I/O", "interface": "40-pin header"},
                {"name": "PCIe", "type": "Expansion", "interface": "Gen 2"}
            ],
            "description": "High-performance dual-core 64-bit RISC-V board from C-DAC for Linux, 5G, and automotive applications",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Mindgrove Secure IoT SoC",
            "manufacturer": "Mindgrove Technologies",
            "core": "RISC-V 32-bit Secure Core",
            "clock_speed": "200 MHz",
            "memory": "512 KB SRAM",
            "flash": "8 MB QSPI",
            "image_url": None,
            "price": "₹4,500",
            "peripherals": [
                {"name": "GPIO", "type": "Digital I/O", "interface": "48 pins"},
                {"name": "UART", "type": "Serial", "interface": "4 channels"},
                {"name": "SPI", "type": "Serial Peripheral", "interface": "2 channels"},
                {"name": "I2C", "type": "Two-Wire", "interface": "2 channels"},
                {"name": "Crypto Engine", "type": "Security", "interface": "AES/SHA Hardware"}
            ],
            "description": "Secure RISC-V SoC from Mindgrove with hardware crypto acceleration for IoT security applications",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Mindgrove Vision SoC Dev Kit",
            "manufacturer": "Mindgrove Technologies",
            "core": "RISC-V 64-bit with Vision NPU",
            "clock_speed": "800 MHz",
            "memory": "1 GB LPDDR4",
            "flash": "16 MB QSPI + eMMC",
            "image_url": None,
            "price": "₹18,000",
            "peripherals": [
                {"name": "MIPI CSI", "type": "Camera Interface", "interface": "2-lane CSI-2"},
                {"name": "GPIO", "type": "Digital I/O", "interface": "56 pins"},
                {"name": "UART", "type": "Serial", "interface": "3 channels"},
                {"name": "NPU", "type": "Neural Processing", "interface": "2 TOPS INT8"},
                {"name": "USB", "type": "Universal Serial Bus", "interface": "USB 2.0 OTG"}
            ],
            "description": "Vision-focused RISC-V development kit from Mindgrove for AI/ML edge computing, dashcam and CCTV applications",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Mindgrove Industrial SoC",
            "manufacturer": "Mindgrove Technologies",
            "core": "RISC-V 32-bit Industrial Grade",
            "clock_speed": "320 MHz",
            "memory": "256 KB SRAM",
            "flash": "4 MB QSPI",
            "image_url": None,
            "price": "₹6,500",
            "peripherals": [
                {"name": "CAN", "type": "Automotive/Industrial Bus", "interface": "CAN 2.0B"},
                {"name": "GPIO", "type": "Digital I/O", "interface": "64 pins"},
                {"name": "PWM", "type": "Pulse Width Modulation", "interface": "12 channels"},
                {"name": "ADC", "type": "Analog", "interface": "16 channels 12-bit"},
                {"name": "Watchdog", "type": "System", "interface": "Independent WDT"}
            ],
            "description": "Industrial-grade RISC-V SoC from Mindgrove designed for motor control, automation and industrial IoT",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.hardware.insert_many(indian_hardware)
    
    # Update middleware with Indian compatible data
    middleware_count = await db.middleware.count_documents({})
    if middleware_count == 0:
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
    
    # IDE downloads
    ide_count = await db.ide_downloads.count_documents({})
    if ide_count == 0:
        sample_ide = [
            {
                "id": str(uuid.uuid4()),
                "name": "TrusteD-V Studio",
                "version": "1.2.0",
                "platform": "Windows x64",
                "download_url": "#",
                "size": "450 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for Windows"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "TrusteD-V Studio",
                "version": "1.2.0",
                "platform": "macOS",
                "download_url": "#",
                "size": "420 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for macOS"
            },
            {
                "id": str(uuid.uuid4()),
                "name": "TrusteD-V Studio",
                "version": "1.2.0",
                "platform": "Linux x64",
                "download_url": "#",
                "size": "380 MB",
                "description": "Complete IDE with Rust toolchain, debugger, and RISC-V emulator for Linux"
            }
        ]
        await db.ide_downloads.insert_many(sample_ide)
    
    # Add software components
    software_count = await db.software_components.count_documents({})
    if software_count == 0:
        sample_software = [
            {
                "id": str(uuid.uuid4()),
                "name": "Shakti BSP",
                "type": "BSP",
                "version": "2.0.0",
                "description": "Board Support Package for Shakti RISC-V development boards from IIT Madras",
                "compatible_cores": ["Shakti E-Class 32-bit RISC-V", "Shakti C-Class 64-bit RISC-V"],
                "compatible_hardware": [],
                "features": ["GPIO drivers", "UART support", "SPI/I2C drivers", "Clock configuration"],
                "documentation_url": "https://shakti.org.in",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "VEGA SDK",
                "type": "SDK",
                "version": "1.0.0",
                "description": "C-DAC VEGA processor software development kit for ARIES boards",
                "compatible_cores": ["VEGA ET1031 32-bit RISC-V", "VEGA AS2161 DHRUV64 Dual-Core 64-bit"],
                "compatible_hardware": [],
                "features": ["HAL drivers", "FreeRTOS support", "Peripheral libraries", "Example projects"],
                "download_url": "https://vegaprocessors.in",
                "documentation_url": "https://cdac.in/vega",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "riscv-rust-quickstart",
                "type": "SDK",
                "version": "1.0.0",
                "description": "Rust embedded development template for RISC-V microcontrollers",
                "compatible_cores": ["Shakti E-Class 32-bit RISC-V", "VEGA ET1031 32-bit RISC-V"],
                "compatible_hardware": [],
                "features": ["Cargo build system", "Probe-rs debugger support", "Memory layout templates"],
                "download_url": "https://github.com/riscv-rust/riscv-rust-quickstart",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "U-Boot RISC-V",
                "type": "Bootloader",
                "version": "2024.01",
                "description": "Universal Boot Loader for RISC-V platforms, supports SBI and Linux boot",
                "compatible_cores": ["Shakti C-Class 64-bit RISC-V", "VEGA AS2161 DHRUV64 Dual-Core 64-bit"],
                "compatible_hardware": [],
                "features": ["SBI support", "Linux boot", "Device tree support", "Network boot"],
                "download_url": "https://source.denx.de/u-boot/u-boot",
                "documentation_url": "https://u-boot.readthedocs.io",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "OpenSBI",
                "type": "Bootloader",
                "version": "1.4",
                "description": "RISC-V Open Source Supervisor Binary Interface implementation",
                "compatible_cores": ["Shakti C-Class 64-bit RISC-V", "VEGA AS2161 DHRUV64 Dual-Core 64-bit"],
                "compatible_hardware": [],
                "features": ["M-mode firmware", "S-mode support", "Domain support", "HSM extension"],
                "download_url": "https://github.com/riscv-software-src/opensbi",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.software_components.insert_many(sample_software)

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

# LLM Settings Management (Admin)
@api_router.get("/admin/llm-settings")
async def get_llm_settings_endpoint(current_user: dict = Depends(get_current_admin_user)):
    settings = await get_llm_settings()
    # Don't expose custom API key
    if settings.get("custom_api_key"):
        settings["custom_api_key"] = "***configured***"
    return settings

@api_router.put("/admin/llm-settings")
async def update_llm_settings_endpoint(
    settings_update: LLMSettingsUpdate,
    current_user: dict = Depends(get_current_admin_user)
):
    update_data = settings_update.model_dump()
    update_data["id"] = "llm_settings"
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    update_data["updated_by"] = current_user["id"]
    
    await db.llm_settings.update_one(
        {"id": "llm_settings"},
        {"$set": update_data},
        upsert=True
    )
    
    # Return settings without exposing key
    result = update_data.copy()
    if result.get("custom_api_key"):
        result["custom_api_key"] = "***configured***"
    
    return {"message": "LLM settings updated successfully", "settings": result}

@api_router.get("/llm-providers")
async def get_available_llm_providers():
    """Get list of available LLM providers and models"""
    return {
        "providers": [
            {
                "id": "gemini",
                "name": "Google Gemini",
                "models": [
                    {"id": "gemini-3-flash-preview", "name": "Gemini 3 Flash (Recommended)"},
                    {"id": "gemini-3-pro-preview", "name": "Gemini 3 Pro"},
                    {"id": "gemini-2.5-pro", "name": "Gemini 2.5 Pro"},
                    {"id": "gemini-2.5-flash", "name": "Gemini 2.5 Flash"},
                ]
            },
            {
                "id": "openai",
                "name": "OpenAI",
                "models": [
                    {"id": "gpt-5.2", "name": "GPT-5.2"},
                    {"id": "gpt-5.1", "name": "GPT-5.1"},
                    {"id": "gpt-4o", "name": "GPT-4o"},
                ]
            },
            {
                "id": "anthropic",
                "name": "Anthropic",
                "models": [
                    {"id": "claude-sonnet-4-5-20250929", "name": "Claude Sonnet 4.5"},
                    {"id": "claude-4-sonnet-20250514", "name": "Claude 4 Sonnet"},
                    {"id": "claude-opus-4-5-20251101", "name": "Claude Opus 4.5"},
                ]
            }
        ]
    }

# Project Generation Endpoints
@api_router.post("/projects/generate")
async def generate_project(
    request: ProjectGenerationRequest,
    current_user: dict = Depends(get_current_user)
):
    """Generate a new RISC-V Rust project with AI-powered code generation"""
    
    # Fetch hardware details
    hardware = await db.hardware.find_one({"id": request.hardware_id}, {"_id": 0})
    if not hardware:
        raise HTTPException(status_code=404, detail="Hardware not found")
    
    # Fetch middleware details
    middleware = []
    for mw_id in request.middleware_ids:
        mw = await db.middleware.find_one({"id": mw_id}, {"_id": 0})
        if mw:
            middleware.append(mw)
    
    # Fetch software components
    software = []
    for sw_id in request.software_component_ids:
        sw = await db.software_components.find_one({"id": sw_id}, {"_id": 0})
        if sw:
            software.append(sw)
    
    # Generate code using LLM
    generated_files = await generate_code_with_llm(
        project_name=request.name,
        description=request.description,
        hardware=hardware,
        middleware=middleware,
        software=software,
        peripherals=request.peripherals,
        additional_requirements=request.additional_requirements
    )
    
    # Generate template files
    cargo_toml = get_cargo_toml_template(request.name, hardware, middleware, software)
    memory_x = get_memory_x_template(hardware)
    cargo_config = get_cargo_config_template(hardware)
    build_rs = get_build_rs_template()
    
    # Generate README
    readme = f'''# {request.name}

{request.description}

## Hardware Configuration

- **Board:** {hardware.get("name", "Unknown")}
- **Manufacturer:** {hardware.get("manufacturer", "Unknown")}
- **Core:** {hardware.get("core", "RISC-V")}
- **Clock Speed:** {hardware.get("clock_speed", "Unknown")}
- **Memory:** {hardware.get("memory", "Unknown")}
- **Flash:** {hardware.get("flash", "Unknown")}

## Peripherals

{chr(10).join(["- " + p for p in request.peripherals]) if request.peripherals else "None configured"}

## Middleware

{chr(10).join(["- " + m.get("name", "") + " v" + m.get("version", "") for m in middleware]) if middleware else "None"}

## Building

```bash
# Install Rust and the RISC-V target
rustup target add riscv32imac-unknown-none-elf

# Build the project
cargo build --release
```

## Flashing

Refer to your hardware documentation for flashing instructions.

---
Generated by TrusteD-V Platform
'''

    # Check if project already exists for this user with the same name
    existing_project = await db.projects.find_one({
        "user_id": current_user["id"],
        "name": request.name
    }, {"_id": 0})
    
    if existing_project:
        # Update existing project with new version
        project_id = existing_project["id"]
        current_version = len(existing_project.get("versions", []))
        new_version = current_version + 1
        
        version_entry = {
            "version": new_version,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "requirements": request.additional_requirements,
            "hardware_id": request.hardware_id,
            "middleware_ids": request.middleware_ids,
            "software_component_ids": request.software_component_ids,
            "peripherals": request.peripherals,
            "files": generated_files,
            "cargo_toml": cargo_toml,
            "memory_x": memory_x,
            "cargo_config": cargo_config,
            "build_rs": build_rs,
            "readme": readme
        }
        
        await db.projects.update_one(
            {"id": project_id},
            {
                "$push": {"versions": version_entry},
                "$set": {
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                    "hardware_id": request.hardware_id,
                    "middleware_ids": request.middleware_ids,
                    "software_component_ids": request.software_component_ids,
                    "peripherals": request.peripherals,
                    "description": request.description
                }
            }
        )
    else:
        # Create new project
        project_id = str(uuid.uuid4())
        new_version = 1
        
        version_entry = {
            "version": new_version,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "requirements": request.additional_requirements,
            "hardware_id": request.hardware_id,
            "middleware_ids": request.middleware_ids,
            "software_component_ids": request.software_component_ids,
            "peripherals": request.peripherals,
            "files": generated_files,
            "cargo_toml": cargo_toml,
            "memory_x": memory_x,
            "cargo_config": cargo_config,
            "build_rs": build_rs,
            "readme": readme
        }
        
        project = {
            "id": project_id,
            "user_id": current_user["id"],
            "name": request.name,
            "description": request.description,
            "hardware_id": request.hardware_id,
            "middleware_ids": request.middleware_ids,
            "software_component_ids": request.software_component_ids,
            "peripherals": request.peripherals,
            "versions": [version_entry],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.projects.insert_one(project)
    
    return {
        "project_id": project_id,
        "version": new_version,
        "message": f"Project generated successfully (Version {new_version})",
        "files_generated": len(generated_files) + 4  # +4 for Cargo.toml, memory.x, etc.
    }

@api_router.get("/projects/{project_id}/download/{version}")
async def download_project(
    project_id: str,
    version: int,
    current_user: dict = Depends(get_current_user)
):
    """Download a project version as a ZIP file"""
    
    # Fetch project
    project = await db.projects.find_one({
        "id": project_id,
        "user_id": current_user["id"]
    }, {"_id": 0})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Find the specific version
    version_data = None
    for v in project.get("versions", []):
        if v.get("version") == version:
            version_data = v
            break
    
    if not version_data:
        raise HTTPException(status_code=404, detail=f"Version {version} not found")
    
    # Create ZIP file
    zip_buffer = create_project_zip(
        project_name=project["name"],
        files=version_data.get("files", []),
        cargo_toml=version_data.get("cargo_toml", ""),
        memory_x=version_data.get("memory_x", ""),
        cargo_config=version_data.get("cargo_config", ""),
        build_rs=version_data.get("build_rs", ""),
        readme=version_data.get("readme", "")
    )
    
    safe_name = project["name"].lower().replace(" ", "_").replace("-", "_")
    filename = f"{safe_name}_v{version}.zip"
    
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@api_router.get("/projects/{project_id}/versions")
async def get_project_versions(
    project_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get all versions of a project"""
    
    project = await db.projects.find_one({
        "id": project_id,
        "user_id": current_user["id"]
    }, {"_id": 0})
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    versions = []
    for v in project.get("versions", []):
        versions.append({
            "version": v.get("version"),
            "generated_at": v.get("generated_at"),
            "hardware_id": v.get("hardware_id"),
            "middleware_ids": v.get("middleware_ids"),
            "peripherals": v.get("peripherals"),
            "files_count": len(v.get("files", [])) + 4
        })
    
    return {
        "project_id": project_id,
        "project_name": project["name"],
        "versions": versions
    }

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

# IDE Binary Upload Endpoint (Admin Only)
UPLOAD_DIR = ROOT_DIR / "uploads" / "ide"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@api_router.post("/admin/ide-downloads/{ide_id}/upload")
async def upload_ide_binary(
    ide_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_admin_user)
):
    """Upload IDE binary file for a specific platform (Admin only)"""
    # Verify the IDE download entry exists
    ide_entry = await db.ide_downloads.find_one({"id": ide_id})
    if not ide_entry:
        raise HTTPException(status_code=404, detail="IDE download entry not found")
    
    # Validate file extension
    allowed_extensions = ['.exe', '.dmg', '.pkg', '.deb', '.rpm', '.tar.gz', '.zip', '.AppImage']
    file_ext = None
    for ext in allowed_extensions:
        if file.filename.lower().endswith(ext):
            file_ext = ext
            break
    
    if not file_ext:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
        )
    
    # Generate unique filename
    safe_filename = f"{ide_id}_{file.filename.replace(' ', '_')}"
    file_path = UPLOAD_DIR / safe_filename
    
    # Save the file
    try:
        contents = await file.read()
        with open(file_path, 'wb') as f:
            f.write(contents)
        
        # Calculate file size
        file_size = len(contents)
        if file_size > 1024 * 1024 * 1024:  # GB
            size_str = f"{file_size / (1024 * 1024 * 1024):.1f} GB"
        elif file_size > 1024 * 1024:  # MB
            size_str = f"{file_size / (1024 * 1024):.0f} MB"
        else:  # KB
            size_str = f"{file_size / 1024:.0f} KB"
        
        # Update the database with download URL and size
        download_url = f"/api/ide-downloads/{ide_id}/download"
        await db.ide_downloads.update_one(
            {"id": ide_id},
            {"$set": {
                "download_url": download_url,
                "size": size_str,
                "filename": safe_filename,
                "uploaded_at": datetime.now(timezone.utc).isoformat()
            }}
        )
        
        return {
            "message": "File uploaded successfully",
            "filename": safe_filename,
            "size": size_str,
            "download_url": download_url
        }
    except Exception as e:
        logging.error(f"File upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")

@api_router.get("/ide-downloads/{ide_id}/download")
async def download_ide_binary(ide_id: str):
    """Download IDE binary file (Public access)"""
    ide_entry = await db.ide_downloads.find_one({"id": ide_id})
    if not ide_entry:
        raise HTTPException(status_code=404, detail="IDE download not found")
    
    filename = ide_entry.get("filename")
    if not filename:
        raise HTTPException(status_code=404, detail="No binary file uploaded for this platform")
    
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Binary file not found on server")
    
    # Determine content type
    content_type = "application/octet-stream"
    if filename.endswith('.exe'):
        content_type = "application/x-msdownload"
    elif filename.endswith('.dmg'):
        content_type = "application/x-apple-diskimage"
    elif filename.endswith('.deb'):
        content_type = "application/vnd.debian.binary-package"
    elif filename.endswith('.zip'):
        content_type = "application/zip"
    elif filename.endswith('.tar.gz'):
        content_type = "application/gzip"
    
    def iterfile():
        with open(file_path, 'rb') as f:
            while chunk := f.read(1024 * 1024):  # 1MB chunks
                yield chunk
    
    return StreamingResponse(
        iterfile(),
        media_type=content_type,
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "Content-Length": str(file_path.stat().st_size)
        }
    )

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