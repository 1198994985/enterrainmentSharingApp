import React,{useState,useEffect} from 'react';
import { Input, Avatar, Popover } from "antd";
import './index.less'
const { Search } = Input;

interface Props {
  
}
const HeaderSearch: React.FC<Props> = () => {
  return (
    <div className="header-search">
      <Search
        placeholder="input search text"
        size="large"
        onSearch={value => console.log(value)}
        enterButton="搜 索"
      />
    </div>
  );
};
const content = (
  <div>
    <p>风</p>
    <p>Content</p>
  </div>
);
const HomeHeader: React.FC<Props> = () => {
  return (
    <header className="header-home">
      <div className="header-inner">
        <div className="header-search">
          <Search
            placeholder="input search text"
            size="large"
            onSearch={value => console.log(value)}
            enterButton="搜 索"
          />
        </div>
        <Popover content={content}  placement="bottomRight">
          <Avatar
            size="large"
            alt="User"
            src="https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG"
          />
        </Popover>
      </div>
    </header>
  );
}

export default HomeHeader;
