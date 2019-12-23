import React from 'react'
import "./index.less"
interface Props {
  
}

const MusicCard: React.FC<Props> = () => {
  return (
    <div className="playList-item">
      <div className="img-wrapper"></div>
      <img
        src="http://p1.music.126.net/OFAOnivvC4EYgM4WXehwNA==/109951164574182616.jpg?imageView&quality=89"
        className="playList-img"
        // onMouseOver={}
      />
    </div>
  );
};
export const PlayList: React.FC<Props> = () => {
  return (
    <div className="playList">
      <MusicCard />
      <MusicCard />
      <MusicCard />
      <MusicCard />
      <MusicCard />
    </div>
  );
};
export default MusicCard;
