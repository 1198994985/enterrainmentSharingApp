import React from "react";
import Slider from "../../component/slider";
interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div style={{ height: "450px", textAlign: "center" }}>
        <Slider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <img
              style={{
                display: "inline-block",
                objectFit: "cover",
                height: "100%",
                width: "100%",
                userSelect: "none"
                // transform: "translate3D(0, 0, 0)"
              }}
              src="https://wx1.sinaimg.cn/mw690/884f7263gy1g9yrnz0mnbj20fr0frjuk.jpg"
              draggable="false"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              width: "100%"
            }}
          >
            <img
              style={{
                display: "inline-block",
                objectFit: "cover",
                height: "100%",
                width: "100%"
                // transform: "translate3D(0, 0, 0)"
              }}
              src="https://ww2.sinaimg.cn/bmiddle/a5cfff19ly1g9xvwo4ux6j20jg0yjaib.jpg"
              draggable="false"
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Home;
