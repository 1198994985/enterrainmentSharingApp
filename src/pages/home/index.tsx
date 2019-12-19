/* eslint-disable jsx-a11y/alt-text */
import React,{useState,useEffect,useMemo,useCallback} from "react";
import Slider from "../../component/slider/temp";
interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div
        style={{
          height: "500px",
          textAlign: "center",
          borderRadius: "20px"
        }}
      >
        <Slider>
          <img
            style={{
              display: "block",
              objectFit: "cover",
              borderRadius: "20px",
              height: "100%",
              width: "96%",
              margin: "0 auto"
            }}
            src="https://wx2.sinaimg.cn/mw690/9846815egy1ga2ejdyqryj20u072onpe.jpg"
            draggable="false"
          />
          <img
            style={{
              display: "inline-block",
              objectFit: "cover",
              borderRadius: "20px",
              height: "100%",
              width: "96%",
              margin: "0 auto"
            }}
            src="https://ww2.sinaimg.cn/bmiddle/a5cfff19ly1g9xvwo4ux6j20jg0yjaib.jpg"
            draggable="false"
          />
        </Slider>
      </div>
    </>
  );
};

export default Home;


