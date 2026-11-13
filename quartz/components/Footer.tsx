import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { joinSegments } from "../util/path"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    // Quartz's SPA router rebases src but not srcset.
    const baseDir = new URL(`https://${cfg.baseUrl ?? "example.com"}`).pathname
    const brandDir = joinSegments(baseDir, "static/brand")

    return (
      <footer class={displayClass}>
        <div class="brand-footer">
          <picture>
            <source
              media="(max-width: 800px)"
              srcSet={joinSegments(brandDir, "footer-mobile.webp")}
              width="1020"
              height="724"
            />
            <img
              src={joinSegments(brandDir, "footer-desktop.webp")}
              alt=""
              width="2172"
              height="724"
              loading="lazy"
              decoding="async"
            />
          </picture>
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
