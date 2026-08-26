import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import './styles.css'

const rasterAsset = /\.(png|jpe?g)$/i
const optimizedRasterPath = (path) => path.replace(rasterAsset, '.webp')
const asset = (path) => rasterAsset.test(path)
  ? `/portfolio/optimized/assets/${optimizedRasterPath(path)}`
  : `/portfolio/assets/${path}`

const phone = '15388077589'
const email = 'SunaXiaa@yeah.net'

const careerItems = [
  '2025.12-2026.05 三号椰（上海）品牌管理有限公司 策划高级专员',
  '2023.12-2025.07 栗壳广告有限公司 资深文案',
  '2022.11-2023.12 野伙伙广告有限公司 创意文案',
  '2021.06-2022.09 有门广告有限公司 创意文案',
]

const portfolioCases = [
  {
    brand: '三号椰',
    displayBrand: 'Yee3 三号椰',
    logo: asset('三号椰/三号椰品牌logo.png'),
    slug: 'sanhoye',
    role: '品牌官媒搭建 / 社媒内容营销 / 产品宣推转化',
    summary: '帮助新晋茶饮品牌从空白账号长出稳定内容人格，让新品、联名、热点和门店转化能被同一套社媒语言承接。',
    problem: '新品牌需要快速被看见，也需要在持续上新中形成稳定表达。单次爆点无法支撑长期声量，官方社媒需要成为可复用的内容阵地。',
    solution: '把账号定位、产品节奏、平台语气和跨部门宣推需求前置整理，让每次新品与联名都能拆成可讨论、可收藏、可下单的内容理由。',
    result: 'Q2 累计涨粉 2w+，千赞爆文 15+，让官方账号从冷启动进入可持续增长。',
    projects: [
      {
        title: '官方社媒账号从 0-1 内容搭建',
        text: '建立账号运营区分和项目节奏，让新品牌内容不再只是发布信息。',
        image: asset('三号椰/独立内容策划示例1-下图-项目节奏策划.png'),
      },
      {
        title: '新品 / 联名 / 热点内容常态化运营',
        text: '围绕桃子、桑葚等产品联名，把产品卖点包装成更有质感和网感的社媒内容。',
        image: asset('三号椰/质感内容运营及项目常态化运营示例1-桃子产品联名项目.png'),
      },
      {
        title: '小红书爆文与产品转化内容',
        text: '让爆文服务于产品关注和主页质感，帮助内容热度反向推动种草。',
        image: asset('三号椰/三号椰案例.jpg'),
      },
    ],
  },
  {
    brand: '祖·玛珑',
    displayBrand: 'Jo Malone 祖·玛珑',
    logo: asset('祖·玛珑/祖玛珑品牌logo.png'),
    slug: 'jomalone',
    role: '香氛品牌策划 / 媒介爆款方案 / 快闪落地',
    summary: '帮助香氛新品先被想象，再被种草，把抽象气味转译成场景、情绪和可分享的产品故事。',
    problem: '香气无法被屏幕直接传递，产品传播不能只依赖卖点说明，需要先建立用户愿意进入的情绪场景。',
    solution: '围绕新品主题、人群语境和英伦品牌调性，先定义香气故事，再组织媒介内容、社媒种草和线下快闪体验。',
    result: '打造全年媒介爆款方案，香氛话题页总热度1.6亿+',
    projects: [
      {
        title: '海岛系列新品传播',
        text: '把海岛想象变成新品主题入口，帮助香氛从气味转向生活场景。',
        image: asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-海岛产品-示例1.png'),
      },
      {
        title: 'Hinoki 系列媒介宣传',
        text: '用更清晰的主题叙事承接媒介端出街，延展产品记忆点。',
        image: asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-hinoki产品-示例1.png'),
      },
      {
        title: '古董系列产品叙事',
        text: '为系列产品建立可被讲述的视觉与文案方向，让调性有内容出口。',
        image: asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-古董系列产品-示例1.png'),
      },
      {
        title: '快闪活动传播落地',
        text: '让线上香气想象进一步导向线下体验，完成从内容到参与的靠近。',
        image: asset('祖·玛珑/转化-协助快闪等活动落地示例1.png'),
      },
    ],
  },
  {
    brand: '巴黎欧莱雅',
    displayBrand: "L'Oréal Paris 巴黎欧莱雅",
    logo: asset('巴黎欧莱雅/巴黎欧莱雅品牌logo.png'),
    slug: 'loreal',
    role: '美妆 Campaign / 产品卖点策划 / 直播与社媒文案',
    summary: '帮助底妆产品把功效参数放进更具体的季节、妆容和直播场景里，让用户理解为什么此刻需要它。',
    problem: '底妆赛道竞争拥挤，单纯讲持妆、肤感、遮瑕很难形成差异，产品需要在真实使用场景中重新被选择。',
    solution: '把黑金气垫与奶润气垫的卖点拆成妆效、肤感、季节、直播互动等内容抓手，再通过脚本、活动和出街素材完成传播。',
    result: '通过活动方案、视频脚本和头部博主内容承接新品卖点，帮助底妆项目形成更具转化力的出街表达。',
    projects: [
      {
        title: '持妆系列夏季场景传播',
        text: '用夏季和运动场景承接产品持妆诉求，让卖点更容易被感知。',
        image: asset('巴黎欧莱雅/持妆系列项目.png'),
      },
      {
        title: '奶润气垫产品卖点策划',
        text: '把底妆利益点从功能语言转译成更好传播的用户行动理由。',
        image: asset('巴黎欧莱雅/转化-出街内容示例1.png'),
      },
      {
        title: '直播出街与转化内容',
        text: '用直播和活动物料把限定节点变成可观看、可参与、可扩散的事件。',
        image: asset('巴黎欧莱雅/黑金气垫直播出街示例1.png'),
      },
    ],
  },
  {
    brand: '怡丽丝尔',
    displayBrand: 'ELIXIR 怡丽丝尔',
    logo: asset('怡丽丝尔/怡丽丝尔品牌logo.png'),
    slug: 'elixir',
    role: '品牌营销 / 产品创意策划 / 直播传播转化',
    summary: '帮助高端护肤品牌把代言人、新品和日常社媒内容连接成同一条传播链路。',
    problem: '代言人官宣、新品上市和矩阵运营如果各自发声，声量很容易被拆散，品牌年轻化也缺少统一抓手。',
    solution: '把明星特质、产品功效和用户生活状态放在同一套内容策略里，用创意概念降低功效沟通门槛，再用直播事件放大声量。',
    result: '抖音 + 天猫销售榜首，销量 500w+；微博热搜稳居前十，并带动粉丝切片传播。',
    projects: [
      {
        title: '紧塑带面霜新品上新',
        text: '将产品功效与代言人特质转成更易被记住的传播概念。',
        image: asset('怡丽丝尔/品牌-形象代言人示例1.png'),
      },
      {
        title: '第二代眼霜 x 品牌代言人鞠婧祎',
        text: '用直播和五感互动机制串联预热、爆发和粉丝自传播。',
        image: asset('怡丽丝尔/转化-直播宣传海报.png'),
      },
      {
        title: '2025 怡丽丝尔自媒体矩阵运营规划',
        text: '围绕新品、代言人、直播和日常栏目，建立持续内容沟通机制。',
        image: asset('怡丽丝尔/内容-宣传内容策划示例1.png'),
      },
    ],
  },
  {
    brand: 'NARS',
    displayBrand: 'NARS 纳斯',
    logo: asset('NARS/NARS品牌LOGO.png'),
    slug: 'nars',
    role: '全平台运营 / 小程序宣推 / Campaign 配合',
    summary: '帮助彩妆品牌在产品上新、明星物料、电商节点、小程序和线下活动之间维持高频但不失调性的表达。',
    problem: '内容任务横跨太多节点，容易变得碎片化；促销、活动、小程序功能也需要共享同一套品牌高级感。',
    solution: '用“小程序”“追光逐色”“位置共享”等概念作为入口，让不同物料都能进入统一内容框架，并在图文中植入转化链路。',
    result: '全年高频内容覆盖明星物料、产品上新、线下活动和 Campaign 节点，帮助不同触点保持统一品牌调性。',
    projects: [
      {
        title: '小程序上线宣推',
        text: '把功能上线包装成用户愿意进入的品牌场景，而不是单纯说明入口。',
        image: asset('NARS/NARS案例1.jpg'),
      },
      {
        title: '全年社媒内容运营',
        text: '让明星物料、产品上新和线下活动在同一套品牌语气下持续出街。',
        image: asset('NARS/NARS案例2.jpg'),
      },
      {
        title: '电商节点与 Campaign 内容',
        text: '通过公众号、微博和跳转链路，把内容观看转向点击行动。',
        image: asset('NARS/NARS案例3.jpg'),
      },
      {
        title: '线下快闪传播',
        text: '让线下活动也保留品牌叙事，不被单次活动信息稀释。',
        image: asset('NARS/NARS案例4.jpg'),
      },
    ],
  },
  {
    brand: '雅诗兰黛',
    displayBrand: 'Estée Lauder 雅诗兰黛',
    logo: asset('雅诗兰黛/雅诗兰黛品牌logo.png'),
    slug: 'esteelauder',
    role: '女性公益 Campaign / 品牌议题传播 / 社媒内容',
    summary: '帮助品牌女性公益议题从节点口号转向真实共鸣，让项目被看见，也被理解。',
    problem: '3.8 女性议题如果停留在品牌口号，容易显得空泛；公益传播需要可信的故事和具体的表达姿态。',
    solution: '以“梦由她创”承接女性创想家赋能计划，把品牌立场、人物故事和公共议题连接成可发布、可阅读的内容。',
    result: '女性议题内容把品牌公益立场、人物故事和社媒传播连接起来，提升项目的理解度与情感共鸣。',
    projects: [
      {
        title: '3.8 女性创想家赋能计划',
        text: '把品牌公益项目转化为更有温度和传播感的社媒内容。',
        image: asset('雅诗兰黛/雅诗兰黛38女性赋能计划宣传方案示例1.png'),
      },
      {
        title: '女性议题公益传播',
        text: '避免空泛表达，让品牌好感落到真实议题和人物故事上。',
        image: asset('雅诗兰黛/女性创想家赋能计划-补充图1.jpeg'),
      },
    ],
  },
  {
    brand: '格力高',
    displayBrand: 'Glico 格力高',
    logo: asset('格力高/格力高品牌logo.png'),
    slug: 'glico',
    role: '小红书全年运营 / 热点追踪 / 创意插画内容',
    summary: '帮助快消品牌在小红书长期出现，也每次出现都有理由，把产品自然放进生活、节日和热点语境。',
    problem: '全年运营需要兼顾稳定种草与即时热点，产品露出不能显得重复，也不能脱离平台语境。',
    solution: '用月度主题、创意插画和热点追踪搭建内容栏目，让品牌从单纯产品露出转向更可收藏的生活表达。',
    projects: [
      {
        title: '小红书内容运营',
        text: '围绕全年节奏建立账号记忆点，让产品持续被轻松看见。',
        image: asset('格力高/格力高案例1.jpg'),
      },
      {
        title: '产品种草图文',
        text: '把产品放进日常生活和节日情绪里，服务自然种草。',
        image: asset('格力高/格力高案例2.jpg'),
      },
      {
        title: '主题摄影与插画栏目',
        text: '用更明亮、可收藏的视觉栏目提升内容识别度。',
        image: asset('格力高/格力高案例3.jpg'),
      },
    ],
  },
  {
    brand: '爱慕',
    displayBrand: 'AIMER 爱慕',
    logo: asset('爱慕/爱慕品牌logo.png'),
    slug: 'aimer',
    role: '女性品牌运营 / 公众号爆文 / ATL & Social Copy',
    summary: '帮助女性品牌从功能售卖延展到身体、季节和生活情绪的长期连接。',
    problem: '内衣品牌如果只讲产品功能，很难建立长期好感；内容需要把产品、女性生活和品牌价值自然连接起来。',
    solution: '从真实女性生活洞察切入，用年度主题、节点海报、公众号内容和转化链路共同支撑品牌陪伴感。',
    result: '打造多篇阅读量 10w+ 爆款推文，带动品牌社媒曝光与用户互动；优质内容也承接销售转化。',
    projects: [
      {
        title: '品牌社媒内容运营',
        text: '用品牌向、代言人宣传向、热点互动向等多种文风支持长期内容表达。',
        image: asset('爱慕/爱慕案例1.jpg'),
      },
      {
        title: '产品宣推内容',
        text: '围绕穿过夏日、天生热点、野可以这样等主题，把产品沟通变成生活叙事。',
        image: asset('爱慕/爱慕案例2.jpg'),
      },
      {
        title: '转化链路内容',
        text: '通过公众号爆文、线下二维码和 UGC 反馈，让内容好感转向行动反馈。',
        image: asset('爱慕/爱慕案例3.jpg'),
      },
    ],
  },
]

