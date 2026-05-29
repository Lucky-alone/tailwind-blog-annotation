import projectsData from '@/data/projectsData' /* 引入项目数据-谢根祥标注 */
import Card from '@/components/Card' /* 引入卡片展示组件-谢根祥标注 */
import { genPageMetadata } from 'app/seo' /* 引入SEO元数据生成函数-谢根祥标注 */

export const metadata = genPageMetadata({ title: 'Projects' }) /* 生成项目页SEO元数据-谢根祥标注 */

/* 项目展示页面组件，以卡片形式展示项目列表-谢根祥标注 */
export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700"> {/* 内容分割容器-谢根祥标注 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5"> {/* 页面标题区域-谢根祥标注 */}
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects {/* 页面标题-谢根祥标注 */}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12"> {/* 项目卡片网格容器-谢根祥标注 */}
          <div className="-m-4 flex flex-wrap"> {/* 弹性布局，负边距抵消卡片外边距-谢根祥标注 */}
            {projectsData.map((d) => ( /* 遍历项目数据渲染卡片-谢根祥标注 */
              <Card
                key={d.title} /* 项目标题作为唯一键-谢根祥标注 */
                title={d.title} /* 项目标题-谢根祥标注 */
                description={d.description} /* 项目描述-谢根祥标注 */
                imgSrc={d.imgSrc} /* 项目封面图-谢根祥标注 */
                href={d.href} /* 项目链接地址-谢根祥标注 */
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
