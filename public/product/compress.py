import os
from PIL import Image

# Path relatif dari lokasi file python
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FOLDER = os.path.join(BASE_DIR, "gracia")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "output", "gracia")

MAX_WIDTH = 1200
QUALITY = 75

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

for root, _, files in os.walk(INPUT_FOLDER):
    for file in files:
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            input_path = os.path.join(root, file)

            # Pertahankan struktur subfolder
            relative_path = os.path.relpath(input_path, INPUT_FOLDER)
            output_path = os.path.join(
                OUTPUT_FOLDER,
                os.path.splitext(relative_path)[0] + ".webp"
            )

            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            try:
                with Image.open(input_path) as img:
                    img = img.convert("RGB")

                    # Resize jika terlalu besar
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

                    img.save(output_path, "WEBP", quality=QUALITY)

                print(f"Berhasil: {relative_path}")

            except Exception as e:
                print(f"Gagal: {relative_path} | Error: {e}")

print("Selesai kompres semua gambar.")