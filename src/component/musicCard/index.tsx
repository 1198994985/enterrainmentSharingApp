import React,{useState} from 'react'
import "./index.less"
interface Props {
  imgUrlList?: string[],
  imgUrl?: string;
}
const urlList = [
  "http://p1.music.126.net/hlSXl97gpV3nldkUQPFVKw==/109951164574821206.jpg?param=140y140",
  "http://p1.music.126.net/hlSXl97gpV3nldkUQPFVKw==/109951164574821206.jpg?param=140y140",
  "https://qpic.y.qq.com/music_cover/56aO2N0zBFcgx8Wfh6ic6iaQKOJ6JuVM3tr3ebjp6D8ehTIrX9t6DQDg/300?n=1",
  "https://qpic.y.qq.com/music_cover/PiajxSqBRaELicf3GsOsslkQS0NO47ibXziaNsZemEia5SicBG7eh6sm4v5g/600?n=1",
  "https://qpic.y.qq.com/music_cover/T0qpeJj1MpLkoxkZMuVVx52m7ObJa7Jf8c4IYXRggMgU2mon8ical1A/300?n=1"
];
const MusicCard: React.FC<Props> = ({ imgUrl }) => {
  const [isPlayIconOpacity, setPlayIconOpacity] = useState(true);
  const handleMouseOver = () => {
    setPlayIconOpacity(false);
  };
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
        <img src={imgUrl} className="playList-img" alt="" />
        <span
          className={
            isPlayIconOpacity
              ? "iconfont  play-icon"
              : "iconfont play-icon play-icon-over"
          }
        >
          &#xe630;
        </span>
      </div>
      <span className="music-item-title">
        <div className="music-item-name">fengbozuishuai</div>
      </span>
  
    </div>
  );
};
export const PlayList: React.FC<Props> = ({ imgUrlList = urlList }) => {
         return (
           <div className="playList">
             {urlList.map((imgUrl,index) => {
               return <MusicCard imgUrl={imgUrl} key={index}/>;
             })}
            </div>
         );
       };
export default MusicCard;
