import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'CONTACT', path: '/contact' },
]

const rasterAsset = /\.(png|jpe?g)$/i
const optimizedRasterPath = (path) => path.replace(rasterAsset, '.webp')
const asset = (path) => rasterAsset.test(path)
  ? `/portfolio/optimized/assets/${optimizedRasterPath(path)}`
  : `/portfolio/assets/${path}`
const offDutyAsset = (path) => `/portfolio/optimized/off-duty/${optimizedRasterPath(path)}`
const phone = '15388077589'
const email = 'shainexx@yeah.net'

const careerItems = [
  '2025.12-2026.05 三号椰（上海）品牌管理有限公司 策划高级专员',
  '2023.12-2025.07 栗壳广告有限公司 资深文案',
  '2022.11-2023.12 野伙伙广告有限公司 创意文案',
  '2021.06-2022.09 有门广告有限公司 创意文案',
]

const portfolioCases = [
  {
    brand: '三号椰',
    slug: 'sanhoye',
    featured: true,
    color: 'green',
    logo: asset('三号椰/三号椰品牌logo.png'),
    summary: '从0-1搭建新晋茶饮品牌官媒账号，以项目常态化运营把新品、联名和热点内容持续变成可传播资产。',
    role: '品牌官媒搭建 / 社媒内容营销 / 产品宣推转化',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '新品牌需要快速被看见，也需要稳定长出内容人格',
        copy: [
          '三号椰处在品牌声量上升期，业务问题不是单次内容出街，而是如何让官方社媒从空白账号变成能承接新品、联名、用户互动和门店转化的稳定阵地。',
          '内容策略把“新晋网红茶饮”的产品上新节奏和社媒平台语境绑定起来，让品牌不只发布信息，而是持续制造可讨论、可收藏、可下单的内容理由。',
        ],
        layout: 'single-wide',
        assets: [asset('三号椰/独立内容策划示例1-下图-项目节奏策划.png')],
      },
      {
        stage: '前端策划思考',
        title: '把产品节点拆成可执行的内容节奏',
        copy: [
          '策划侧先解决账号要讲什么、什么时候讲、用什么人设讲的问题，把产品上市、联名事件、热点借势拆成可复用的项目节奏。',
          '账号运营区分、项目节奏策划和平台语气被前置梳理，确保每一次新品宣推都能进入统一的品牌内容系统。',
        ],
        layout: 'single-wide',
        assets: [asset('三号椰/独立内容策划示例1-上图-账号运营区分.png')],
      },
      {
        stage: '内容运营搭建',
        title: '常态化内容让品牌持续有故事感',
        copy: [
          '内容运营以“项目常态化”为核心，不让爆点停在一次发布，而是围绕产品口味、联名视觉、平台热点持续拆出图文内容。',
          '桃子、桑葚等产品联名被包装成具有质感和轻松趣味的内容主题，帮助品牌主页形成稳定调性。',
        ],
        layout: 'sanhoye-content',
        assets: [asset('三号椰/质感内容运营及项目常态化运营示例1-桃子产品联名项目.png'), asset('三号椰/质感内容运营示例2-桑葚产品联名项目.png'), asset('三号椰/创意热点图文1.jpeg'), asset('三号椰/创意热点图文2.jpeg'), asset('三号椰/创意热点图文3.jpeg'), asset('三号椰/创意热点图文4.jpeg')],
      },
      {
        stage: '产品宣推落地',
        title: '把跨部门需求翻译成用户愿意点开的内容',
        copy: [
          '产品、营运、法务等多方需求被转译成平台可读的文案与视觉方向，既保证产品信息准确，又让宣推内容保留网感和种草感。',
          '内容从品牌内部目标出发，最终落到用户能感知的口味、场景、联名情绪与购买理由。',
        ],
        layout: 'two-wide',
        assets: [asset('三号椰/跨部门宣推产品示例1.png'), asset('三号椰/跨部门宣推产品示例2.png')],
      },
      {
        stage: '实现转化效果',
        title: '爆文与转化一起发生',
        copy: [
          '账号累计涨粉2w+，产出15+千赞爆文；爆文内容反向助推产品关注和品牌主页质感提升。',
          '内容不只是热闹，而是在新品上市和联名传播中承担真实的引流、种草和转化价值。',
        ],
        layout: 'four-even',
        assets: [asset('三号椰/多篇千赞爆文1.jpeg'), asset('三号椰/多篇千赞爆文2.jpeg'), asset('三号椰/多篇千赞爆文3.jpeg'), asset('三号椰/多篇千赞爆文4.jpeg')],
      },
    ],
  },
  {
    brand: '怡丽丝尔',
    slug: 'elixir',
    featured: true,
    color: 'gold',
    logo: asset('怡丽丝尔/怡丽丝尔品牌logo.jpeg'),
    summary: '围绕代言人、新品面霜和直播事件，把品牌年轻化表达、产品卖点和销售转化连成同一条传播链路。',
    role: '品牌营销 / 产品创意策划 / 直播传播转化',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '高端护肤品牌需要把新代言人热度落到新品心智',
        copy: [
          '怡丽丝尔的核心问题，是如何让代言人官宣、新品面霜上市和日常社媒内容彼此借力，而不是各自独立发声。',
          '内容策略将品牌形象、明星特质、产品功效与用户生活状态连接起来，让“品牌更新换代”具备更清晰的传播抓手。',
        ],
        layout: 'elixir-opening',
        assets: [asset('怡丽丝尔/品牌-形象代言人示例1.png'), asset('怡丽丝尔/品牌-形象代言人示例2.png')],
      },
      {
        stage: '前端策划思考',
        title: '用产品创意概念降低功效沟通门槛',
        copy: [
          '策划将紧塑带面霜与新代言人的共同特征转化为可传播概念，把高阶功效语言翻译成更容易被用户记住的表达。',
          '前端方案不只解释产品，而是帮助品牌找到“为什么此刻需要它”的情绪入口。',
        ],
        layout: 'two-wide',
        assets: [asset('怡丽丝尔/产品创意策划示例1.png'), asset('怡丽丝尔/产品创意策划示例2.png')],
      },
      {
        stage: '内容运营搭建',
        title: '把全年内容矩阵变成可持续的品牌沟通机制',
        copy: [
          '全年内容规划围绕新品、代言人、直播与日常栏目展开，让品牌在预热期、爆发期和长尾期保持稳定露出。',
          '宣传内容策划承担从策略到社媒语言的中间层，把品牌想表达的价值变成平台能承接的内容。',
        ],
        layout: 'two-wide',
        assets: [asset('怡丽丝尔/内容-宣传内容策划示例1.png'), asset('怡丽丝尔/内容-宣传内容策划示例2.png')],
      },
      {
        stage: '产品宣推落地',
        title: '直播事件把新品和代言人声量同时推高',
        copy: [
          '第二代眼霜与代言人直播项目中，传播以“五感互动”作为用户参与机制，串联预热社媒造势和爆发期直播事件。',
          '内容物料让明星流量服务于主推产品，也让产品卖点反向强化新代言人的品牌绑定。',
        ],
        layout: 'two-vertical',
        assets: [asset('怡丽丝尔/转化-直播宣传海报.png'), asset('怡丽丝尔/品牌-形象代言人示例备选.png')],
      },
      {
        stage: '实现转化效果',
        title: '社媒热度、销售榜单和粉丝自传播形成闭环',
        copy: [
          '项目实现抖音+天猫销售榜首、销量500w+，微博热搜稳居前十，并带动粉丝切片扩散。',
          '直播不只完成一次曝光，而是成为新品认知、品牌讨论和销售转化共同发生的节点。',
        ],
        layout: 'two-wide',
        assets: [asset('怡丽丝尔/转化-直播数据榜单.png'), asset('怡丽丝尔/转化-直播粉丝自发宣传示例.png')],
      },
    ],
  },
  {
    brand: '祖·玛珑',
    slug: 'jomalone',
    featured: true,
    color: 'black',
    logo: asset('祖·玛珑/祖玛珑品牌logo.png'),
    summary: '用香氛叙事连接新品主题、英伦品牌调性与社媒种草，把海岛、Hinoki、古董系列做成可感知的产品故事。',
    role: '香氛品牌策划 / 媒介爆款方案 / 快闪落地',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '香氛新品需要先被想象，再被种草',
        copy: [
          '祖·玛珑的传播难点在于，香气无法直接被屏幕传递，内容必须先建立场景、情绪和品牌叙事，让用户愿意靠近产品。',
          '策略延续英伦调性，同时为不同新品建立独特主题信息，帮助香氛从抽象气味转为可分享的生活想象。',
        ],
        layout: 'single-product',
        assets: [asset('祖·玛珑/祖玛珑产品特写.png')],
      },
      {
        stage: '前端策划思考',
        title: '先定义香气故事，再组织媒介表达',
        copy: [
          '品牌策划围绕新品主题、目标人群和社媒种草角度展开，用“可被讲述的产品叙事”替代单纯卖点罗列。',
          '海岛、Hinoki、古董系列分别对应不同情绪场域，使传播内容具备可延展的视觉与文案方向。',
        ],
        layout: 'four-wide',
        assets: [asset('祖·玛珑/品牌-独立产出品牌策划示例1.png'), asset('祖·玛珑/品牌-独立产出品牌策划示例2.png'), asset('祖·玛珑/产品-打造独特品牌叙事示例1.png'), asset('祖·玛珑/产品-打造独特品牌叙事示例2.png')],
      },
      {
        stage: '内容运营搭建',
        title: '全年媒介方案让香气主题持续出街',
        copy: [
          '内容搭建围绕全年业务线展开，以媒介端爆款方案承接不同新品节奏，让系列产品在社媒语境中持续获得新鲜表达。',
          '从海岛到Hinoki再到古董系列，内容以场景化图片、主题文案和平台出街物料形成连续记忆。',
        ],
        layout: 'three-rows',
        assets: [asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-海岛产品-示例1.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-海岛产品-示例2.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-hinoki产品-示例1.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-hinoki产品-示例2.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-古董系列产品-示例1.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-古董系列产品-示例2.png')],
      },
      {
        stage: '产品宣推落地',
        title: '从媒介出街到快闪活动，产品被放进可参与的场景',
        copy: [
          '出街内容承担新品认知扩散，快闪与活动落地进一步把线上香气想象导向线下体验。',
          '传播让用户先在内容中“闻到”产品，再在线下或购买链路里完成靠近。',
        ],
        layout: 'three-vertical',
        assets: [asset('祖·玛珑/内容-独立承包全年媒介爆款方案-出街示例1.jpeg'), asset('祖·玛珑/内容-独立承包全年媒介爆款方案-出街示例2.jpeg'), asset('祖·玛珑/转化-协助快闪等活动落地示例1.png')],
      },
      {
        stage: '实现转化效果',
        title: '数据反馈验证主题叙事的传播效率',
        copy: [
          '海岛系列、Hinoki产品和古董系列均沉淀出对应出街数据，让香氛新品传播不止停留在调性表达，也具备媒介端反馈。',
        ],
        layout: 'three-wide',
        assets: [asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-海岛系列产品-出街数据示例.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-hinoki产品-出街数据示例.png'), asset('祖·玛珑/祖玛珑品牌全年业务线媒介端宣传方案-古董系列产品-出街示例.png')],
      },
    ],
  },
  {
    brand: '巴黎欧莱雅',
    slug: 'loreal',
    featured: true,
    color: 'red',
    logo: asset('巴黎欧莱雅/巴黎欧莱雅品牌logo.jpeg'),
    summary: '围绕黑金气垫与奶润气垫，打通品牌策略、产品卖点、活动方案、视频脚本、直播出街和转化内容。',
    role: '美妆 Campaign / 产品卖点策划 / 直播与社媒文案',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '底妆产品需要在季节场景里重新被选择',
        copy: [
          '巴黎欧莱雅黑金气垫面对的是竞争激烈的底妆心智，传播需要把产品卖点从功效参数转译成更具体的季节和妆容场景。',
          '策略将“干皮救星”“持妆”“奶润”等产品利益点放进夏季、运动、直播互动等用户可感知场景。',
        ],
        layout: 'single-product',
        assets: [asset('巴黎欧莱雅/巴黎欧莱雅奶润气垫产品特写.png')],
      },
      {
        stage: '前端策划思考',
        title: '品牌策略和产品卖点先被拆成传播抓手',
        copy: [
          '前端策略先定义品牌要占据的产品位置，再把卖点拆成内容角度：妆效、肤感、季节场景和用户行动理由。',
          '产品卖点策划让功能语言变得更好传播，为后续活动方案和视频脚本提供统一方向。',
        ],
        layout: 'four-wide',
        assets: [asset('巴黎欧莱雅/品牌策略示例1.png'), asset('巴黎欧莱雅/品牌策略示例2.png'), asset('巴黎欧莱雅/产品卖点策划示例1.png'), asset('巴黎欧莱雅/产品卖点策划示例2.png')],
      },
      {
        stage: '产品宣推落地',
        title: '活动方案、视频脚本和直播出街共同完成新品声量',
        copy: [
          '夏季场景宣推以视频脚本承接产品卖点，用更有画面感的内容推动用户理解产品适用场景。',
          '直播出街内容把品牌限定活动变成可观看、可参与、可扩散的事件节点。',
        ],
        layout: 'loreal-launch',
        assets: [asset('巴黎欧莱雅/内容-活动方案示例1.png'), asset('巴黎欧莱雅/内容-活动方案示例2.png'), asset('巴黎欧莱雅/欧莱雅黑金气垫夏季场景宣推方案视频脚本示例1.png'), asset('巴黎欧莱雅/欧莱雅黑金气垫夏季场景宣推方案视频脚本示例2.png'), asset('巴黎欧莱雅/黑金气垫直播出街示例1.png'), asset('巴黎欧莱雅/黑金气垫直播出街示例2.png')],
      },
      {
        stage: '实现转化效果',
        title: '出街内容把传播热度导向产品行动',
        copy: [
          '转化内容把产品利益点和购买理由显性化，让前端创意最终落到用户决策。',
          '直播、活动与出街素材共同提升新品被看见、被理解和被下单的概率。',
        ],
        layout: 'two-wide',
        assets: [asset('巴黎欧莱雅/转化-出街内容示例1.png'), asset('巴黎欧莱雅/转化-出街内容示例2.png')],
      },
    ],
  },
  {
    brand: '雅诗兰黛',
    slug: 'esteelauder',
    color: 'pink',
    logo: asset('雅诗兰黛/雅诗兰黛品牌logo.jpeg'),
    logoMissing: '雅诗兰黛',
    summary: '围绕3.8女性赋能计划，让品牌公益议题以更具表达力和传播感的方式被看见。',
    role: '女性公益 Campaign / 品牌议题传播 / 社媒内容',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '女性议题需要避免空泛表达，转向真实共鸣',
        copy: [
          '3.8女性赋能计划的关键不是单纯借势节点，而是让品牌在女性成长、创想与自我表达议题里拥有可信的沟通姿态。',
          '传播需要把公益项目从品牌话术转为用户能感知的情绪和故事。',
        ],
        layout: 'single-wide straight',
        assets: [asset('雅诗兰黛/雅诗兰黛38女性赋能计划宣传方案示例1.png')],
      },
      {
        stage: '前端策划思考',
        title: '用“梦由她创”承接品牌价值与女性创想',
        copy: [
          '策划把女性创想家赋能计划作为核心表达，让品牌立场与具体人物、真实故事和公共议题发生连接。',
          '内容方向强调女性力量，同时避免口号化表达，让公益传播更具温度。',
        ],
        layout: 'three-wide',
        assets: [asset('雅诗兰黛/雅诗兰黛38女性赋能计划宣传方案示例2.png'), asset('雅诗兰黛/雅诗兰黛38女性赋能计划宣传方案示例3.png'), asset('雅诗兰黛/雅诗兰黛38女性赋能计划宣传方案示例4.png')],
      },
      {
        stage: '产品宣推落地',
        title: '宣传方案让议题有可视化出口',
        copy: [
          '项目物料将女性议题转化为可发布、可阅读、可传播的社媒内容，让品牌公益项目具备清晰的外部表达。',
          '软性价值落在品牌好感和议题记忆上，而不是硬性销售转化。',
        ],
        layout: 'estee-launch',
        assets: [asset('雅诗兰黛/女性创想家赋能计划-补充图1.jpeg'), asset('雅诗兰黛/女性创想家赋能计划-二维码1.svg'), asset('雅诗兰黛/女性创想家赋能计划-补充图2.jpeg'), asset('雅诗兰黛/女性创想家赋能计划-二维码2.svg')],
      },
    ],
  },
  {
    brand: 'NARS',
    slug: 'nars',
    color: 'black',
    logo: asset('NARS/NARS品牌LOGO.jpeg'),
    summary: '把小程序、全年运营、明星物料、产品上新、电商节点宣推和线下快闪整合为高辨识度内容矩阵。',
    role: '全平台运营 / 小程序宣推 / Campaign配合',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '彩妆品牌需要在不同节点保持高频但不失调性',
        copy: [
          'NARS的内容任务横跨产品上新、明星物料、线下活动、电商节点和小程序宣推，挑战在于让不同节点共享同一套品牌高级感。',
          '内容以“岛”“追光逐色”“位置共享”等概念作为入口，让电商节点和活动也能保留品牌叙事。',
        ],
        layout: 'text-poster',
        assets: [],
      },
      {
        stage: '前端策划思考',
        title: '小程序从功能上线变成可传播事件',
        copy: [
          '小程序上线宣推不只说明功能，而是把“玩妆岛”包装成用户愿意进入的品牌场景。',
          '前端宣传内容策划先建立概念和路径，再让出街内容承担点击和转化入口。',
        ],
        layout: 'two-wide',
        assets: [asset('NARS/NARS玩妆岛小程序上新宣推企划示例1-前端内容策划.png'), asset('NARS/NARS玩妆岛小程序上新宣推企划示例2-前端宣传内容策划.png')],
      },
      {
        stage: '内容运营搭建',
        title: '全年运营让每种物料都有对应话语系统',
        copy: [
          '全年运营将明星物料、产品上新、线下活动和Campaign配合纳入统一内容框架，让不同物料都能服务品牌人格。',
          '社媒文案在高级、直接、可行动之间寻找平衡。',
        ],
        layout: 'eight-compact',
        assets: [asset('NARS/NARS全平台运营示例-明星物料1.png'), asset('NARS/NARS全平台运营示例-明星物料2.png'), asset('NARS/NARS全平台运营示例-明星物料3.png'), asset('NARS/NARS全平台运营示例-产品上新1.png'), asset('NARS/NARS全平台运营示例-产品上新2.png'), asset('NARS/NARS全平台运营示例-产品上新3.png'), asset('NARS/NARS全平台运营示例-产品上新4.png'), asset('NARS/NARS全平台运营示例-线下活动.png')],
      },
      {
        stage: '产品宣推落地',
        title: '营销 Campaign 配合，让品牌节点稳定出街',
        copy: [
          '围绕产品上新、节点营销和品牌 Campaign，内容以统一的视觉调性与短促有力的社媒文案承接传播节奏。',
          '不同物料在同一套品牌语气下完成外部露出，让高频内容不显散乱，也让每一次宣推都能服务品牌记忆。',
        ],
        layout: 'four-wide compact-view',
        assets: [asset('NARS/NARS全平台运营示例--campaign配合1.png'), asset('NARS/NARS全平台运营示例--campaign配合2.png'), asset('NARS/NARS全平台运营示例--campaign配合3.png'), asset('NARS/NARS全平台运营示例--campaign配合4.png')],
      },
      {
        stage: '实现转化效果',
        title: '文案内容与跳转链路协同，构建完整内容闭环',
        copy: [
          '在公众号、微博内容内植入小程序等转化跳转入口，联动营销 Campaign 承接用户从兴趣萌生到产生行动的完整路径，让内容不止具备传播观赏性，更可直接引导用户完成点击转化。',
        ],
        layout: 'nars-launch',
        assets: [asset('NARS/NARS全平台运营示例--公众号推文618宣推首屏.png'), asset('NARS/NARS全平台运营示例--公众号推文618宣推详情页.png'), asset('NARS/NARS全平台运营示例--公众号推文618宣推-跳转链接.jpeg'), asset('NARS/NARS全平台运营示例--公众号推文新品唇膏首屏.png'), asset('NARS/NARS全平台运营示例--公众号推文新品唇膏详情页.png'), asset('NARS/NARS全平台运营示例--公众号推文新品唇膏-跳转链接.png'), asset('NARS/NARS玩妆岛小程序上新宣推企划示例2-出街内容.png'), asset('NARS/NARS玩妆岛小程序上新宣推企划示例3-出街内容.png')],
      },
    ],
  },
  {
    brand: '格力高',
    slug: 'glico',
    color: 'blue',
    logo: asset('格力高/格力高品牌logo.jpeg'),
    summary: '通过小红书全年运营，把热点追踪、创意插画和主题内容变成快消品牌持续种草机制。',
    role: '小红书全年运营 / 热点追踪 / 创意插画内容',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '快消品牌需要长期出现，也要每次出现都有理由',
        copy: [
          '格力高的小红书运营需要解决长期陪伴感和即时热点感之间的平衡：既要稳定种草产品，也要让内容跟得上平台语境。',
          '内容策略以月度主题和热点切入，让产品在日常生活、节日情绪和社交话题中持续被看见。',
        ],
        layout: 'text-poster',
        assets: [],
      },
      {
        stage: '内容运营搭建',
        title: '主题内容建立账号记忆点',
        copy: [
          '全年运营通过主题摄影和创意插画搭建视觉栏目，使品牌内容从单纯产品露出转向更有识别度的生活表达。',
          '图文内容以轻松、明亮、可收藏的方式服务种草。',
        ],
        layout: 'eight-compact',
        assets: [asset('格力高/格力高小红书全年运营-主题插画示例1.png'), asset('格力高/格力高小红书全年运营-主题插画示例2.png'), asset('格力高/格力高小红书全年运营-主题插画示例3.png'), asset('格力高/格力高小红书全年运营-主题插画示例4.png'), asset('格力高/格力高小红书全年运营-创意插画示例1.png'), asset('格力高/格力高小红书全年运营-创意插画示例2.png'), asset('格力高/格力高小红书全年运营-创意插画示例3.png'), asset('格力高/格力高小红书全年运营-创意插画示例4.png')],
      },
      {
        stage: '产品宣推落地',
        title: '热点追踪让产品自然进入当下讨论',
        copy: [
          '热点内容把产品植入当下语境，让品牌不只是发布新品，而是参与用户正在讨论的话题。',
          '持续热点追踪帮助品牌保持平台活跃度和年轻沟通感。',
        ],
        layout: 'four-even compact-view',
        assets: [asset('格力高/格力高小红书全年运营-热点追踪示例1.png'), asset('格力高/格力高小红书全年运营-热点追踪示例2.png'), asset('格力高/格力高小红书全年运营-热点追踪示例3.png'), asset('格力高/格力高小红书全年运营-热点追踪示例4.png')],
      },
    ],
  },
  {
    brand: '爱慕',
    slug: 'aimer',
    color: 'red',
    logo: asset('爱慕/爱慕品牌logo.jpeg'),
    summary: '围绕女性生活洞察搭建全平台内容矩阵，让品牌从产品售卖延展到情绪陪伴和价值表达。',
    role: '女性品牌运营 / 公众号爆文 / ATL & Social Copy',
    modules: [
      {
        stage: '业务背景与业务问题',
        title: '内衣品牌需要在功能之外建立女性情绪连接',
        copy: [
          '爱慕的内容问题不是简单推新品，而是如何把产品、女性身体、季节生活和品牌价值观自然连接起来。',
          '策略从真实女性生活洞察切入，让社媒内容既能承接产品卖点，也能形成长期品牌好感。',
        ],
        layout: 'text-poster',
        assets: [],
      },
      {
        stage: '前端策划思考',
        title: '三条年度主题把产品沟通变成生活叙事',
        copy: [
          '#穿过夏日# 把吊带产品放进通勤、商场冷气和夏日身体状态里，强化夏季产品的轻盈与舒适。',
          '#天生热点# 将温暖从体感温度延展到内心感受，让冬季产品具备陪伴感。',
          '#野可以这样# 从节气、出游和女性经历切入，让“野”成为一种生活态度。',
        ],
        layout: 'three-wide',
        assets: [asset('爱慕/穿过夏日项目出街内容示例.png'), asset('爱慕/天生热点项目出街内容示例.png'), asset('爱慕/野可以这样项目出街内容示例.png')],
      },
      {
        stage: '内容运营搭建',
        title: '多种文风和栏目内容支撑长期陪伴',
        copy: [
          '全平台内容矩阵覆盖品牌向、代言人宣传向、热点互动向等多种文风，让账号能在不同节点保持清晰但不僵硬的表达。',
          '公众号内容以产品详情、情感洞察和活动入口形成完整阅读路径。',
        ],
        layout: 'three-wide compact-view',
        assets: [asset('爱慕/多种文风示例1-品牌向文案.png'), asset('爱慕/多种文风示例2-代言人宣传向.png'), asset('爱慕/多种文风示例3-热点互动向.png')],
      },
      {
        stage: '产品宣推落地',
        title: '节点海报、运动主题和新品卖点共同出街',
        copy: [
          '运动季以#十万个运动理由#互动话题承接产品与用户行动，节点海报则把品牌价值观放进节日和热点语境。',
          '当季新品亮点文案从RTB出发，将卖点转化为更日常、更具陪伴感的表达。',
        ],
        layout: 'aimer-launch',
        assets: [asset('爱慕/十万个运动理由-文案示例1.jpeg'), asset('爱慕/十万个运动理由-文案示例2.jpeg'), asset('爱慕/十万个运动理由-文案示例3.jpeg'), asset('爱慕/十万个运动理由-文案示例4.jpeg'), asset('爱慕/当季新品亮点文案1.jpeg'), asset('爱慕/当季新品亮点文案2.png'), asset('爱慕/当季新品亮点文案3.png'), asset('爱慕/当季新品亮点文案4.png'), asset('爱慕/节日热点海报创意及文案1-奥运.png'), asset('爱慕/节日热点海报创意及文案2-世界读书日.jpeg'), asset('爱慕/节日热点海报创意及文案3-五一劳动节.jpeg'), asset('爱慕/节日热点海报创意及文案4-谷爱凌夺冠.jpeg'), asset('爱慕/节日热点海报创意及文案5-端午节.png')],
      },
      {
        stage: '实现转化效果',
        title: '爆款推文与UGC让品牌好感转为行动反馈',
        copy: [
          '母亲节推文以深度情感沟通达成用户共鸣，线下门店用户可通过二维码进入内容链路。',
          '运动洞察内容在宣传产品之余引发用户共鸣，收获大量优质UGC，提升品牌好感。',
          '优质内容帮助新品卖点更深入人心，也为品牌带来销售转化。',
        ],
        layout: 'aimer-effect',
        assets: [asset('爱慕/爆款微信公众号推文示例1-新品首屏.jpeg'), asset('爱慕/爆款微信公众号推文示例1-产品详情文案.png'), asset('爱慕/爆款微信公众号推文示例1-跳转链接.jpeg'), asset('爱慕/爆款微信公众号推文示例2-母亲节推文首屏.png'), asset('爱慕/爆款微信公众号推文示例2-母亲节推文详情页.png'), asset('爱慕/爆款微信公众号推文示例2-跳转链接.jpeg'), asset('爱慕/爆款微信公众号推文示例3-运动洞察首屏.png'), asset('爱慕/爆款微信公众号推文示例3-运动洞察详情页.png'), asset('爱慕/爆款微信公众号推文示例3-跳转链接.jpeg'), asset('爱慕/天生热点项目-出街视频《让生活种种皆有温度》示例.png'), asset('爱慕/天生热点项目-出街视频《让生活种种皆有温度》示例-视频链接.jpeg')],
      },
    ],
  },
]

