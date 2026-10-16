"""Extract the design team's embedded bitmaps into responsive, uncropped WebP assets.

Usage: python scripts/prepare_homepage_assets.py /path/to/unzipped/Raw-Images
Requires Pillow. Original SVGs contain raster images, not vector illustrations.
"""
import base64
import io
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image


MAPPING = {
    "code-engine": "image 65.svg",
    "sifive-platform": "image 39.svg",
    "market-automotive": "ChatGPT Image Sep 24, 2026, 02_37_39 PM 2.svg",
    "market-industrial": "factories_and_grids_high_resolution 2.svg",
    "market-connected": "connected_devices_exact_HD 2.svg",
    "market-robotics": "autonomous_systems_exact_HD 2.svg",
    "market-aerospace": "ChatGPT Image Sep 24, 2026, 02_55_05 PM 2.svg",
    "market-edge-ai": "ChatGPT Image Sep 24, 2026, 02_58_54 PM 2.svg",
    "module-development": "image 14.svg",
    "module-software": "image 15.svg",
    "module-virtualization": "image 16.svg",
    "module-silicon": "image 17.svg",
    "tech-riscv": "Futuristic RISC-V Chip Stack 1.svg",
    "tech-security": "Glowing Glass Shield Lock 1.svg",
    "tech-virtualization": "Layered Glass Platform with Holographic UI 1.svg",
    "tech-runtime": "Futuristic Blue Gauge with Orange Warning Ring 1.svg",
    "tech-crypto": "Neon Glass Security Cube 1.svg",
    "tech-tooling": "Futuristic Glass Code Workspace 1.svg",
}


def prepare(source: Path) -> None:
    project = Path(__file__).resolve().parents[1]
    destination = project / "frontend/public/images/homepage"
    destination.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for slug, filename in MAPPING.items():
        tree = ET.parse(source / filename)
        node = next(e for e in tree.iter() if e.tag.endswith("image"))
        href = node.attrib.get("{http://www.w3.org/1999/xlink}href") or node.attrib["href"]
        image = Image.open(io.BytesIO(base64.b64decode(href.split(",", 1)[1])))
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        manifest[slug] = {"width": image.width, "height": image.height, "source": filename}
        for width in (640, 1200):
            resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            resized.save(destination / f"{slug}-{width}.webp", quality=86, method=6)
    (project / "frontend/src/data/homepage-images.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Prepared {len(manifest)} images / {len(manifest) * 2} variants, {sum(p.stat().st_size for p in destination.glob('*.webp')) / 1024:.0f} KB total")


if __name__ == "__main__":
    prepare(Path(sys.argv[1]))