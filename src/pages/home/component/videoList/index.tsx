import React, { useEffect, useState } from "react";
import { PlayListHead, PlayListTitle, PlayListTab } from "../index";
import { MusicCard } from "../../../../component/";
import { rqMvList } from "../../../../ajax/";
import { withRouter } from "react-router-dom";
import "./index.less";


interface Props {
  vedioUrl?: string;
  vedioList?: IvedioUrl[];
}
const defaultUrl = `http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=1b3d1e4d9caee09b0e0199088ccb8d26&wsTime=1577284797`;
const VedioList: React.FC<Props> = React.memo(props => {
  const handleCilck = () => {
    //@ts-ignore
    props.history.push("/song/1");
  };
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
                      imgUrl={item.picUrl}
                      key={item.id}
                      path={"/song/" + item.id}
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
                      path={"/song/" + item.id}
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
//  id: rank[i]["id"],
//       name: rank[i]["name"],
//       author: rank[i]["artistName"],
//       authorId: rank[i]["artistId"],
//       picUrl: rank[i]["al"]["cover"],
//       playCount: rank[i]["playCount"]
interface IvedioUrl {
  id: number;
  name: string;
  author: string;
  authorId: number;
  picUrl: string;
  playCount: number;
}
const talName = ["今日推荐", "xxx","xxxx","xxxx"];
const VedioAera: React.FC<Props> = React.memo(() => {
  const [VedioUrl, setVedioUrl] = useState<IvedioUrl[][]>();
  const [VedioUrlIndex, setVedioUrlIndex] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const data = await rqMvList(18);
      setVedioUrl([data.slice(0, 6), data.slice(6, 12), data.slice(12, 18)]);
      // console.log("VedioUrl", VedioUrl && VedioUrl.length);
    })();
  }, [VedioUrl]);
 
  return (
    <div>
      <PlayListHead>
        {talName.map((item, index) => {
          if (index < (VedioUrl && VedioUrl.length || 3)) {
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
      <VedioList vedioList={VedioUrl  && VedioUrl[VedioUrlIndex]} />
    </div>
  );
});

// @ts-ignore
export default withRouter(VedioAera);
