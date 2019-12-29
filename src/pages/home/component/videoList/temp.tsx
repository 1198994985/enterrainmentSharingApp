import React, { useEffect, useState } from "react";
import { PlayListHead, PlayListTitle, PlayListTab } from "../index";
import { MusicCard } from "../../../../component/";
import { rqMvList } from "../../../../ajax/";
import { withRouter } from "react-router-dom";
import "./temp.less";
import RankList from './tempRank'
interface Props {
  vedioUrl?: string;
  vedioList?: IvedioUrl[];
}
const defaultUrl = `http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=1b3d1e4d9caee09b0e0199088ccb8d26&wsTime=1577284797`;
const VedioList: React.FC<Props> = React.memo(props => {
  const { vedioUrl = defaultUrl, vedioList } = props;
  return (
    <>
      <div className="vediolist-wrapper-temp">
        <div className="vedio-list">
          <div className="vedio-list-up">
            {vedioList &&
              vedioList.map((item, index) => {
                if (index < 5) {
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
                if (index > 4) {
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

const    TempAera: React.FC<Props> = React.memo(() => {
  const [VedioUrl, setVedioUrl] = useState<IvedioUrl[][]>();

  useEffect(() => {
    (async () => {
      const data = await rqMvList(18);
      setVedioUrl([data.slice(0, 10)]);
    })();
  }, []);

  return (
    <div>
      <VedioList vedioList={VedioUrl && VedioUrl[0]} />
    </div>
  );
});

// @ts-ignore
export default withRouter(TempAera);
