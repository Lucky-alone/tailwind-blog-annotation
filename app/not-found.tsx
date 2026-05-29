import Link from '@/components/Link' /* 引入自定义Link组件-谢根祥标注 */

/* 404未找到页面组件-谢根祥标注 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6"> {/* 响应式布局容器，移动端纵向、桌面端横向-谢根祥标注 */}
      <div className="space-x-2 pt-6 pb-8 md:space-y-5"> {/* 404数字区域-谢根祥标注 */}
        <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
          404 {/* 显示404错误码-谢根祥标注 */}
        </h1>
      </div>
      <div className="max-w-md"> {/* 提示信息和操作区域-谢根祥标注 */}
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl"> {/* 主提示信息-谢根祥标注 */}
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p> {/* 副提示信息-谢根祥标注 */}
        <Link
          href="/" /* 返回首页链接-谢根祥标注 */
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:outline-hidden dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
