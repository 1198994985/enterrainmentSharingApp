import React, { useState, useEffect } from "react";
import { Input, Avatar, Popover } from "antd";
import { AvaterMenu } from "../../../home/component";
import "./index.less";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Search } = Input;


const HeaderSearch: React.FC = () => {
  return (
    <div className="header-search">
      <Search
        placeholder="input search text"
        size="default"
        enterButton="搜 索"
        onSearch={value => {
          window.open(
            `https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=${value}`
          );
        }}
      />
    </div>
  );
};
interface Iprops{
  selected?:string
}
const HomeHeader: React.FC<Iprops> = ({ selected = "detail" }) => {
  const [current, setCurrent] = useState(selected);
  // @ts-ignore
  const handleClick = e => {
    console.log("click ", e);
    // setCurrent(e.key);
  };
  return (
    <header className="header-fixed">
      <div className="header-inner">
        <img
          src="http://localhost:3003/uploads/SuperLuckyBo.png"
          draggable="false"
          alt=""
          className="logo"
        />
        <Menu
          onClick={handleClick}
          // @ts-ignore
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon type="home" />
              主页
            </a>
          </Menu.Item>

          <Menu.Item key="detail">
            <a
              href={selected === "detail" ? undefined : "http://localhost:3000"}
              target="_blank"
              rel="noopener noreferrer"
            >
              详情页
            </a>
          </Menu.Item>
          <Menu.Item key="chat">
            <a
              href="http://localhost:3000/main/chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              消息
            </a>
          </Menu.Item>
        </Menu>
        <HeaderSearch />
        <Popover content={<AvaterMenu />} placement="bottomRight">
          <Avatar
            size="large"
            alt="User"
            src="https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG"
          />
        </Popover>
      </div>
    </header>
  );
};

export default HomeHeader;
