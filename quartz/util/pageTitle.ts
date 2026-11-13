import type { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import type { QuartzPluginData } from "../plugins/vfile"

export function getPageTitle(cfg: GlobalConfiguration, fileData: QuartzPluginData): string {
  if (fileData.slug === "index") return cfg.pageTitle

  const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
  return title + (cfg.pageTitleSuffix ?? "")
}
