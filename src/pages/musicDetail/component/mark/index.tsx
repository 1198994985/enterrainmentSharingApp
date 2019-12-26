import React from "react";
import { Button, Rate, Comment, Tooltip, List } from "antd";
import moment from "moment";
const data = [
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: "冯博",
    avatar:
      "https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG",
    content: <p>冯博最帅了</p>,
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>
          {moment()
            .subtract(1, "days")
            .fromNow()}
        </span>
      </Tooltip>
    )
  },
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: "冯博",
    avatar:
      "https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG",
    content: <p>冯博最帅了</p>,
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>
          {moment()
            .subtract(1, "days")
            .fromNow()}
        </span>
      </Tooltip>
    )
  },
  {
    actions: [<span key="comment-list-reply-to-0">回复</span>],
    author: "冯博",
    avatar:
      "https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG",
    content: <p>冯博最帅了</p>,
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD HH:mm:ss")}
      >
        <span>
          {moment()
            .subtract(1, "days")
            .fromNow()}
        </span>
      </Tooltip>
    )
  }
];
interface Props {}

const index: React.FC<Props> = () => {
  return (
    <div>
      <List
        className="comment-list"
        header={`${data.length} 评论`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </div>
  );
};

export default index;
