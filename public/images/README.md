# GoTrek Media & Images Directory

Welcome to the media directory for **GoTrek Travels**! You can upload and drop your own photos, temple pictures, video reels, and memory gallery photos directly into the organized subfolders below:

---

## 📁 Folder Structure

```
public/images/
├── destinations/    <-- Add destination photos (Adi Kailash, Om Parvat, Parvati Sarovar, Gunji, etc.)
├── temples/         <-- Add temple and shrine photos (Jageshwar, Patal Bhuvaneshwar, Chitai Golu, etc.)
├── reels/           <-- Add reel videos (.mp4) and reel thumbnail covers (.jpg / .webp)
└── memories/        <-- Add yatra memory gallery photos, pilgrim moments, and scenic captures
```

---

## 🚀 How to Use Your Added Images

Once you add an image (e.g., `my-adi-kailash.jpg` in `destinations/`), you can reference it anywhere in the code as:

```ts
image: "/images/destinations/my-adi-kailash.jpg"
```

### Examples:
- **Destination photo**: `/images/destinations/adi-kailash-peak.jpg`
- **Temple photo**: `/images/temples/jageshwar-dham.jpg`
- **Reel video/thumbnail**: `/images/reels/sunrise-reel.mp4` / `/images/reels/sunrise-thumb.jpg`
- **Yatra memory**: `/images/memories/pilgrim-group-nabhidhang.jpg`

---

## 📸 Recommended Image Specifications
- **Format**: `.jpg`, `.jpeg`, `.png`, `.webp` (or `.mp4` for reels)
- **Aspect Ratio**:
  - Cards & Destinations: `16:9` or `4:3` (Landscape)
  - Reels: `9:16` (Vertical / Portrait)
  - Memories / Gallery: `16:9`, `4:3`, or `1:1`
- **Resolution**: `1200px` to `1920px` width for crisp quality on retina screens.