const aboutIntro = [
  '夏宣｜文案 & 品牌策划',
  '拥有 4 年 + 品牌内容及社媒全链路策划经验，专注美妆护肤、香氛赛道，同时覆盖快消、时尚领域项目实践。',
  '曾服务雅诗兰黛集团、欧莱雅集团、NARS、爱慕、格力高等商业品牌。',
]

function getArchiveIndex(index) {
  return String(index + 1).padStart(2, '0')
}

function getBrandName(item) {
  return item.displayBrand || item.brand
}

function getBrandTitleClass(item) {
  const brandName = getBrandName(item)
  const classes = ['brand-title']

  if (brandName.includes('ELIXIR') || brandName.includes('怡丽丝尔')) {
    classes.push('is-elixir-brand')
  }

  if (brandName.includes("L'Oréal") || brandName.includes('欧莱雅')) {
    classes.push('is-loreal-brand')
  }

  if (brandName.includes('Estée') || brandName.includes('雅诗兰黛')) {
    classes.push('is-estee-brand')
  }

  const brandLength = brandName.length
  if (brandLength >= 18) {
    classes.push('is-very-long-brand')
  } else if (brandLength >= 10) {
    classes.push('is-long-brand')
  }

  return classes.join(' ')
}

function getMenuItemClass(item, activeSlug) {
  const classes = []
  if (activeSlug === item.slug) classes.push('is-active')

  const brandLength = getBrandName(item).length
  if (brandLength >= 18) {
    classes.push('is-very-long-name')
  } else if (brandLength >= 12) {
    classes.push('is-long-name')
  }

  return classes.join(' ')
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handleRoute = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handleRoute)
    return () => window.removeEventListener('popstate', handleRoute)
  }, [])

  return pathname
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useArchiveReveal(rootRef, dependencies = []) {
  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return undefined

    const context = gsap.context(() => {
      gsap.from('.project-sheet.is-active', {
        autoAlpha: 0,
        x: 42,
        duration: 0.24,
        ease: 'power3.out',
        clearProps: 'transform,opacity,visibility',
      })
    }, rootRef)

    return () => context.revert()
  }, dependencies)
}

