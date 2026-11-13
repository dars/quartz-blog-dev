import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const baseDir =
      fileData.slug === "404"
        ? new URL(`https://${cfg.baseUrl ?? "example.com"}`).pathname
        : pathToRoot(fileData.slug!)
    const brandDir = joinSegments(baseDir, "static/brand")

    return (
      <footer class={classNames(displayClass, "site-footer")}>
        <div class="brand-footer">
          <div class="footer-scene" aria-hidden="true">
            {(["light", "dark"] as const).map((theme) => (
              <img
                key={theme}
                class={`footer-characters footer-characters-${theme}`}
                src={joinSegments(brandDir, `footer-characters-${theme}.webp`)}
                alt=""
                width="1050"
                height="556"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div class="footer-meta">
            <p>
              {i18n(cfg.locale).components.footer.createdWith}{" "}
              <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
            </p>
            <ul>
              {Object.entries(links).map(([text, link]) => (
                <li key={text}>
                  <a href={link}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
