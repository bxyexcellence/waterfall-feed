"use client"

import { useEffect, useRef, useState } from "react"
import PostCard from "./PostCard"
import { fetchPosts } from "../api/mockApi"
import LoadingIndicator from "./LoadingIndicator"
import "./Feed.css"

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [refreshText, setRefreshText] = useState("")
  const [loadMoreText, setLoadMoreText] = useState("")
  const observerRef = useRef(null)
  const loadingRef = useRef(null)
  const startY = useRef(0)
  const containerRef = useRef(null)
  const refreshIndicatorRef = useRef(null)
  const [refreshProgress, setRefreshProgress] = useState(0)
  const refreshThreshold = 80
  const [newPostsCount, setNewPostsCount] = useState(0)

  // 获取URL参数
  const [urlParams, setUrlParams] = useState({})

  // 监听URL变化
  useEffect(() => {
    const parseUrlParams = () => {
      const params = new URLSearchParams(window.location.search)
      const paramObj = {}

      // 提取所有参数
      for (const [key, value] of params.entries()) {
        paramObj[key] = value
      }

      setUrlParams(paramObj)

      // 如果有category参数，重置并加载对应分类的数据
      if (params.has("category") && params.get("category") !== "all") {
        setPosts([])
        setPage(1)
        setHasMore(true)
      }
    }

    // 初始解析
    parseUrlParams()

    // 监听popstate事件（浏览器前进/后退）
    const handlePopState = () => {
      parseUrlParams()
    }

    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  // 当URL参数变化时重新加载数据
  useEffect(() => {
    loadInitialPosts()
  }, [urlParams])

  // 下拉刷新触摸事件处理
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e) => {
      if (container.scrollTop <= 0) {
        startY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (container.scrollTop > 0 || isRefreshing) return

      const currentY = e.touches[0].clientY
      const diff = currentY - startY.current

      if (diff > 0) {
        e.preventDefault()
        const progress = Math.min(diff / refreshThreshold, 1)
        setRefreshProgress(progress)

        // 更新下拉提示文字
        if (progress < 0.5) {
          setRefreshText("下拉刷新")
        } else if (progress < 1) {
          setRefreshText("继续下拉")
        } else {
          setRefreshText("松开刷新")
        }

        if (refreshIndicatorRef.current) {
          refreshIndicatorRef.current.style.transform = `translateY(${diff}px)`
        }
      }
    }

    const handleTouchEnd = () => {
      if (refreshProgress >= 1 && !isRefreshing) {
        handleRefresh()
      }

      setRefreshProgress(0)
      setRefreshText("")
      if (refreshIndicatorRef.current) {
        refreshIndicatorRef.current.style.transform = "translateY(0)"
      }
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isRefreshing, refreshProgress])

  // 无限滚动
  useEffect(() => {
    // 每次isLoading或hasMore变化时，重新设置观察器
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (loadingRef.current && hasMore && !isLoading) {
      const options = {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMorePosts()
        }
      }, options)

      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isLoading, hasMore, posts.length])

  const loadInitialPosts = async () => {
    setIsLoading(true)
    setLoadMoreText("加载中...")
    try {
      // 使用URL参数调用API
      const { data, pagination } = await fetchPosts(1, urlParams)
      setPosts(data)
      setPage(2)
      setHasMore(pagination.hasMore)
    } catch (error) {
      console.error("Failed to load initial posts:", error)
    } finally {
      setIsLoading(false)
      setLoadMoreText("")
    }
  }

  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setLoadMoreText("加载更多内容...")
    try {
      // 使用URL参数调用API
      const { data: newPosts, pagination } = await fetchPosts(page, urlParams)
      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        // 添加新内容标记
        const markedPosts = newPosts.map((post) => ({
          ...post,
          isNew: true,
        }))

        setPosts((prev) => [...prev, ...markedPosts])
        setPage((prev) => prev + 1)
        setHasMore(pagination.hasMore)
        setNewPostsCount(newPosts.length)

        // 3秒后移除新内容标记
        setTimeout(() => {
          setPosts((currentPosts) =>
            currentPosts.map((post) => ({
              ...post,
              isNew: false,
            })),
          )
        }, 3000)
      }
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setIsLoading(false)
      setLoadMoreText("")
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setRefreshText("正在刷新...")
    try {
      // 使用URL参数调用API
      const { data: newPosts, pagination } = await fetchPosts(1, urlParams)

      // 添加新内容标记
      const markedPosts = newPosts.map((post) => ({
        ...post,
        isNew: true,
      }))

      setPosts(markedPosts)
      setPage(2)
      setHasMore(pagination.hasMore)
      setNewPostsCount(newPosts.length)

      // 3秒后移除新内容标记
      setTimeout(() => {
        setPosts((currentPosts) =>
          currentPosts.map((post) => ({
            ...post,
            isNew: false,
          })),
        )
      }, 3000)
    } catch (error) {
      console.error("Failed to refresh posts:", error)
    } finally {
      setIsRefreshing(false)
      setRefreshText("")
    }
  }

  // 显示当前筛选条件
  const renderFilterInfo = () => {
    if (Object.keys(urlParams).length === 0) return null

    const filters = []
    if (urlParams.category && urlParams.category !== "all") {
      filters.push(`分类: ${urlParams.category}`)
    }
    if (urlParams.author) {
      filters.push(`作者: ${urlParams.author}`)
    }
    if (urlParams.keyword) {
      filters.push(`关键词: ${urlParams.keyword}`)
    }
    if (urlParams.sort) {
      const sortMap = {
        latest: "最新",
        oldest: "最早",
        likes: "最多赞",
      }
      filters.push(`排序: ${sortMap[urlParams.sort] || urlParams.sort}`)
    }

    if (filters.length === 0) return null

    return (
      <div className="filter-info">
        <div className="filter-tags">
          {filters.map((filter, index) => (
            <span key={index} className="filter-tag">
              {filter}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={containerRef} className="flex-1 overflow-y-auto relative overflow-x-hidden">
        <div
          ref={refreshIndicatorRef}
          className="absolute top-0 left-0 w-full flex flex-col items-center transform translate-y-0 transition-transform"
          style={{ opacity: refreshProgress, zIndex: 100 }}
        >
          <div className="bg-white rounded-full p-2 shadow-md">
            <LoadingIndicator isLoading={isRefreshing} progress={refreshProgress} />
          </div>
          {refreshText && (
            <div className="mt-2 text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">{refreshText}</div>
          )}
        </div>

        {isRefreshing && (
          <div className="refresh-overlay">
            <div className="refresh-message">
              <LoadingIndicator isLoading={true} />
              <span>刷新中...</span>
            </div>
          </div>
        )}

        {newPostsCount > 0 && (
          <div className="new-content-indicator">
            {isRefreshing ? "刷新成功" : "加载成功"}: 新增 {newPostsCount} 条内容
          </div>
        )}

        {renderFilterInfo()}

        <div className="grid grid-cols-2 gap-2 p-2">
          <div className="flex flex-col gap-2">
            {posts
              .filter((_, i) => i % 2 === 0)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
          <div className="flex flex-col gap-2">
            {posts
              .filter((_, i) => i % 2 === 1)
              .map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        </div>

        {hasMore && (
          <div ref={loadingRef} className="w-full flex flex-col items-center p-4">
            {isLoading && (
              <>
                <LoadingIndicator isLoading={true} />
                {loadMoreText && <div className="mt-2 text-sm text-gray-500">{loadMoreText}</div>}
              </>
            )}
          </div>
        )}

        {!hasMore && posts.length > 0 && <div className="text-center p-4 text-gray-500">没有更多内容了</div>}

        {posts.length === 0 && !isLoading && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <div className="empty-text">没有找到符合条件的内容</div>
          </div>
        )}
      </div>
    </div>
  )
}
