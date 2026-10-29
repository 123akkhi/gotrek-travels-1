# Yatra Reels & Video Media Folder

Place all your **Instagram-style Yatra Reels, Videos, and Poster Covers** here.

### 🎬 What to place in this folder:
- **Video clips** (.mp4 / .webm) for live reel playback
- **Poster covers / thumbnails** (.jpg / .webp) for reel previews
- High-altitude sunrise drone shots, 4x4 offroad crossings, aarti ceremonies, and pilgrim moments

### 🔗 How to reference your video and cover in code:
```ts
// In src/data/reelsData.ts (REELS_DATA):
posterImage: "/images/reels/your-thumbnail.jpg",
videoUrl: "/images/reels/your-video.mp4"
```

### 💡 Recommended Dimensions:
- **Aspect Ratio**: 9:16 (Vertical format for mobile reels)
- **Resolution**: 1080 x 1920 px (or 720 x 1280 px)
- **Formats**: `.mp4` (H.264 video codec for universal browser playback), `.jpg`, `.webp`
