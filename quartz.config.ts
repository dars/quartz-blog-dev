import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "code4soul",
    pageTitleSuffix: " | code4soul",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
      host: "code4soul.dev",
    },
    locale: "zh-TW",
    baseUrl: "code4soul.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif TC",
        body: "Noto Sans TC",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f3ea",
          lightgray: "#e4dbcd",
          gray: "#636876",
          darkgray: "#334153",
          dark: "#111d2e",
          secondary: "#97461f",
          tertiary: "#36516a",
          highlight: "rgba(151, 70, 31, 0.10)",
          textHighlight: "#f3a76966",
        },
        darkMode: {
          light: "#111d2e",
          lightgray: "#293a50",
          gray: "#a3adbc",
          darkgray: "#d5dce5",
          dark: "#f8f3ea",
          secondary: "#f3a769",
          tertiary: "#a8c4df",
          highlight: "rgba(243, 167, 105, 0.12)",
          textHighlight: "#f3a76955",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages({ colorScheme: "darkMode" }),
    ],
  },
}

export default config
