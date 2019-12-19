import React from "react";
import Slider from "../../component/slider";
interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div
        style={{ height: "500px", textAlign: "center", borderRadius: "10px" }}
      >
        <Slider>
          <img
            style={{
              display: "inline-block",
              objectFit: "cover",
              borderRadius: "20px",
              height: "100%",
              width: "96%"
            }}
            src="https://wx4.sinaimg.cn/mw1024/8546ebd4gy1g9od1j24cdj20m80m8k8p.jpg"
            draggable="false"
          />
          <img
            style={{
              display: "inline-block",
              objectFit: "cover",
              borderRadius: "20px",
              height: "100%",
              width: "96%"
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
