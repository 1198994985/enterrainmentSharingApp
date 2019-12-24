import React,{useState} from 'react'
import "./index.less"
interface Props {
  imgUrlList?:string[]
}

const MusicCard: React.FC<Props> = ({ imgUrlList }) => {
  const [isPlayIconOpacity,setPlayIconOpacity] = useState(true);
  const handleMouseOver = () => {
    setPlayIconOpacity(false);
  }
   const handleMouseOut = () => {
     setPlayIconOpacity(true);
   };
  return (
    <div className="playList-item">
      <div
        className="img-wrapper"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img
          src="http://p1.music.126.net/OFAOnivvC4EYgM4WXehwNA==/109951164574182616.jpg?imageView&quality=89"
          className="playList-img"
          alt=""
        />
        <span
          className={
            isPlayIconOpacity
              ? "iconfont  play-icon"
              : "iconfont play-icon play-icon-over"
          }
        >
          &#xe630;
        </span>

        <div className = "music-name">fengbozuishuai</div>
      </div>

      {/* {imgUrlList &&
        imgUrlList.map(imgUrl => {
          return <img src={imgUrl} className="playList-img"/>;
        })} */}
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
