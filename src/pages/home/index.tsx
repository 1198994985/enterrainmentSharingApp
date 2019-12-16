
import React from 'react'
import Slider from '../../component/slider'
interface Props {
  
}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div style={{ height: "110px", textAlign: "center" }}>
        <Slider>
          <div style={{ display: "flex" }}>
            <div
              style={{
                height: "50px",
                width: "50px",
                border: "2px solid black"
              }}
            >
              7
            </div>
            <div
              style={{
                height: "50px",
                width: "50px",
                border: "2px solid black"
              }}
            >
              8
            </div>
          </div>

          <div>2</div>
          <div>3</div>
        </Slider>
      </div>
    </>
  );
}

export default Home;
