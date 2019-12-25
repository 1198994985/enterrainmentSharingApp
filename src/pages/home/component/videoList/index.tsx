import React from 'react'
import { PlayListHead } from '../index'
import './index.less'
interface Props {
  vedioUrl?: string;
}

const VedioList: React.FC<Props> = React.memo(() => {
  return (
    <div>
      <PlayListHead />
      <video
        src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=6e988734ab205fbeff97142b82990c4a&wsTime=1577260628"
        controls={true}
        className="vedio"
      >
      </video>
    </div>
  );
})

export default VedioList;