function useStackHover(rootRef, dependencies = []) {
  useEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return undefined

    const cards = gsap.utils.toArray('.note-card', rootRef.current)
    const cleanups = cards.map((card) => {
      const enter = () => {
        gsap.to(card, {
          y: -10,
          rotate: 0,
          scale: 1.018,
          duration: 0.36,
          ease: 'power3.out',
          overwrite: true,
        })
      }
      const leave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'power3.out',
          overwrite: true,
          clearProps: 'transform',
        })
      }

      card.addEventListener('pointerenter', enter)
      card.addEventListener('pointerleave', leave)
      card.addEventListener('focus', enter)
      card.addEventListener('blur', leave)

      return () => {
        card.removeEventListener('pointerenter', enter)
        card.removeEventListener('pointerleave', leave)
        card.removeEventListener('focus', enter)
        card.removeEventListener('blur', leave)
        gsap.killTweensOf(card)
      }
    })

    return () => cleanups.forEach((cleanup) => cleanup())
  }, dependencies)
}

function AboutContent({ onBack }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(() => setMessage(''), 2400)
    return () => window.clearTimeout(timer)
  }, [message])

  return (
    <section className="about-paper">
      {onBack && (
        <button type="button" className="about-back" onClick={onBack}>
          BACK
        </button>
      )}
      <p className="about-kicker">ABOUT ME</p>
      <h1 className="about-name">
        <span>夏宣</span>
        <span>SUNA XIA</span>
      </h1>
      <div className="about-copy">
        {aboutIntro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="career-list">
        {careerItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>

      <div className="contact-actions">
        <button type="button" onClick={() => copyText(phone, setMessage)}>
          复制电话
        </button>
        <button type="button" onClick={() => copyText(email, setMessage)}>
          复制邮箱
        </button>
      </div>

      {message && (
        <div className="copy-toast" role="status" aria-live="polite">
          {message}
        </div>
      )}
    </section>
  )
}

function AboutPanel({ open, onClose }) {
  return (
    <aside className={`about-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <AboutContent />
      <button type="button" className="panel-close" onClick={onClose}>
        收起目录
      </button>
    </aside>
  )
}

function ProjectMenu({ activeSlug, onSelect, onAbout }) {
  return (
    <div className="menu-inner">
      <div className="menu-masthead">
        <button type="button" className="wordmark" onClick={() => onSelect(portfolioCases[0].slug)}>
          XIA XUAN
        </button>
      </div>

      <nav className="project-menu" aria-label="品牌项目目录">
        {portfolioCases.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            className={getMenuItemClass(item, activeSlug)}
            onClick={() => onSelect(item.slug)}
          >
            <span>{getArchiveIndex(index)}</span>
            <strong>{getBrandName(item)}</strong>
          </button>
        ))}
      </nav>

      <div className="menu-footer">
        <button type="button" onClick={onAbout}>ABOUT ME</button>
        <small>copywriter/planner</small>
      </div>
    </div>
  )
}

function Sidebar({ activeSlug, onSelectProject }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const selectAndClose = (slug) => {
    onSelectProject(slug)
    setDrawerOpen(false)
    setAboutOpen(false)
  }

  const openAbout = () => {
    setDrawerOpen(false)
    setAboutOpen(true)
  }

  const closePanels = () => {
    setDrawerOpen(false)
    setAboutOpen(false)
  }

  const toggleMobilePanel = () => {
    if (drawerOpen || aboutOpen) {
      closePanels()
      return
    }

    setDrawerOpen(true)
  }

  return (
    <>
      <aside className="archive-sidebar desktop-sidebar">
        <ProjectMenu
          activeSlug={activeSlug}
          onSelect={onSelectProject}
          onAbout={openAbout}
        />
      </aside>

      <button
        type="button"
        className={`mobile-menu-tab ${drawerOpen || aboutOpen ? 'is-open' : ''}`}
        onClick={toggleMobilePanel}
        aria-expanded={drawerOpen || aboutOpen}
      >
        展开目录
      </button>

      {(drawerOpen || aboutOpen) && (
        <button
          type="button"
          className="drawer-backdrop"
          aria-label="关闭面板"
          onClick={closePanels}
        />
      )}

      <aside
        className={`archive-sidebar mobile-drawer ${drawerOpen ? 'is-open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <ProjectMenu
          activeSlug={activeSlug}
          onSelect={selectAndClose}
          onAbout={openAbout}
        />
        <button type="button" className="drawer-edge-close" onClick={closePanels}>
          收起目录
        </button>
      </aside>

      <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}

function getProjectIndexBySlug(slug) {
  return Math.max(0, portfolioCases.findIndex((item) => item.slug === slug))
}

function useVisibleFoldCount() {
  const [count, setCount] = useState(() => (
    window.matchMedia('(max-width: 900px)').matches ? 2 : 3
  ))

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const update = () => setCount(query.matches ? 2 : 3)

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return count
}

function ProjectNotes({ item }) {
  const brandName = getBrandName(item)

  return (
    <div className="note-stack" aria-label={`${brandName} 项目举例`}>
      {item.projects.map((project, index) => (
        <article className="note-card" key={project.title} tabIndex={0}>
          <span className="note-number">{getArchiveIndex(index)}</span>
          <div className="note-image">
            <img src={project.image} alt={`${brandName} - ${project.title}`} loading="lazy" decoding="async" />
          </div>
          <h3>{project.title}</h3>
          <p>{project.text}</p>
        </article>
      ))}
    </div>
  )
}

function ProjectSheet({ item, index, active, foldOrder, foldCount, onSelect }) {
  const foldRightIndex = Math.max(0, foldCount - 1 - foldOrder)
  const brandName = getBrandName(item)
  const brandTitleClass = getBrandTitleClass(item)

  return (
    <section
      className={`project-sheet ${active ? 'is-active' : 'is-folded'}`}
      id={item.slug}
      style={{
        '--fold-order': foldOrder,
        '--fold-count': foldCount,
        '--fold-right': `calc(${foldRightIndex} * var(--fold-pitch))`,
      }}
    >
      <button
        type="button"
        className="fold-tab"
        onClick={() => onSelect(index)}
        aria-label={`切换到 ${brandName}`}
      >
        <span className="fold-brand">{brandName}</span>
      </button>

      {active && (
        <div className="sheet-content sheet-detail-content">
          <div className="sheet-index">{getArchiveIndex(index)}</div>
          <header className="sheet-header">
            <p>{item.role}</p>
            <h2 className={brandTitleClass}>{brandName}</h2>
          </header>

          <section className="detail-section">
            <span>INTRO</span>
            <p>{item.summary}</p>
          </section>
          <section className="detail-section">
            <span>PROBLEM</span>
            <p>{item.problem}</p>
          </section>
          <section className="detail-section">
            <span>SOLUTION</span>
            <p>{item.solution}</p>
          </section>
          {item.result && (
            <section className="detail-section">
              <span>RESULT / 结果</span>
              <p>{item.result}</p>
            </section>
          )}
          <section className="detail-section">
            <span>NOTES</span>
            <ProjectNotes item={item} />
          </section>
        </div>
      )}
    </section>
  )
}

function ArchivePage() {
  const archiveRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleFoldCount = useVisibleFoldCount()
  const activeSlug = portfolioCases[activeIndex].slug

  const selectProject = (slug) => {
    setActiveIndex(getProjectIndexBySlug(slug))
  }

  useArchiveReveal(archiveRef, [activeIndex])
  useStackHover(archiveRef, [activeIndex])

  const visibleIndexes = [
    activeIndex,
    ...portfolioCases
      .map((_, index) => index)
      .filter((index) => index > activeIndex)
      .slice(0, visibleFoldCount),
  ]
  const foldedIndexes = visibleIndexes.filter((index) => index !== activeIndex)

  return (
    <main className="archive-shell" ref={archiveRef}>
      <Sidebar activeSlug={activeSlug} onSelectProject={selectProject} />
      <div
        className="archive-track"
        aria-live="polite"
        style={{ '--visible-folds': foldedIndexes.length }}
      >
        {visibleIndexes.map((index) => {
          const item = portfolioCases[index]
          return (
            <ProjectSheet
              item={item}
              index={index}
              active={index === activeIndex}
              foldOrder={foldedIndexes.indexOf(index)}
              foldCount={foldedIndexes.length}
              onSelect={setActiveIndex}
              key={item.slug}
            />
          )
        })}
      </div>
    </main>
  )
}

function DetailPage({ id }) {
  const detailRef = useRef(null)
  const index = Number(id) - 1
  const item = portfolioCases[index]

  useStackHover(detailRef, [id])

  if (!item) return <ArchivePage />

  const brandName = getBrandName(item)
  const brandTitleClass = getBrandTitleClass(item)

  const selectDetailProject = (slug) => {
    const nextIndex = getProjectIndexBySlug(slug)
    navigate(`/on-duty/${nextIndex + 1}`)
  }

  return (
    <main className="archive-shell detail-shell" ref={detailRef}>
      <Sidebar activeSlug={item.slug} onSelectProject={selectDetailProject} />
      <article className="detail-paper">
        <button type="button" className="back-link" onClick={() => navigate('/')}>
          BACK TO INDEX
        </button>
        <header className="detail-header">
          <p className="detail-meta">{item.role}</p>
          <h1 className={brandTitleClass}>{brandName}</h1>
        </header>

        <section className="detail-section">
          <span>INTRO</span>
          <p>{item.summary}</p>
        </section>
        <section className="detail-section">
          <span>PROBLEM</span>
          <p>{item.problem}</p>
        </section>
        <section className="detail-section">
          <span>SOLUTION</span>
          <p>{item.solution}</p>
        </section>
        {item.result && (
          <section className="detail-section">
            <span>RESULT / 结果</span>
            <p>{item.result}</p>
          </section>
        )}
        <section className="detail-section">
          <span>NOTES</span>
          <ProjectNotes item={item} />
        </section>
      </article>
    </main>
  )
}

async function copyText(value, setMessage) {
  const successMessage = `复制成功：${value}`
  const fallbackMessage = `复制失败，请手动复制：${value}`

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value)
      setMessage(successMessage)
      return
    }

    if (copyWithTextArea(value)) {
      setMessage(successMessage)
      return
    }

    setMessage(fallbackMessage)
  } catch {
    setMessage(copyWithTextArea(value) ? successMessage : fallbackMessage)
  }
}

function copyWithTextArea(value) {
  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.top = '0'
  field.style.left = '0'
  field.style.width = '1px'
  field.style.height = '1px'
  field.style.padding = '0'
  field.style.border = '0'
  field.style.opacity = '0'
  field.style.fontSize = '16px'
  document.body.appendChild(field)
  field.focus()
  field.select()
  field.setSelectionRange(0, value.length)

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(field)
  }
}

function AboutPage() {
  return (
    <main className="about-page">
      <AboutContent onBack={() => navigate('/')} />
    </main>
  )
}

function App() {
  const pathname = usePathname()
  const route = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] === 'on-duty' && parts[1]) return { page: 'detail', id: parts[1] }
    if (parts[0] === 'contact') return { page: 'about' }
    return { page: 'archive' }
  }, [pathname])

  if (route.page === 'detail') return <DetailPage id={route.id} />
  if (route.page === 'about') return <AboutPage />
  return <ArchivePage />
}

createRoot(document.getElementById('root')).render(<App />)
