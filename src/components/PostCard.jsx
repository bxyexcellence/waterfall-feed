"use client"

import { useState, useEffect, useRef } from "react"
import "./PostCard.css"

export default function PostCard({ post }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [animateNew, setAnimateNew] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    // 当post.isNew为true时，触发动画
    if (post.isNew) {
      setAnimateNew(true)

      // 3秒后移除动画类
      const timer = setTimeout(() => {
        setAnimateNew(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [post.isNew])

  const handleVideoClick = () => {
    if (post.hasVideo) {
      setIsPlaying(true)
    }
  }

  const handleCloseVideo = (e) => {
    e.stopPropagation()
    setIsPlaying(false)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // 生成备用图片URL (如果原始图片加载失败)
  const getFallbackImage = () => {
    // 使用另一种图片服务作为备用
    return `https://picsum.photos/seed/${post.id}/500/${post.imageHeight || 300}`
  }

  return (
    <div className={`post-card ${animateNew ? "new-post-animation" : ""}`}>
      <div className="post-media" onClick={handleVideoClick} style={{ cursor: post.hasVideo ? "pointer" : "default" }}>
        {isPlaying && post.videoUrl ? (
          <div className="video-wrapper">
            {/*  <video src={post.videoUrl} className="video-player" controls autoPlay playsInline /> */}
            <video className="video-player" controls autoPlay playsInline>
              <source src={post.videoUrl} type="video/mp4" />
            </video>
            <button onClick={handleCloseVideo} className="video-close-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="close-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="image-container" style={{ height: post.imageHeight || 200, backgroundColor: "#f0f0f0" }}>
              {!imageLoaded && !imageError && (
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <img
                ref={imageRef}
                src={imageError ? getFallbackImage() : post.imageUrl}
                alt={post.title}
                className={`post-image ${imageLoaded ? "loaded" : ""}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
            {post.hasVideo && (
              <div className="play-button-wrapper">
                <div className="video-play-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="play-icon">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>

        <div className="post-meta">
          <div className="author-info">
            <div className="author-avatar">
              <img
                src={post.author.avatarUrl || "/placeholder.svg"}
                alt={post.author.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    post.author.name,
                  )}&background=random`
                }}
              />
            </div>
            <span className="author-name">{post.author.name}</span>
          </div>

          <div className="post-stats">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="like-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span className="like-count">{post.likes}</span>
          </div>
        </div>
      </div>

      {post.isNew && <div className="new-tag">新</div>}
      <div className="category-tag">{post.category}</div>
    </div>
  )
}
