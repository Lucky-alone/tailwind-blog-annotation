'use client'

/**
 * 作者布局组件
 * 展示作者信息和社交链接
 * 使用 i18n 翻译支持中英文切换
 */
import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { useTranslation } from '@/components/locale-provider'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, email, twitter, bluesky, linkedin, github } = content
  const { t } = useTranslation()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {t('about.title')}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            {/* 职位和公司名称使用 i18n，支持中英文切换 */}
            <div className="text-gray-500 dark:text-gray-400">{t('about.occupation')}</div>
            <div className="text-gray-500 dark:text-gray-400">{t('about.company')}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          {/* 作者简介使用 i18n，支持中英文切换 */}
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>
            <p>{t('about.bio3')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
