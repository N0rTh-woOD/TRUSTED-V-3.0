// Copy and imagery mapped to TrusteDV-HomePage-DesignChanges-1.pdf.
export const HOME_FEATURES = [
  {
    id: "riscv-ip", eyebrow: "RISC-V IP collaboration", heading: "Build with",
    highlight: "SiFive and TRUSTED-V.", title: "A coherent path from IP to trusted software.", image: "sifive-platform",
    alt: "SiFive and TRUSTED-V connected through a layered RISC-V chip and software stack",
    intro: "Bring SiFive RISC-V IP together with the TRUSTED-V software, security and virtualization platform.",
    description: "TRUSTED-V aligns the development workflow around SiFive RISC-V IP, so the virtual platform, toolchain, secure boot and application work share one technical foundation.",
    bullets: ["RISC-V software and toolchain alignment", "Virtualization and pre-silicon workflow", "Secure boot, crypto and attestation context"],
    to: "/partners", cta: "See platform alignment", linkId: "riscv-ip-platform",
  },
];

export const HOME_MARKETS = [
  { id: "automotive", label: "Automotive", title: "Software-defined vehicles.", image: "market-automotive", alt: "Engineers working on a digital vehicle model in an automotive lab", capabilities: ["Deterministic processing", "Secure execution", "ISO 26262 alignment"] },
  { id: "industrial", label: "Industrial", title: "Factories and grids.", image: "market-industrial", alt: "Industrial robotic arms monitored with a connected control tablet", capabilities: ["Real-time RTOS", "IEC 62443 alignment", "Rugged deployment"] },
  { id: "iot-consumer", label: "IoT & Consumer", title: "Connected devices.", image: "market-connected", alt: "Connected home camera, thermostat, light and mobile controls", capabilities: ["PSA L3-aligned", "PQC-ready", "Low-power RISC-V"] },
  { id: "robotics", label: "Robotics", title: "Autonomous systems.", image: "market-robotics", alt: "An autonomous humanoid robot working on a factory assembly line", capabilities: ["Rust async runtime", "Hypervisor isolation", "Vision-capable RVV"] },
  { id: "defence-aerospace", label: "Defence & Aerospace", title: "Sovereign missions.", image: "market-aerospace", alt: "A satellite with extended solar panels orbiting Earth", capabilities: ["Vendor-neutral certification", "Attestation", "Hardware-anchored trust"] },
  { id: "edge-ai", label: "Edge AI", title: "Physical AI on RISC-V.", image: "market-edge-ai", alt: "An edge computing device processing RISC-V AI workloads in a connected city", capabilities: ["Virtual platforms", "RVV vector compute", "Deterministic scheduling"] },
];

export const HOME_TECHNOLOGIES = [
  { id: "risc-v-native", category: "ISA", title: "RISC-V native", description: "RV32, RV64 and RVV, aligned with SiFive RISC-V IP.", image: "tech-riscv", alt: "Layered RISC-V processor", to: "/product-suite" },
  { id: "security-by-construction", category: "Security", title: "Security by construction", description: "Rust memory safety, verified boot, classical + PQC crypto.", image: "tech-security", alt: "Glass shield with a secure lock", to: "/product/secure-boot" },
  { id: "virtualization", category: "Pre-silicon", title: "Virtualization", description: "Hypervisor and virtual platforms for pre-silicon bring-up.", image: "tech-virtualization", alt: "Layered virtual platform with connected workloads", to: "/product-suite#virtualization" },
  { id: "real-time-software", category: "Runtime", title: "Real-time software", description: "TRUSTED-V RTOS, Embassy async runtimes and Rust HAL crates.", image: "tech-runtime", alt: "Precision timing gauge with a highlighted operating range", to: "/product/rtos-benchmark" },
  { id: "cryptography", category: "Crypto", title: "Cryptography", description: "AES, SHA-3, ECDSA, ML-KEM, ML-DSA. NIST FIPS mapped.", image: "tech-crypto", alt: "Transparent security cube with encrypted locks", to: "/product/crypto-stack" },
  { id: "rust-developer-tooling", category: "Tooling", title: "Rust developer tooling", description: "Jarvyn IDE, WebIDE, signed toolchain, SVD register views.", status: "Jarvyn IDE & WebIDE: Coming soon", image: "tech-tooling", alt: "Rust code workspace with terminal and development tools", to: "/download-ide" },
];

// Homepage presentation order follows PDF p.5; technical stack layers are unchanged.
export const HOME_MODULES = [
  { id: "development", number: "01", title: "Development Platform", image: "module-development", alt: "An engineer inspecting a chip design and development boards", description: "Jarvyn IDE, WebIDE, debugger and trace in one Rust-native environment.", bullets: ["Jarvyn IDE: Coming soon", "WebIDE: Coming soon", "Debugger and trace"], to: "/download-ide" },
  { id: "software", number: "02", title: "Secure Rust Software", image: "module-software", alt: "An engineer working on secure software with code and a digital system model", description: "rBoot, rustBoot, RTOS, HAL/PAC and Crypto Stack. PQC-ready.", bullets: ["rBoot & rustBoot", "Crypto Stack", "RTOS"], to: "/product/secure-boot" },
  { id: "virtualization", number: "03", title: "Virtualization & Simulation", image: "module-virtualization", alt: "An engineer working with a virtualized cloud and server platform", description: "Virtual platforms and a RISC-V hypervisor for pre-silicon work.", bullets: ["Virtual platform", "RISC-V hypervisor", "Cycle-approximate simulator"], to: "/product-suite#virtualization" },
  { id: "silicon", number: "04", title: "Silicon SignOff & Trust", image: "module-silicon", alt: "A cleanroom technician inspecting a silicon wafer", description: "Vendor-neutral certification for RISC-V SoCs.", bullets: ["SignOff Silicon", "TRUSTED-V Verified", "TVOTS"], to: "/product-suite#certification" },
];