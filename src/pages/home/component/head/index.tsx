import React, { useState, useEffect } from "react";
import { Input, Avatar, Popover, Button } from "antd";
import { useHistory } from 'react-router'
import { useSelector, useStore} from "react-redux";

import "./index.less";
const { Search } = Input;

interface Props {}

export const AvaterMenu: React.FC = () => {
  const history = useHistory()
  // @ts-ignore
  const userId = useSelector(state => state.privateChatsState.userId);
  const store = useStore()
  const handleChatCilck = () => {
    console.log('userId', typeof userId)
    // TODO: 修复bug
    history.replace('main/chat');
  }
  const handleExit = () => {
    store.dispatch({
      type: "SET_USERID",
      data: undefined
    });
    localStorage.clear()
  }
  const handleLoginIn = () => {
    history.push('/login')
  };
  if (userId) {
    return (
      <div>
        <Button onClick={handleChatCilck}>消息</Button>
        <Button onClick={handleExit}>退出</Button>
      </div>
    );
  } else {
    return <Button onClick={handleLoginIn}>登陆</Button>;
  }
    
};

const HomeHeader: React.FC<Props> = () => {
  return (
    <header className="header-home">
      <div className="header-inner">
        <img
          src="http://localhost:3003/uploads/SuperLuckyBo.png"
          draggable="false"
          alt=""
        />
        <div className="header-search">
          <Search
            placeholder="请输入想要搜索的音乐"
            size="large"
            onSearch={value => {
              window.open(`https://music.163.com/#/search/m/?s=${value}&type=1`);
            }}
            enterButton="搜 索"
          />
        </div>
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
