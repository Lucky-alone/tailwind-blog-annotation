interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '智能数据分析平台',
    description: `基于React与Python构建的企业级数据分析平台，支持实时数据可视化、自动化报表生成、
    多维度数据钻取等功能，帮助团队快速洞察业务数据背后的规律。`,
    imgSrc: '/static/images/google.png',
    href: '/blog',
  },
  {
    title: '开源微服务框架',
    description: `一套轻量级的微服务开发框架，提供服务注册与发现、配置中心、链路追踪、
    熔断限流等核心能力，帮助开发者快速构建高可用的分布式系统。`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog',
  },
]

export default projectsData