const offDutyItems = [
  {
    title: '脱口秀后台日记',
    slug: 'standup-volunteer',
    kicker: '笑果脱口秀志愿者 / 现场协助',
    cover: offDutyAsset('standup/standup-03.jpg'),
    summary: '在很多个笑声发生的地方，做一点幕后小事。',
    intro: [
      '笑果脱口秀志愿者的一晚。台上有人讲段子，台下有人憋笑、递水、看场。',
      '我负责一点现场协助，也留下了一点演出前后的空气。',
    ],
    detailKicker: '笑果脱口秀志愿者 / 现场协助',
    detailSummary: '在很多个笑声发生的地方，做一点幕后小事。',
    detailIntro: [
      '做过检票、现场秩序维护，也帮忙拍过一些演出和演练场照片。台上有人抛梗，台下有人接住，我通常在更靠后的地方，确认这场笑声可以顺利发生。',
      '这组照片来自其中一次周一山羊脱口秀演练场。只是某一晚，不代表全部，但很像那段时间的我：在现场、在走动、在看人怎么把生活讲成段子。',
    ],
    images: [
      offDutyAsset('standup/standup-01.jpg'),
      offDutyAsset('standup/standup-02.jpg'),
      offDutyAsset('standup/standup-03.jpg'),
      offDutyAsset('standup/standup-04.jpg'),
      offDutyAsset('standup/standup-05.jpg'),
      offDutyAsset('standup/standup-06.jpg'),
    ],
  },
  {
    title: '话筒旁的实习碎片',
    slug: 'modern-radio',
    kicker: '摩登音乐台 FM97.5',
    cover: offDutyAsset('radio/radio-07.jpeg'),
    summary: '和耳机、话筒、歌单、直播间打过交道的一段时间。',
    intro: [
      '在湖南广播电台 FM97.5 摩登音乐台实习，离声音很近，也离现场很近。',
      '广播间、活动现场、推文后台，都是另一种节奏里的内容练习。',
    ],
    detailKicker: '摩登音乐台 FM97.5',
    detailSummary: '一段和耳机、话筒、歌单、直播间打交道的日子。',
    detailIntro: [
      '做过社群运营、用户沟通、基础音频剪辑，也参与过活动执行。声音在这里不只是背景音，更像一种慢慢靠近人的方式。',
      '从电台到播客，我一直很喜欢：不用出现，也能被听见。',
    ],
    images: [
      offDutyAsset('radio/radio-02.jpeg'),
      offDutyAsset('radio/radio-07.jpeg'),
      offDutyAsset('radio/radio-03.jpeg'),
      offDutyAsset('radio/radio-05.jpeg'),
      offDutyAsset('radio/radio-08.jpeg'),
      offDutyAsset('radio/radio-09.jpeg'),
    ],
  },
]

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

