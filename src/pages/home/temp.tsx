import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Slider from "../../component/slider/index";
// import rayTracing, { run } from "./rayTracing";
import { rqRmdSongList, rqTopList, rqSliderImg } from "../../ajax/";
import {
  HomeHeader,
  Nav,
  PlayListHead,
  RankList,
  VedioAera,
  TempAera,
  TempRankList
} from "./component";
import { PlayList } from "../../component/";
import "./temp.less";
import { useSelector } from "react-redux";
import { Card } from "antd";

const { Meta } = Card;
interface IrmdList {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}
interface IrankList {
  id: number;
  name: string;
  picUrl: string;
  mvId: number;
  author: string;
}
interface IbannerListItem {
  id: number;
  picUrl: string;
  url: string;
}

const Temp: React.FC = () => {
  const [rmdList, setRmdList] = useState<IrmdList[][]>();
  const [rankList, setRankList] = useState<IrankList[][]>();
  const [bannerList, setBannerList] = useState<IbannerListItem[]>();
  const history = useHistory();
  //@ts-ignore
  const idd = useSelector(state => state.privateChatsState);
  console.log("idd", idd);
  useEffect(() => {
    (async () => {
      // TODO: PROMISE ALL
      const rmdlist = await rqRmdSongList();
      const rmd = [rmdlist?.slice(0, 5), rmdlist?.slice(5, 10)];
      setRmdList(rmd);
      const rankList = await rqTopList(1);
      const rankList2 = await rqTopList(2);
      const rankList3 = await rqTopList(4);
      setRankList([rankList, rankList2, rankList3]);
      const bannerlist = await rqSliderImg();
      setBannerList(bannerlist);
    })();
    return () => {};
   }, []);

  const handleBannerClick = useCallback(
    (item: IbannerListItem) => {
      const baseUrl = "https://music.163.com/#/";
      if (item.url.indexOf("mv") !== -1) history.push(`/mv/${item.id}`);
      else if (item.url.indexOf("song") !== -1)
        history.push(`/song/${item.id}`);
      else if (item.url.indexOf("dj") !== -1)
        window.open(baseUrl + `dj?id=${item.id}`);
      else if (item.url.indexOf("album") !== -1)
        window.open(baseUrl + `album?id=${item.id}`);
    },
    [history]
  );
  return (
    <>
      <HomeHeader></HomeHeader>
      <div className="home-banner">
        <Slider speed={700}>
          {bannerList &&
            bannerList.map((item, index) => {
              console.log("bannerList", bannerList);
              if (index == 0 || index == bannerList.length - 1) {
                return (
                  <img
                    className="banner-img"
                    src={item.picUrl + "?param=1600x622"}
                    draggable="false"
                    alt=""
                    onClick={() => handleBannerClick(item)}
                    key={index + item.id}
                  />
                );
              } else {
                return (
                  <img
                    className="banner-img"
                    src={item.picUrl + "?param=1600x622"}
                    draggable="false"
                    alt=""
                    onClick={() => handleBannerClick(item)}
                    key={item.id}
                  />
                );
              }
            })}
        </Slider>
      </div>
      <div className="home-container">
        <Nav />
        <PlayListHead />
        <Slider speed={700}>
          <PlayList imgUrlList={rmdList && rmdList[0]} />
          <PlayList imgUrlList={rmdList && rmdList[1]} />
        </Slider>
        <VedioAera />

        <div className="rank-and-list">
          <TempAera />
          <TempRankList
            rankList={rankList && rankList[2]}
            title="云音乐飙升榜"
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(React.memo(Temp));
