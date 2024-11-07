// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// @ts-ignore
import { themes as prismThemes } from "prism-react-renderer";
import tailwindPlugin from "./plugins/tailwind-config.cjs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Rival Politics Docs",
  tagline: "Добро пожаловать в будущее!",
  favicon: "img/favicon.ico",
  url: "https://rival-politics-faq.vercel.app/",
  baseUrl: "/",
  organizationName: "Rival Politics",
  projectName: "rival-politics-docs",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  customFields: {
    clientID: process.env.GITALK_CLIENT_ID,
    clientSecret: process.env.GITALK_CLIENT_SECRET,
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru"],
  },
  plugins: [tailwindPlugin],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          sortPosts: "descending",
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          blogTitle: "Последние новости",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  themes: [
    [
      // @ts-ignore
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      // @ts-ignore
      ({
        hashed: true,
        language: ["ru", "en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        useAllContextsWithNoSearchContext: true,
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: "/docs",
        blogRouteBasePath: "/blog",
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo.svg",
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      blog: {
        sidebar: {
          groupByYear: false,
        },
      },
      navbar: {
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          //{
          //  type: "localeDropdown",
          //  position: "left",
          //},
          {
            type: "html",
            position: "right",
            value:
              '<a class="navbar__item navbar__link" href="/blog">Блог <i class="fa-nav fa-solid fa-pen-nib"></i></a>',
          },
          {
            type: "html",
            position: "right",
            value:
              '<a class="navbar__item navbar__link" href="/docs/design">Дизайн-документ <i class="fa-nav fa-solid fa-compass-drafting"></i></a>',
          },
          {
            type: "html",
            position: "right",
            value:
              '<a class="navbar__item navbar__link" href="/docs/roadmap">Роадмап проекта <i class="fa-nav fa-solid fa-map-location"></i></a> <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 disable-mobile">new</span>',
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Ссылки",
            items: [
              {
                label: "VK",
                href: "https://vk.com/rivalpolitics",
              },
            ],
          },
        ],
        copyright: `<div class="copyright-footer">Copyright © ${new Date().getFullYear()} Rival Politics</div>`,
      },
      /*footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },*/
    }),
};

export default config;
