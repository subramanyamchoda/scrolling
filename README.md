# 🎬 Panda Scrolling (Instagram-like Reels)

A modern **Instagram Reels–style video scrolling app** built using React, TailwindCSS, and optimized rendering techniques.

---

## 📷 Live Demo

👉 https://pandascrolling.vercel.app/

----

## 🚀 Features

* 📱 Full-screen vertical video scrolling
* 🎯 Snap scrolling (one reel per swipe)
* ▶️ Auto play / ⏸ pause based on visibility
* ⚡ Lazy rendering (only current + nearby videos)
* 🔄 Preloading next video for smooth playback
* 🎨 Clean UI with overlay and action buttons
* 📦 Optimized performance (low memory usage)

---

## 🧠 How It Works

This project mimics how platforms like Instagram handle reels efficiently:

1. **Scroll Detection**

   * Calculates which reel is currently visible using scroll position

2. **Dynamic Rendering**

   * Only renders:

     * Current video
     * Next video
     * Previous video
   * Prevents loading all videos at once

3. **Playback Control**

   * Plays only the visible video
   * Pauses all others

4. **Preloading Strategy**

   * Preloads the next reel to avoid buffering

---

## 🛠 Tech Stack

* React (Hooks)
* Tailwind CSS
* Framer Motion (for animations)
* IntersectionObserver / Scroll logic

---

## ⚡ Performance Optimization

* Avoids rendering large video lists
* Reduces bandwidth usage with controlled preloading
* Keeps DOM lightweight (only 2–3 videos at a time)

---

## 📂 Use Cases

* Reels / Shorts UI
* Video feed apps
* Social media clones
* Learning virtualization & lazy loading

---

## 🔥 Future Improvements

* Infinite scroll with backend API
* Video streaming (adaptive quality)
* Like / comment interactions
* Double-tap ❤️ animation
* Gesture-based swipe physics

---

## 📌 Summary

> “Scroll → detect visible reel → play it → preload next → remove others”

---

## 📄 License

MIT License
