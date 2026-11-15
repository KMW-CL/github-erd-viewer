"""Build a Chrome Web Store ZIP with manifest.json at the archive root."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile
import json


ROOT = Path(__file__).resolve().parents[1]
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
    output = ROOT / "dist" / f"github-erd-viewer-chrome-store-v{manifest['version']}.zip"
    output.parent.mkdir(exist_ok=True)
    with ZipFile(output, "w", ZIP_DEFLATED) as archive:
        for name in FILES:
            archive.write(ROOT / name, arcname=name)
    with ZipFile(output) as archive:
        assert archive.namelist() == FILES
        assert json.loads(archive.read("manifest.json"))["version"] == manifest["version"]
    print(output)


if __name__ == "__main__":
    main()
