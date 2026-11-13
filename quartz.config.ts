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
          light: "#f7f2e9",
          lightgray: "#dcd0c1",
          gray: "#685d53",
          darkgray: "#403b38",
          dark: "#292a32",
          secondary: "#805025",
          tertiary: "#315d68",
          highlight: "rgba(128, 80, 37, 0.10)",
          textHighlight: "#ecc59080",
        },
        darkMode: {
          light: "#1b202a",
          lightgray: "#41434b",
          gray: "#bcb1a6",
          darkgray: "#e1d8ce",
          dark: "#f5e7d4",
          secondary: "#e6b781",
          tertiary: "#a1c4ca",
          highlight: "rgba(230, 183, 129, 0.13)",
          textHighlight: "#ad78404d",
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
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
