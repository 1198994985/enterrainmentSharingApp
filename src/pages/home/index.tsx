import React, { useState, useEffect, useMemo, useCallback } from "react";
import Slider from "../../component/slider/index";
// import rayTracing, { run } from "./rayTracing";
import { rqRmdSongList, rqTopList } from "../../ajax/";
import {
  HomeHeader,
  Nav,
  PlayListHead,
  RankList,
  VedioAera
} from "./component";
import {  PlayList } from "../../component/";
import "./index.less";
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
const Home: React.FC = () => {
  const [rmdList, setRmdList] = useState<IrmdList[]>();
  const [rankList, setRankList] = useState<IrankList[]>();

  useEffect(() => {
    (async () => {
      const data = await rqRmdSongList();
      console.log("data ", data);
      let list = [];
      if (data && data.code === 200) {
        let obj = data["result"];
        for (let i in data["result"]) {
          console.log(typeof obj[i]["id"]);
          console.log(typeof obj[i]["playCount"]);
          list.push({
            id: obj[i]["id"],
            name: obj[i]["name"],
            picUrl: obj[i]["picUrl"],
            playCount: obj[i]["playCount"]
          });
        }
        setRmdList(list);
      }

      const rankList = await rqTopList(1);
      const rankList2 = await rqTopList(2);
      const rankList3 = await rqTopList(4);
   
      setRankList([...rankList,...rankList2,...rankList3]);
    })();
    return () => {};
  }, []);
  return (
    <>
      <HomeHeader></HomeHeader>
      <div
        style={{
          height: "430px",
          textAlign: "center"
        }}
      >
        <Slider>
          <div>
            <img
              style={{
                display: "inline-block",
                objectFit: "cover",
                height: "100%",
                width: "100%",
                margin: "0 auto",
                boxShadow: "0 0 70px 2px black inset"
              }}
              src="http://p1.music.126.net/OFAOnivvC4EYgM4WXehwNA==/109951164574182616.jpg?imageView&quality=89"
              draggable="false"
              alt=""
            />
          </div>
          <div
            className="slider-image-wrapper"
            style={{
              backgroundImage:
                "url(http://liangcang-material.alicdn.com/prod/upload/8b02bd156a4041f88384013167ff0833.jpg?x-oss-process=image/resize,w_1664/interlace,1/quality,Q_80/sharpen,100)"
            }}
          >
            <div className="slider-image"></div>
          </div>
          <div
            className="slider-image-wrapper"
            style={{
              backgroundImage:
                "url(http://p1.music.126.net/OFAOnivvC4EYgM4WXehwNA==/109951164574182616.jpg?imageView&quality=89)"
            }}
          >
            <div className="slider-image"></div>
          </div>
        </Slider>
      </div>
      <Nav />
      <PlayListHead />
      <Slider speed={700}>
        <PlayList imgUrlList={rmdList && rmdList?.slice(0, 5)} />
        <PlayList imgUrlList={rmdList && rmdList?.slice(5, 10)} />
      </Slider>
      <VedioAera />
      {/* <Slider speed={700}>
        <PlayList />
      </Slider> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          margin: "0 30px"
        }}
      >
        <RankList rankList={rankList?.slice(0, 10)} title="云音乐新歌榜" />
        <RankList rankList={rankList?.slice(10, 20)} title="网易原创歌曲榜" />
        <RankList rankList={rankList?.slice(20, 30)} title="云音乐飙升榜" />
        {/* <RankList />
        <RankList /> */}
      </div>
    </>
  );
};

export default Home;
