import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ProfileImage: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "profile-image-container")}>
      <img src="/static/avatar.jpg" alt="Profile" class="profile-image" />
    </div>
  )
}

ProfileImage.css = `
.profile-image-container {
  display: flex;
  justify-content: center;
  padding: 0.25rem 0 0.75rem;
}

.profile-image {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--lightgray);
  transition: border-color 0.2s, transform 0.2s;
}

.profile-image:hover {
  border-color: var(--secondary);
  transform: scale(1.05);
}
`

export default (() => ProfileImage) satisfies QuartzComponentConstructor
