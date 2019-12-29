import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useHistory } from "react-router";

import { Button, Rate } from "antd";
import { Header, MarkAera } from "../musicDetail/component/";
import { rqMusicDesc, rqMark } from "../../ajax/";
import { insertMark } from "../../ajax/";
import { useSelector } from "react-redux";
import "./index.less";
import { IntersectResult } from "../../rayTracing";

interface Idetail {
  id: number;
  author: string;
  authorId: number;
  name: string;
  picUrl: string;
  publishTime: number;
  chineseName: string;
  abstrct: string;
  score:string;
}
interface Imark {
  id: string | number;
  author: string;
  content: string;
  datatime: string;
  avater: string;
}
const GamePage: React.FC = () => {
  const [id, setId] = useState<string>();
  const [gameDetail, setGameDetail] = useState<Idetail>();
  const [playerVisiable, setplayerVisiable] = useState(false);
 
  const [mark, setMark] = useState<Imark[]>();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  useEffect(() => {
    console.log("history", history.location.pathname);

    if (params) setId(params.id);
    (async () => {
      // const data = await rqMusicDesc(params.id);
      // setSongDetail(data);
      const tempMark = await rqMark(params.id, 4);
      // @ts-ignore
      tempMark && setMark(tempMark);
    })();
    setTimeout(() => {
      let a = document.getElementById("root");
      if (a) a.scrollIntoView({ block: "start", behavior: "auto" });
    }, 0);
  }, [history, params]);
  // @ts-ignore
  const userId = useSelector(state => state.privateChatsState.userId);
  const onAddComment = async (comment: string) => {
    let path = history.location.pathname;
    console.log("mark", mark, userId);
    if (userId) {
      let res;
      if (path.indexOf("mv") !== -1) {
        res = await insertMark(params.id, userId, comment, 1);
      } else if (path.indexOf("song") !== -1) {
        res = await insertMark(params.id, userId, comment, 0);
      } else if (path.indexOf("game") !== -1) {
        res = await insertMark(params.id, userId, comment, 4);
      }
      console.log("res.time", res.time);
      if (res instanceof Object) {
        let newMark = {
          id: 1,
          author: userId || 0,
          content: comment,
          datetime: res?.data?.time,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
    }
  };
  return (
    <div className="music-page ">
      <Header />
      <div className="game-wrapper">
        <div className="game-pic">
          <img
            src={gameDetail?.picUrl || "https://img.3dmgame.com/uploads/images/thumbkwdfirst/20191204/1575426749_192366.jpg"}
            alt=""
            className="pic"
          />
        </div>
        <div className="game-detail">
          <div className="game-title">{gameDetail?.chineseName}</div>

          <div className="game-desc-item">
            <span>发售：2020-04-03 （PC）</span>

            <span>发行：Capcom</span>
            <span>开发：Capcom</span>
          </div>
          <div className="game-desc-item">
            <span>平台：PC PS4 XBOXONE</span>

            <span>类型：动作游戏</span>
            <span>语言：简中</span>
          </div>
          <div className="game-desc">
            {gameDetail?.abstrct}
            《生化危机3：重制版（Biohazard
            Re:3）》是由CAPCOM研发的一款动作射击游戏，是由2000年制作的《生化危机3》重制而来。游戏的前半部份发生于《生化危机2》之前，女主角吉尔于洋馆事件后，一直调查有关安布雷拉公司的地下业务。后半部份发生于《生化危机2》之后，吉尔已经康复过来，于是继续出发逃命。
          </div>
        </div>
      </div>
      <div className="game-mark">
        {
          //  @ts-ignore
          <MarkAera onAddComment={onAddComment} mark={mark || []} />
        }
      </div>
    </div>
  );
};

export default withRouter(GamePage);
