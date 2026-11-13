import sharp from "sharp"
import { joinSegments, QUARTZ, FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const Favicon: QuartzEmitterPlugin = () => ({
  name: "Favicon",
  async *emit(ctx) {
    const iconPath = joinSegments(QUARTZ, "static", "icon.png")
    const size = 48
    const png = await sharp(iconPath).resize(size, size).png().toBuffer()

    // An ICO can store a PNG payload after its header and directory entry.
    const directory = Buffer.alloc(22)
    directory.writeUInt16LE(1, 2) // Icon file type
    directory.writeUInt16LE(1, 4) // One image
    directory[6] = size
    directory[7] = size
    directory.writeUInt16LE(1, 10) // Color planes
    directory.writeUInt16LE(32, 12) // Bits per pixel
    directory.writeUInt32LE(png.length, 14)
    directory.writeUInt32LE(directory.length, 18)

    yield write({
      ctx,
      slug: "favicon" as FullSlug,
      ext: ".ico",
      content: Buffer.concat([directory, png]),
    })
  },
  async *partialEmit() {},
})
