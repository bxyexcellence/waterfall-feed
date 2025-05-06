// 模拟作者数据
const authors = [
  { id: "1", name: "峡洞", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: "2", name: "熊猫游戏视频", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: "3", name: "航海王壮志雄心", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: "4", name: "滑板骑士", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
  { id: "5", name: "洛克王国手游", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: "6", name: "辰辰and震震", avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
  { id: "7", name: "昭昭", avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: "8", name: "泡芙云", avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg" },
]

// 模拟分类数据
const categories = ["游戏", "动漫", "科技", "教育", "娱乐"]

// 模拟视频URL
const videoUrls = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
]

// 模拟标题数据
const titleTemplates = [
  "《怪案3: 幽灵列车》全流程章节通关攻略汇总",
  "蛋仔派对: 玩着就把知识学了，绘梦校园主题图速览！",
  "海上大事报 | 奈美泳装即将上架，强者之路焕新回归！【航海王】",
  "像素动作RPG风肉鸽《滑板骑士》将于2026年登录PC、安卓",
  "鹅厂2025火力全开！洛克王国手游王炸登场",
  "《原神》3.0版本前瞻：须弥地区全新角色曝光",
  "《王者荣耀》S32赛季更新内容一览",
  "《英雄联盟》全球总决赛：LPL战队表现亮眼",
  "《我的世界》1.20更新：全新生物与建筑玩法",
  "《赛博朋克2077》DLC评测：值得回归的夜之城",
]

// 图片集合 - 游戏分类
const gameImages = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=320&q=80",
  "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=330&q=80",
]

// 图片集合 - 动漫分类
const animeImages = [
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=80",
  "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=320&q=80",
  "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=340&q=80",
  "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=290&q=80",
]

// 图片集合 - 科技分类
const techImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=320&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=340&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
]

// 图片集合 - 教育分类
const educationImages = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=320&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=330&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=340&q=80",
]

// 图片集合 - 娱乐分类
const entertainmentImages = [
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=320&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=280&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=340&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
]

// 所有图片集合
const allImages = [...gameImages, ...animeImages, ...techImages, ...educationImages, ...entertainmentImages]

// 图片生成方法
function getRandomImage(category) {
  let imagePool

  // 根据分类选择对应的图片池
  switch (category) {
    case "游戏":
      imagePool = gameImages
      break
    case "动漫":
      imagePool = animeImages
      break
    case "科技":
      imagePool = techImages
      break
    case "教育":
      imagePool = educationImages
      break
    case "娱乐":
      imagePool = entertainmentImages
      break
    default:
      imagePool = allImages
  }

  // 从图片池中随机选择一张图片
  return imagePool[Math.floor(Math.random() * imagePool.length)]
}

// 生成随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成随机帖子
function generateRandomPost(id, categoryFilter = "all") {
  const imageHeight = getRandomInt(150, 300)
  const hasVideo = Math.random() > 0.5
  const authorIndex = getRandomInt(0, authors.length - 1)
  const categoryIndex = getRandomInt(0, categories.length - 1)
  const titleIndex = getRandomInt(0, titleTemplates.length - 1)
  const videoIndex = getRandomInt(0, videoUrls.length - 1)

  const category = categoryFilter === "all" ? categories[categoryIndex] : categoryFilter

  // 根据分类获取随机图片
  const imageUrl = getRandomImage(category)

  return {
    id,
    title: titleTemplates[titleIndex],
    imageUrl,
    imageHeight,
    hasVideo,
    videoUrl: hasVideo ? videoUrls[videoIndex] : undefined,
    likes: getRandomInt(10, 999),
    author: authors[authorIndex],
    category,
  }
}

// 生成帖子列表
function generatePosts(page, limit, category = "all") {
  const posts = []
  const startId = (page - 1) * limit + 1

  // 模拟分页，最多5页数据
  if (page <= 5) {
    for (let i = 0; i < limit; i++) {
      const id = `${startId + i}`
      posts.push(generateRandomPost(id, category))
    }
  }

  return posts
}

// 模拟API请求延迟
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// 模拟获取帖子列表
export async function fetchPosts(page = 1, params = {}, limit = 10) {
  // 模拟网络延迟
  await delay(800)

  // 从params中提取参数
  const category = params.category || "all"
  const author = params.author
  const keyword = params.keyword
  const sort = params.sort || "latest" // 默认按最新排序

  // 生成基础数据
  let data = generatePosts(page, limit, category)

  // 根据作者筛选
  if (author) {
    data = data.filter((post) => post.author.name.includes(author) || post.author.id === author)
  }

  // 根据关键词筛选标题
  if (keyword) {
    data = data.filter((post) => post.title.toLowerCase().includes(keyword.toLowerCase()))
  }

  // 根据排序参数排序
  if (sort === "likes") {
    data.sort((a, b) => b.likes - a.likes)
  } else if (sort === "oldest") {
    // 这里我们假设id越小的越早发布
    data.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))
  }
  // 默认是latest，按id降序排列
  else {
    data.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
  }

  return {
    data,
    pagination: {
      page,
      limit,
      hasMore: page < 5 && data.length > 0, // 模拟只有5页数据，且确保有数据时才有下一页
      total: 50,
    },
  }
}
