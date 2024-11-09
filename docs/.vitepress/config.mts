import { defineConfig } from 'vitepress'
import { sidebar } from './configs/sidebar'
import { getSidebar } from './utils/getSiderbar';

const sidebarOptions = {
  documentRootPath: './docs/src', // 你的文档根目录
  // 其他选项...
};

export default defineConfig({
  title: "Lay",
  titleTemplate: "Lay's Blog",
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  description: "Lay's blog for daily life",
  lastUpdated: true, //最近更新时间
  cleanUrls: true, //VitePress 将从 URL 中删除尾随.html
  //文件的入口根目录
  srcDir: "./src",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: "/logo.jpg",
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AboutMe', link: '/AboutMe.md' },
      { text: '💭Blogs', link: '/Notes/index' },
    ],
    //@ts-ignore
    sidebar: {
      "/Notes/": getSidebar("/docs/src", "/Notes/"),
    },
    //顶部导航栏的社交平台跳转
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NJUPTlay' }
    ],
    darkModeSwitchLabel: '模式',
    // 文章内导航栏标题
    outlineTitle: "导航栏",
    docFooter: {
      //文档页脚
      prev: '上一篇',
      next: '下一篇'
    },
    // 是否启动搜索功能
    search: {
      provider: "local",
    },
    //底部的版权说明
    footer: {
      copyright: "Copyright © 2024-present Lay",
    },
  },
})
