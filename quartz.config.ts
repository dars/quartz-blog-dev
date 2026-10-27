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
    pageTitleSuffix: "Building AI Native Workflow | code4soul",
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
          light: "#f6f2ea",
          lightgray: "#e3dccf",
          gray: "#9a9184",
          darkgray: "#4a4540",
          dark: "#1f1c19",
          secondary: "#9a6b2f",
          tertiary: "#5f7f78",
          highlight: "rgba(154, 107, 47, 0.10)",
          textHighlight: "#e8c57a66",
        },
        darkMode: {
          light: "#16181b",
          lightgray: "#2a2d31",
          gray: "#7d7a74",
          darkgray: "#cfc8bc",
          dark: "#ede6d9",
          secondary: "#c9a26b",
          tertiary: "#7fa39b",
          highlight: "rgba(201, 162, 107, 0.12)",
          textHighlight: "#c9a26b55",
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
