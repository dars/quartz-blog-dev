import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import style from "./styles/pageTitle.scss"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={joinSegments(baseDir, "/")} class="brand-home">
        <img src={joinSegments(baseDir, "static/brand/logo.png")} alt="" width="333" height="340" />
        <span>
          <span class="brand-name">
            {title === "code4soul" ? (
              <>
                code<span class="brand-accent">4</span>soul
              </>
            ) : (
              title
            )}
          </span>
          <span class="brand-tagline">code for love, code for life</span>
        </span>
      </a>
    </h2>
  )
}

PageTitle.css = style

export default (() => PageTitle) satisfies QuartzComponentConstructor
