import { IconSize16 } from "./IconSize"


function PencilIcon() {
  return (
    <IconSize16>
      <img src={`${process.env.PUBLIC_URL}/images/feed/write_24.png`} alt="피드 작성하기" />
    </IconSize16>
  )
}

export default PencilIcon