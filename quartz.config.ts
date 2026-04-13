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
        header: "Noto Sans TC",
        body: "Noto Sans TC",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f8f7f4",
          lightgray: "#e8e5e0",
          gray: "#a8a39c",
          darkgray: "#5a5550",
          dark: "#2c2825",
          secondary: "#5b7fa6",
          tertiary: "#8aab9e",
          highlight: "rgba(91, 127, 166, 0.1)",
          textHighlight: "#f0e68880",
        },
        darkMode: {
          light: "#1a1917",
          lightgray: "#2e2c2a",
          gray: "#6e6b67",
          darkgray: "#ccc8c2",
          dark: "#e8e4de",
          secondary: "#7da0c4",
          tertiary: "#8aab9e",
          highlight: "rgba(125, 160, 196, 0.12)",
          textHighlight: "#b3a50280",
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
