
import React from 'react'
import Slider from '../../component/slider'
interface Props {
  
}

const Home: React.FC<Props> = () => {
  return (
    <>
      Home
      <div style={{ height: "120px" }}>
        <Slider>
          <span>1</span>

          <span>2</span>
          <span>3</span>
        </Slider>
      </div>
    </>
  );
}

export default Home;
