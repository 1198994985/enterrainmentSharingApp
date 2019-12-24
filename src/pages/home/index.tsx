/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Slider from "../../component/slider/index";
import rayTracing, { run } from "./rayTracing";
import { HomeHeader, Nav } from "./component";
import { MusicCard, PlayList } from "../../component/";
import "./index.less";
interface Props {}

const Home: React.FC<Props> = () => {
  // return (
  //   <>
  //     <canvas id="renderCanvas" width="600" height="600"></canvas>
  //     <button onClick={run}>add</button>
  //   </>
  // );
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

        {/* <audio controls={true}>
          <source
            src="https://music.163.com/song/media/outer/url?id=33894312.mp3"
            type="audio/mpeg"
          />
        </audio> */}
      </div>
      <Nav />
      <Slider speed={700}>
    
        <PlayList />
      </Slider>
    </>
  );
};

export default Home;
