import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState({});

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  const videos = ["1.mp4", "3.mp4", "4.mp4", "5.mp4"];

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const height = window.innerHeight;
    const index = Math.round(scrollTop / height);
    setCurrentIndex(index);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      video.muted = !soundOn;

      if (i === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }

      if (i === currentIndex + 1) {
        video.load();
      }
    });
  }, [currentIndex, soundOn]);

  const toggleLike = (i) => {
    setLiked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="relative">
    
      <h1 className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-white text-xl font-bold">
        Panda Scrolling
      </h1>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth"
      >
        {videos.map((src, i) => {
          if (Math.abs(i - currentIndex) > 1) {
            return (
              <div key={i} className="h-screen snap-start bg-black" />
            );
          }

          return (
            <div
              key={i}
              className="h-screen snap-start flex items-center justify-center bg-black relative"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-[360px] h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              >
              
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={src}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  preload={i === currentIndex ? "auto" : "metadata"}
                  onTimeUpdate={(e) => {
                    const video = e.target;
                    const percent = video.duration
                      ? (video.currentTime / video.duration) * 100
                      : 0;
                    setProgress((prev) => ({ ...prev, [i]: percent }));
                  }}
                />

               
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-red-500"
                    style={{ width: `${progress[i] || 0}%` }}
                  />
                </div>

              
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

               
                <AnimatePresence>
                  {liked[i] && (
                    <motion.div
                      key="heart"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center text-white text-6xl"
                    >
                      ❤️
                    </motion.div>
                  )}
                </AnimatePresence>

              
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => toggleLike(i)}
                />

               
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setSoundOn((prev) => !prev)}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                >
                  {soundOn ? "🔊" : "🔇"}
                </motion.button>

              
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 text-white"
                >
                  <h2 className="text-lg font-bold">@user_{i + 1}</h2>
                  <p className="text-sm opacity-80 max-w-[250px]">
                    Instagram style reels UI 🔥 #{i + 1}
                  </p>
                </motion.div>

                
                <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5 text-white">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleLike(i)}
                    className="flex flex-col items-center"
                  >
                    <span
                      className={`p-3 rounded-full text-xl ${
                        liked[i] ? "bg-red-500" : "bg-white/20"
                      }`}
                    >
                      ❤️
                    </span>
                    <span className="text-xs mt-1">1.2k</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <span className="bg-white/20 p-3 rounded-full text-xl">
                      💬
                    </span>
                    <span className="text-xs mt-1">320</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    className="flex flex-col items-center"
                  >
                    <span className="bg-white/20 p-3 rounded-full text-xl">
                      🔗
                    </span>
                    <span className="text-xs mt-1">Share</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
