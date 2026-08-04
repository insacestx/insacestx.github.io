"""
Hero Image Optimizer for ACES Insurance
Resizes and compresses hero images to optimal web dimensions
Run this locally BEFORE uploading images to GitHub

USAGE:
1. Install Pillow: pip install Pillow
2. Run script: python optimize-hero-images.py
3. Upload optimized images from Icons/heroservices-optimized/
"""

from PIL import Image
import os
from pathlib import Path

# Configuration
INPUT_DIR = "Icons/heroservices"
OUTPUT_DIR = "Icons/heroservices-optimized"
TARGET_WIDTH = 1920
TARGET_HEIGHT = 700
QUALITY = 85  # JPEG quality (1-100)

def optimize_image(input_path, output_path):
    """Resize and optimize a single image"""
    try:
        with Image.open(input_path) as img:
            # Get original dimensions
            orig_width, orig_height = img.size
            orig_size = os.path.getsize(input_path) / 1024
            print(f"  Original: {orig_width}x{orig_height} ({orig_size:.0f} KB)")
            
            # Calculate new dimensions maintaining aspect ratio
            aspect_ratio = orig_width / orig_height
            target_aspect = TARGET_WIDTH / TARGET_HEIGHT
            
            if aspect_ratio > target_aspect:
                # Image is wider - fit to width
                new_width = TARGET_WIDTH
                new_height = int(TARGET_WIDTH / aspect_ratio)
            else:
                # Image is taller - fit to height
                new_height = TARGET_HEIGHT
                new_width = int(TARGET_HEIGHT * aspect_ratio)
            
            # Resize with high-quality resampling
            img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Convert to RGB if necessary (for JPEG)
            if img_resized.mode in ('RGBA', 'LA', 'P'):
                # Create white background
                background = Image.new('RGB', img_resized.size, (255, 255, 255))
                if img_resized.mode == 'P':
                    img_resized = img_resized.convert('RGBA')
                background.paste(img_resized, mask=img_resized.split()[-1] if img_resized.mode == 'RGBA' else None)
                img_resized = background
            
            # Save as optimized JPEG
            output_jpg = output_path.replace('.png', '.jpg')
            img_resized.save(output_jpg, 'JPEG', quality=QUALITY, optimize=True)
            
            new_size = os.path.getsize(output_jpg) / 1024
            reduction = (1 - new_size / orig_size) * 100
            
            print(f"  Optimized: {new_width}x{new_height} ({new_size:.0f} KB)")
            print(f"  Saved to: {output_jpg}")
            print(f"  ✓ Reduced by {reduction:.1f}%\n")
            
    except Exception as e:
        print(f"  ✗ Error: {e}\n")

def main():
    """Process all images in the input directory"""
    # Create output directory
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    
    print("=" * 60)
    print("ACES Hero Image Optimizer")
    print("=" * 60)
    print(f"Target dimensions: {TARGET_WIDTH}x{TARGET_HEIGHT}")
    print(f"JPEG quality: {QUALITY}%")
    print("=" * 60 + "\n")
    
    # Get all PNG files
    image_files = sorted(Path(INPUT_DIR).glob("*.png"))
    
    if not image_files:
        print(f"No PNG files found in {INPUT_DIR}")
        return
    
    print(f"Found {len(image_files)} images to optimize\n")
    
    # Process each image
    total_original = 0
    total_optimized = 0
    
    for i, img_path in enumerate(image_files, 1):
        print(f"[{i}/{len(image_files)}] Processing: {img_path.name}")
        output_path = os.path.join(OUTPUT_DIR, img_path.name)
        
        orig_size = os.path.getsize(str(img_path)) / 1024
        total_original += orig_size
        
        optimize_image(str(img_path), output_path)
        
        output_jpg = output_path.replace('.png', '.jpg')
        if os.path.exists(output_jpg):
            total_optimized += os.path.getsize(output_jpg) / 1024
    
    print("=" * 60)
    print("✓ Optimization complete!")
    print(f"Total original size: {total_original / 1024:.1f} MB")
    print(f"Total optimized size: {total_optimized / 1024:.1f} MB")
    print(f"Total saved: {(total_original - total_optimized) / 1024:.1f} MB ({(1 - total_optimized/total_original) * 100:.1f}%)")
    print(f"Optimized images saved to: {OUTPUT_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    main()
