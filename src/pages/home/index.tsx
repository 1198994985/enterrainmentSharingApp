
import React from 'react'
import Slider from '../../component/slider'
interface Props {
  
}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div style={{ height: "110px",lineHeight:"100px",textAlign:"center" }}>
        <Slider>
          <div>1</div>

          <div>2</div>
          <div>3</div>
        </Slider>
      </div>
    </>
  );
}

export default Home;
