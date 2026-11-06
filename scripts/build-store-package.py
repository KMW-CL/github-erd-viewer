"""Build a Chrome Web Store ZIP with manifest.json at the archive root."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import json


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "dist" / "github-erd-viewer-chrome-store-v1.0.1.zip"
FILES = [
    "manifest.json",
    "background.js",
    "content.js",
    "content.css",
    "viewer.html",
    "viewer.js",
    "viewer.css",
    "vendor/erd-viewer.umd.js",
    "vendor/LICENSE",
    "icons/icon-16.png",
    "icons/icon-48.png",
    "icons/icon-128.png",
]


def main() -> None:
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    assert manifest["version"] == "1.0.1"
    OUTPUT.parent.mkdir(exist_ok=True)
    with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as archive:
        for name in FILES:
            archive.write(ROOT / name, arcname=name)
    with ZipFile(OUTPUT) as archive:
        assert archive.namelist() == FILES
        assert json.loads(archive.read("manifest.json"))["version"] == "1.0.1"
    print(OUTPUT)


if __name__ == "__main__":
    main()
