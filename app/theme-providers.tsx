'use client' /* 客户端组件标记，主题切换需要客户端交互-谢根祥标注 */

import { ThemeProvider } from 'next-themes' /* 引入next-themes主题Provider-谢根祥标注 */
import siteMetadata from '@/data/siteMetadata' /* 引入站点元数据配置-谢根祥标注 */

/* 主题Provider包装组件，支持亮/暗/系统主题切换-谢根祥标注 */
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  // attribute="class"通过CSS类名切换主题，enableSystem支持跟随系统主题-谢根祥标注
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
