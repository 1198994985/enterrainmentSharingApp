import React, { useEffect, useState } from "react";
import { PlayListHead, PlayListTitle, PlayListTab } from "../index";
import { MusicCard } from "../../../../component/";
import { rqMvList, rqMvUrl } from "../../../../ajax/";
import { withRouter } from "react-router-dom";
import "./index.less";

interface Props {
  vedioUrl?: string;
  vedioList?: IvedioUrl[];
}
const defaultUrl = `http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=1b3d1e4d9caee09b0e0199088ccb8d26&wsTime=1577284797`;
const VedioList: React.FC<Props> = React.memo(props => {
  const { vedioUrl = defaultUrl, vedioList } = props;
  return (
    <>
      <div className="vediolist-wrapper">
        <video src={vedioUrl} controls={true} className="vedio"></video>
        <div className="vedio-list">
          <div className="vedio-list-up">
            {vedioList &&
              vedioList.map((item, index) => {
                if (index < 3) {
                  return (
                    <MusicCard
                      imgUrl={item.picUrl + "?param=180x150"}
                      key={item.id}
                      path={"/mv/" + item.id}
                      name={item.author}
                      desc={item.name}
                    />
                  );
                }
                return null;
              })}
          </div>
          <div className="vedio-list-down">
            {vedioList &&
              vedioList.map((item, index) => {
                if (index > 2) {
                  return (
                    <MusicCard
                      imgUrl={item.picUrl}
                      key={item.id}
                      path={"/mv/" + item.id}
                      name={item.author}
                      desc={item.name}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </>
  );
});

interface IvedioUrl {
  id: number;
  name: string;
  author: string;
  authorId: number;
  picUrl: string;
  playCount: number;
}
const talName = ["mv", "内地", "港台", "欧美"];
const VedioAera: React.FC<Props> = React.memo(() => {
  const [vedioList, setvedioList] = useState<IvedioUrl[][]>();
  const [VedioUrlIndex, setVedioUrlIndex] = useState<number>(0);
  const [mvUrl,setMvUrl] = useState()
  useEffect(() => {
    (async () => {
      const data = await rqMvList(24);
      setvedioList([
        data.slice(0, 6),
        data.slice(6, 12),
        data.slice(12, 18),
        data.slice(18, 24)
      ]);
      const mvUrl = await rqMvUrl(10904989);
      
        setMvUrl(mvUrl?.mvUrl["720"])

      //10901117
    })();
  }, []);

  return (
    <div className="home-mv-wrapper">
      <PlayListHead>
        {talName.map((item, index) => {
          if (index < ((vedioList && vedioList.length) || 3)) {
            return (
              <PlayListTab
                name={item}
                onMouseOver={() => {
                  setVedioUrlIndex(index);
                }}
                key={index}
              />
            );
          }
          return null;
        })}
      </PlayListHead>
      <VedioList
        vedioList={vedioList && vedioList[VedioUrlIndex]}
        vedioUrl={mvUrl}
      />
    </div>
  );
});

// @ts-ignore
export default withRouter(VedioAera);
