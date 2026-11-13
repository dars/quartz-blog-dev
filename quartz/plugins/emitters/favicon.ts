import sharp from "sharp"
import { joinSegments, QUARTZ, FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"

export const Favicon: QuartzEmitterPlugin = () => ({
  name: "Favicon",
  async *emit({ argv }) {
    const iconPath = joinSegments(QUARTZ, "static", "brand", "favicon.png")

    const size = 32
    const icon = await sharp(iconPath).resize(size, size).ensureAlpha().png().toBuffer()

    // ICO directory header followed by one PNG-encoded image entry.
    const directory = Buffer.alloc(22)
    directory.writeUInt16LE(1, 2) // Icon type
    directory.writeUInt16LE(1, 4) // Number of images
    directory[6] = size
    directory[7] = size
    directory.writeUInt16LE(1, 10) // Color planes
    directory.writeUInt16LE(32, 12) // Bits per pixel
    directory.writeUInt32LE(icon.length, 14)
    directory.writeUInt32LE(directory.length, 18)

    yield write({
      ctx: { argv } as BuildCtx,
      slug: "favicon" as FullSlug,
      ext: ".ico",
      content: Buffer.concat([directory, icon]),
    })
  },
  async *partialEmit() {},
})