function LinkButton({ to, children, className = '' }) {
  return (
    <button
      className={`link-button ${className}`}
      type="button"
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  )
}

function SiteNav() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const resumeRef = useRef(null)
  const wordmarkRef = useRef(null)

  useEffect(() => {
    if (!isResumeOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (
        resumeRef.current?.contains(event.target) ||
        wordmarkRef.current?.contains(event.target)
      ) {
        return
      }

      setIsResumeOpen(false)
    }

    window.addEventListener('pointerdown', closeOnOutsideClick)
    return () => window.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [isResumeOpen])

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="brand-corner">
        <button
          type="button"
          ref={wordmarkRef}
          onClick={() => setIsResumeOpen((current) => !current)}
          className="wordmark"
          aria-expanded={isResumeOpen}
          aria-controls="resume-popover"
        >
          XIA XUAN
        </button>
        {isResumeOpen && (
          <div className="resume-popover" id="resume-popover" ref={resumeRef}>
            <p>WORK LOG / 工作履历</p>
            <ul>
              {careerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="nav-links">
        {navItems.map((item) => (
          <button key={item.path} type="button" onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

function HomePage() {
  return (
    <main className="home-shell" id="home">
      <section className="home-stage">
        <SiteNav />
        <div className="home-content page-width">
          <section className="home-intro" aria-labelledby="home-intro-title">
            <p className="section-label" id="home-intro-title">
              ABOUT / 个人介绍
            </p>
            <div className="home-intro-grid">
              <article>
                <h2>文案策划 / 品牌策划</h2>
                <p>
                  致屏幕前想了解我的朋友：
                </p>
                <p>
                  你好，哪怕我们从没见过，也先认真打个招呼。
                </p>
                <p>
                  我是夏宣，做了4年多文案策划，深耕美妆护肤、香氛赛道，也做过快消、时尚相关项目。服务过雅诗兰黛集团、欧莱雅集团、NARS、爱慕、格力高等品牌。
                </p>
                <p>
                  我做过从0-1的内容搭建，也参与过品牌传播、社媒运营、产品宣推到转化落地的完整链路。我喜欢用漂亮的文字把问题说清楚，让品牌被记住、被喜欢。
                </p>
                <p>
                  如果你还想继续了解我，可以往下看看我的项目案例。
                </p>
              </article>
            </div>
          </section>

          <section className="home-attitude" aria-label="Attitude copy">
            <p className="ticker">COPYWRITER / BRAND CREATIVE PLANNER / SOCIAL IDEA MAKER</p>
            <h1>
              WRITE LOUD,
              <br />
              THINK WEIRD.
            </h1>
            <p className="slogan">
              把品牌想说的话，写得不像品牌硬要说的话。
            </p>
          </section>
        </div>

        <div className="home-bottom page-width">
          <div className="home-actions" aria-label="Portfolio sections">
            <LinkButton to="/on-duty" className="home-action">
              ON DUTY
            </LinkButton>
            <img
              className="home-action-portrait"
              src="/portfolio/pet/xia-tray-cutout.webp"
              alt=""
              aria-hidden="true"
              width="360"
              height="427"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <LinkButton to="/off-duty" className="home-action">
              OFF DUTY
            </LinkButton>
          </div>
          <ContactLine className="home-contact" />
        </div>
      </section>
    </main>
  )
}

function ContactLine({ className = '' }) {
  return (
    <p className={`contact-line ${className}`}>
      电话：{phone} <span>/</span> 邮箱：{email}
    </p>
  )
}

function SectionJumpFooter() {
  return (
    <footer className="section-jump page-width" aria-label="Portfolio section jumps">
      <div className="section-jump-actions">
        <LinkButton to="/on-duty" className="section-jump-button">
          ON DUTY
        </LinkButton>
        <LinkButton to="/off-duty" className="section-jump-button">
          OFF DUTY
        </LinkButton>
      </div>
      <ContactLine />
    </footer>
  )
}

function BrandLogo({ caseItem, showLabel = true }) {
  return (
    <>
      {caseItem.logo ? (
        <img src={caseItem.logo} alt={`${caseItem.brand} logo`} decoding="async" />
      ) : (
        <span className="logo-missing">{caseItem.logoMissing}</span>
      )}
      {showLabel && <span>{caseItem.brand}</span>}
    </>
  )
}

function CaseAsset({ src, label }) {
  if (!src) {
    return <div className="case-asset-placeholder">{label}</div>
  }

  return <img src={src} alt={label} loading="lazy" decoding="async" />
}

function OffDutyCard({ item }) {
  return (
    <>
      <img src={item.cover} alt={`${item.title} 封面`} loading="lazy" decoding="async" />
      <span>{item.title}</span>
      <small>{item.kicker}</small>
      <em>{item.summary}</em>
    </>
  )
}

function isQrAsset(src) {
  return src.includes('跳转链接') || src.includes('视频链接') || src.includes('二维码')
}

function isCutoutAsset(src) {
  return src.includes('形象代言人') || src.includes('代言人宣传') || src.includes('产品特写') || src.includes('奶润气垫')
}

function CaseModule({ module, index }) {
  const assets = module.assets || []
  const groupedAssets = assets.reduce((groups, src) => {
    if (isQrAsset(src)) {
      if (groups.length === 0) {
        groups.push({ src: null, qr: src })
      } else {
        groups[groups.length - 1].qr = src
      }
      return groups
    }

    groups.push({ src })
    return groups
  }, [])
  const visibleAssets = groupedAssets.filter((item) => item.src || item.qr)
  const workAssetCount = visibleAssets.filter((item) => item.src).length

  return (
    <section className={`story-module ${workAssetCount === 1 ? 'is-single-image' : ''} ${module.layout ? `layout-${module.layout}` : ''}`}>
      <div className="module-copy">
        <p className="module-index">{String(index + 1).padStart(2, '0')} / {module.stage}</p>
        <h2>{module.title}</h2>
        {module.copy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {assets.length > 0 && (
        <div className="module-assets">
          {visibleAssets.map((item, assetIndex) => (
            <figure
              className={`asset-scrap asset-${assetIndex + 1} ${item.src && isCutoutAsset(item.src) ? 'is-cutout' : ''} ${!item.src ? 'qr-only' : ''}`}
              key={`${module.stage}-${item.src || item.qr}`}
            >
              <CaseAsset src={item.src || item.qr} label={`${module.stage} 素材 ${assetIndex + 1}`} />
              {item.src && item.qr && (
                <img
                  className="qr-side"
                  src={item.qr}
                  alt={`${module.stage} 二维码 ${assetIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}

function ListingPage({ type }) {
  const isWork = type === 'work'
  const items = isWork ? portfolioCases : offDutyItems
  const base = isWork ? '/on-duty' : '/off-duty'

  return (
    <main>
      <SiteNav />
      <section className="listing page-width">
        <button className="back-link" type="button" onClick={() => navigate('/')}>
          BACK HOME
        </button>
        <p className="section-label">{isWork ? 'ON DUTY / 商业项目' : 'OFF DUTY / 个人内容'}</p>
        <div className={isWork ? 'logo-grid' : 'clip-grid off-duty-grid'}>
          {items.map((item, index) => (
            <button
              type="button"
              key={isWork ? item.brand : item.slug}
              className={isWork ? `logo-tile logo-${item.slug} ${item.featured ? 'is-featured' : ''}` : 'clip-tile off-duty-card'}
              onClick={() => navigate(`${base}/${index + 1}`)}
            >
              {isWork ? (
                <BrandLogo caseItem={item} />
              ) : (
                <OffDutyCard item={item} />
              )}
            </button>
          ))}
        </div>
      </section>
      <SectionJumpFooter />
    </main>
  )
}

function DetailPage({ type, id }) {
  const isWork = type === 'work'
  const caseData = isWork ? portfolioCases[Number(id) - 1] : null
  const personalData = !isWork ? offDutyItems[Number(id) - 1] : null

  if (isWork && caseData) {
    return (
      <main>
        <SiteNav />
        <article className={`detail case-detail case-${caseData.slug} page-width`}>
          <button
            className="back-link"
            type="button"
            onClick={() => navigate('/on-duty')}
          >
            BACK TO INDEX
          </button>
          <header className="case-hero">
            <div>
              <p className="section-label">CASE DETAIL / 商业项目</p>
              <h1>{caseData.brand}</h1>
              <p className="case-role">{caseData.role}</p>
              <p className="case-summary">{caseData.summary}</p>
            </div>
            <div className="case-hero-logo">
              <BrandLogo caseItem={caseData} showLabel={false} />
            </div>
          </header>

          <div className="story-flow">
            {caseData.modules.map((module, index) => (
              <CaseModule module={module} index={index} key={module.stage} />
            ))}
          </div>

          <ContactLine className="detail-contact" />
        </article>
      </main>
    )
  }

  if (!isWork && personalData) {
    return (
      <main>
        <SiteNav />
        <article className="detail off-duty-detail page-width">
          <button
            className="back-link"
            type="button"
            onClick={() => navigate('/off-duty')}
          >
            BACK TO INDEX
          </button>
          <header className="off-duty-hero">
            <p className="section-label">OFF DUTY / 个人内容</p>
            <h1>{personalData.title}</h1>
            <p className="case-role">{personalData.detailKicker || personalData.kicker}</p>
            <p className="case-summary">{personalData.detailSummary || personalData.summary}</p>
          </header>

          <section className="off-duty-story" aria-label={`${personalData.title} 图片与简介`}>
            <div className="off-duty-copy">
              {(personalData.detailIntro || personalData.intro).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="off-duty-gallery">
              {personalData.images.map((src, index) => (
                <figure className="off-duty-photo" key={src}>
                  <img src={src} alt={`${personalData.title} 素材 ${index + 1}`} loading="lazy" decoding="async" />
                </figure>
              ))}
            </div>
          </section>

          <ContactLine className="detail-contact" />
        </article>
      </main>
    )
  }

  return (
    <main>
      <SiteNav />
      <article className="detail page-width">
        <button
          className="back-link"
          type="button"
          onClick={() => navigate(isWork ? '/on-duty' : '/off-duty')}
        >
          BACK TO INDEX
        </button>
        <p className="section-label">{isWork ? 'CASE DETAIL' : 'PERSONAL DETAIL'}</p>
        <h1>{isWork ? `BRAND CASE ${id}` : `PERSONAL NOTE ${id}`}</h1>
        <div className="detail-layout">
          <div className="media-placeholder">MAIN VISUAL PLACEHOLDER</div>
          <div className="detail-copy">
            <p>项目标题 / 内容标题占位</p>
            <p>项目背景、创意洞察、核心文案、传播动作、结果数据等文本占位。</p>
            <p>后续可替换为截图、海报、社媒内容、脚本片段或个人内容素材。</p>
          </div>
        </div>
        <ContactLine className="detail-contact" />
      </article>
    </main>
  )
}

function ContactFooter() {
  return (
    <section className="contact-finale section-full" id="contact">
      <div className="page-width finale-inner">
        <p>END / CONTACT</p>
        <h2>LET'S MAKE THE NEXT THING LESS BORING.</h2>
        <div className="finale-grid">
          <span>EMAIL {email}</span>
          <span>PHONE {phone}</span>
          <span>SHANGHAI / BRAND CREATIVE PLANNER</span>
        </div>
      </div>
    </section>
  )
}

function App() {
  const pathname = usePathname()
  const route = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts[0] === 'on-duty' && parts[1]) return { page: 'detail', type: 'work', id: parts[1] }
    if (parts[0] === 'off-duty' && parts[1]) return { page: 'detail', type: 'personal', id: parts[1] }
    if (parts[0] === 'on-duty') return { page: 'listing', type: 'work' }
    if (parts[0] === 'off-duty') return { page: 'listing', type: 'personal' }
    if (parts[0] === 'contact') return { page: 'contact' }
    return { page: 'home' }
  }, [pathname])

  if (route.page === 'listing') return <ListingPage type={route.type} />
  if (route.page === 'detail') return <DetailPage type={route.type} id={route.id} />
  if (route.page === 'contact') return <ContactFooter />
  return <HomePage />
}

createRoot(document.getElementById('root')).render(<App />)
