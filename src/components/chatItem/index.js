import React from "react";
import { Avatar } from "antd";
import "./index.less";
import Linkify from "react-linkify";
// type == 1代表图片
export function ChatItem({
  myself,
  img,
  name,
  time,
  msg,
  clickImg,
  clickAvatar,
  type = 1,
  AvatarUrl = "https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG"
}) {
  const handleMsg = () => {
    if ([2, "2"].includes(type)) {
      return (
        <p>
          <img style={{ width: 150, height: 150 }} src={msg} alt="" />
        </p>
      );
    } else if ([3, "3"].includes(type)) {
      return (
        <p>
          <audio controls={true} className="player">
            <source src={msg} type="audio/mpeg" />
          </audio>
        </p>
      );
    } else if ([4, "4"].includes(type)) {
      return (
        <p>
          <video src={msg} controls={true}  ></video>
        </p>
      );
    } else {
      return (
        <p>
          <Linkify>{msg}</Linkify>
        </p>
      );
    }
  };
  return (
    <div className="chat-item">
      {
        <div className={myself ? "otherchat mychat" : "otherchat"}>
          <div className="chat-avatar">
            <Avatar
              src={
                myself
                  ? AvatarUrl
                  : "https://tvax3.sinaimg.cn/crop.0.0.1080.1080.50/a58523cbly8g3t56dz5wcj20u00u0jtf.jpg?KID=imgbed,tva&Expires=1572271062&ssig=ZtPWhBFdS0"
              }
            />
          </div>
          <div className="chat-info">
            <div className="chat-name">{name && <span> {name} </span>} </div>
            <div className="chat-msg">{handleMsg()}</div>
          </div>
        </div>
      }
    </div>
  );
}

// ChatItem.PropTypes = {
//   myself: PropTypes.bool,
//   img: PropTypes.bool,
//   name: PropTypes.string,
//   time: PropTypes.string,
//   msg: PropTypes.string,
//   clickImg: PropTypes.func,
//   clickAvatar: PropTypes.func,
// }

// ChatItem.defaultProps = {
//   myself: undefined,
//   img: undefined,
//   name: '',
//   time: undefined,
//   msg: '',
//   clickAvatar: undefined,
//   clickImg() { },
// }
