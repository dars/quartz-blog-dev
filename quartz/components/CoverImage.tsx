import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CoverImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const cover = fileData.frontmatter?.cover as string | undefined
  if (!cover) return null

  return (
    <div class={classNames(displayClass, "cover-image-container")}>
      <img src={cover} alt="Cover" class="cover-image" />
    </div>
  )
}

CoverImage.css = `
.cover-image-container {
  width: 100%;
  max-height: 420px;
  overflow: hidden;
  border-radius: 12px;
  margin: 1.5rem 0 0;
}

.cover-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  margin: 0;
  border-radius: 12px;
  display: block;
}
`

export default (() => CoverImage) satisfies QuartzComponentConstructor
