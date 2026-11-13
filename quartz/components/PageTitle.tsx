import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={joinSegments(baseDir, "static/brand/logo.svg")} alt="" width={52} height={52} />
        {title}
      </a>
      <span class="page-title-slogan" lang="en">
        <span>code for love,</span> <span>code for life</span>
      </span>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.6rem;
  margin: 0;
  font-family: var(--titleFont);
  line-height: 1.15;
}

.page-title a {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--dark);
}

.page-title a:hover {
  color: var(--secondary);
}

.page-title a:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 4px;
  border-radius: 4px;
}

.page-title img {
  display: block;
  flex: none;
  margin: 0;
}

.page-title-slogan {
  display: block;
  margin: 0.25rem 0 0;
  color: var(--secondary);
  font: 400 0.79rem/1.4 var(--codeFont);
}

.page-title-slogan > span {
  white-space: nowrap;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
