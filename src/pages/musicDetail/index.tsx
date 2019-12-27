import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Button, Rate } from "antd";
import { Header, MarkAera } from "./component/";
import { rqMusicDesc } from "../../ajax/";

import "./index.less";

interface Idetail {
  id: number;
  author: string;
  authorId: number;
  name: string;
  picUrl: string;
  publishTime: number;
}
const MusicDetail: React.FC = () => {
  const [id, setId] = useState<string>();
  const [songDetail, setSongDetail] = useState<Idetail>();
  const [playerVisiable, setplayerVisiable] = useState(false);
  const [songUrl, setSongUrl] = useState<string>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params) setId(params.id);
    (async () => {
      const data = await rqMusicDesc(params.id);
      setSongDetail(data);
    })();
    setTimeout(() => {
      let a = document.getElementById("root");
      if (a) a.scrollIntoView({ block: "start", behavior: "auto" });
    }, 0);
  }, [params]);
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
            </div>
          </section>

          <Rate />
        </div>
        <div className="lyric card-white">
          <h1> 歌词</h1>
          <pre>
            {`如果真的我想要 - 黄旭

词：黄旭
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
        <MarkAera />
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
