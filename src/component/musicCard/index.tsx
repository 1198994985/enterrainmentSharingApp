import React, { useState } from "react";
import { Link, NavLink, LinkProps } from "react-router-dom";
import "./index.less";
interface Props {
  imgUrlList?: urlList[];
  imgUrl?: string;
  path?: string;
  onClick?: (e: React.MouseEvent) => any;
}

interface urlList {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}

const MusicCard: React.FC<Props> = ({ imgUrl, path, onClick }) => {
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
        onClick={onClick}
      >
        <Link to={path as string}>
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
        </Link>
      </div>
      <span className="music-item-title">
        <div className="music-item-name">fengbozuishuai</div>
        <div className="music-item-desc">fengbozuishuai</div>
      </span>
    </div>
  );
};

export const PlayList: React.FC<Props> = ({ imgUrlList }) => {
  return (
    <div className="playList">
      {imgUrlList &&
        imgUrlList.map((item, index) => {
          return <MusicCard imgUrl={item.picUrl} key={item.id} path={"/song/" +item.id} />;
        })}
    </div>
  );
};
export default MusicCard;
