import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer' /* 引入文章排序和内容提取工具-谢根祥标注 */
import { allBlogs } from 'contentlayer/generated' /* 引入Contentlayer生成的所有博客数据-谢根祥标注 */
import Main from './Main' /* 引入首页主体组件-谢根祥标注 */

/* 首页入口页面组件，异步获取文章数据并渲染-谢根祥标注 */
export default async function Page() {
  const sortedPosts = sortPosts(allBlogs) /* 对所有博客文章按日期排序-谢根祥标注 */
  const posts = allCoreContent(sortedPosts) /* 提取文章核心内容，去除MDX原始数据-谢根祥标注 */
  return <Main posts={posts} /> /* 将文章数据传递给Main组件渲染-谢根祥标注 */
}
