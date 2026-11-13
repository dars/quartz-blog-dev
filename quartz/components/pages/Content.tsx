import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { FullSlug, getAllSegmentPrefixes, resolveRelative, slugTag } from "../../util/path"

function HomeTopics({ fileData, allFiles }: Pick<QuartzComponentProps, "fileData" | "allFiles">) {
  const topics = fileData.frontmatter?.topics
  if (!topics?.length) return null

  const availableTags = new Set(
    allFiles
      .filter((file) => file.slug !== "index" && !file.slug?.startsWith("tags/"))
      .flatMap((file) => file.frontmatter?.tags ?? [])
      .flatMap(getAllSegmentPrefixes),
  )
  const publishedTopics = topics
    .map((label) => ({ label, tag: slugTag(label.trim().toLowerCase()) }))
    .filter(({ tag }) => availableTags.has(tag))
  if (publishedTopics.length === 0) return null

  return (
    <nav class="home-topics" aria-labelledby="home-topics-title">
      <h2 id="home-topics-title">Topics</h2>
      <ul>
        {publishedTopics.map(({ label, tag }) => (
          <li key={tag}>
            <a href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const Content: QuartzComponent = ({ fileData, tree, allFiles }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  return (
    <article class={classString}>
      {content}
      {fileData.slug === "index" && <HomeTopics fileData={fileData} allFiles={allFiles} />}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
