import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useHistory } from "react-router";

import { Button, Rate, message } from "antd";
import { Header, MarkAera } from "./component/";
import { rqMusicDesc, rqMark } from "../../ajax/";
import { insertMark } from "../../ajax/";
import { useSelector } from "react-redux";
import "./index.less";
import { IntersectResult } from "../../rayTracing";
import { DragSource } from "react-dnd";

interface Idetail {
  id: number;
  author: string;
  authorId: number;
  name: string;
  picUrl: string;
  publishTime: number;
}
interface Imark {
  id: string | number;
  author: string;
  content: string;
  datatime: string;
  avater: string;
}
const MusicDetail: React.FC = () => {
  const [id, setId] = useState<string>();
  const [songDetail, setSongDetail] = useState<Idetail>();
  const [playerVisiable, setplayerVisiable] = useState(false);
  const [songUrl, setSongUrl] = useState<string>();
  const [mark, setMark] = useState<Imark[]>();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  // @ts-ignore
  const userId = useSelector(state => state.privateChatsState.userId);
  useEffect(() => {
    console.log("history", history.location.pathname);

    if (params) setId(params.id);
    (async () => {
      const data = await rqMusicDesc(params.id);
      setSongDetail(data);
      const tempMark = await rqMark(params.id, 0);
      // @ts-ignore
      tempMark && setMark(tempMark);
    })();
    setTimeout(() => {
      let a = document.getElementById("root");
      if (a) a.scrollIntoView({ block: "start", behavior: "auto" });
    }, 0);
  }, [history, params]);
  const handelShare = () => {
    if (songDetail) {
      const url = `http://service.weibo.com/share/share.php?appkey=&title=我正在听${songDetail?.name}&url=http://www.bobozuishuai.com.cn:8010/song/${id}`;
      window.open(url);
    }
  };
  const handlePlay = async () => {
    setplayerVisiable(true);
    if (id) {
      setSongUrl(`https://music.163.com/song/media/outer/url?id=${id}.mp3`);
    }
  };

  const onAddComment = async (comment: string) => {
    let path = history.location.pathname;
    console.log("mark", mark);
    if (userId) {
      let res;
      if (path.indexOf("mv") !== -1) {
        res = await insertMark(params.id, userId, comment, 1);
      } else if (path.indexOf("song") !== -1) {
        res = await insertMark(params.id, userId, comment, 0);
      }
      console.log("res.time", res.time);
      if (res instanceof Object) {
        let newMark = {
          id: 1,
          author: userId || 0,
          content: comment,
          datetime: res?.data?.time,
          avatar:
            "https://tvax3.sinaimg.cn/crop.0.0.996.996.180/006N18DEly8g9fuv61xm0j30ro0ro40f.jpg?KID=imgbed,tva&Expires=1577102993&ssig=FJjqh7zXKG"
        };
        if (Array.isArray(mark) && mark.length) {
          // @ts-ignore
          newMark.id = mark[0].id + 1;
          // @ts-ignore
          setMark([newMark, ...mark]);
        } else {
          console.log("newMark", newMark);
          // @ts-ignore
          setMark([newMark]);
        }
      }
    } else {
      message.info("登陆后可评论");
    }
  };
  const handleShareFriend = () => {
    if (songDetail) {
      const content = `${songDetail.author},我正在看《${songDetail?.name}》@SuperLuckyBo,http://localhost:3000/song/${id}`;
      const url = `http://localhost:3000/main/chat?content=${content}`;
      window.open(url);
    }
  };
  return (
    <div className="music-page ">
      <Header />
      <div className="main">
        <div className="music-desc-wrapper ">
          <img
            className="music-pic"
            src={songDetail?.picUrl + "?param=250x250"}
            alt=""
          />
          <section className="music-desc">
            <h2 className="music-name ">🎵{songDetail && songDetail.name}</h2>
            <div className="author">🎤歌 手: {songDetail?.author}maikef</div>
            <div className="author">🕔发行时间: {songDetail?.publishTime}</div>
            <div className="button">
              <Button type="primary" onClick={handlePlay}>
                ▶ 播放
              </Button>
              <Button>❤ 收藏</Button>
              <Button>💬 评论</Button>
              <Button onClick={handelShare}>🔗 分享到微博</Button>
              <Button onClick={handleShareFriend}>🔗 分享给好友</Button>
            </div>
          </section>

          <Rate />
        </div>
        <div className="lyric card-white">
          <h1> 歌词</h1>
          <pre>
            {`${songDetail && songDetail.name} - ${songDetail?.author}

词：${songDetail?.author}
曲：Mai
编曲：Mai
和声：潘玮柏/何美延/SeanT肖恩恩/于嘉萌
黄旭：
如果 如果 如果
我是天赋生的天才
天生玩的这么遛
你们一点都不free
所以哪里来的style
Rap star说唱歌手
名头都该加引号
听过你的歌就像是刚刚闯了祸
你们word play的功力
像是高仿地摊货
真的有点搞不懂
现在小粉丝大部队
我想他们品味和智商间
一定有误会
像根noodle
拿着卷轴
商业玩偶
我是猎手
都是一个模子 说的一个样
（我把眼光放的远）
Welcome welcome welcome to the zoo
（站在山顶）
（我把眼光放的远）
Welcome welcome welcome to the
`}
          </pre>
        </div>
        {
          //@ts-ignore
          <MarkAera onAddComment={onAddComment} mark={mark || []} />
        }
      </div>
      {playerVisiable && (
        <audio controls={true} className="player">
          <source src={songUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default withRouter(MusicDetail);
