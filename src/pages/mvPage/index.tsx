import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Button, Icon, Card, Upload, message } from "antd";
import { Header, MarkAera } from "../musicDetail/component/";
import { rqMvUrl, rqMark } from "../../ajax/";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./index.less";
import { insertMark } from "../../ajax/";
interface Idetail {
  name: string;
  desc: string;
  picUrl: string;
  mvUrl: {};
  publishTime: string | number;
  playCount: string | number;
  artistId: string | number;
  artistName: string;
}
const defaultUrl = `http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=1b3d1e4d9caee09b0e0199088ccb8d26&wsTime=1577284797`;
interface Imark {
  id: string | number;
  author: string;
  content: string;
  datatime: string;
  avater: string;
}
const MvPage: React.FC = () => {
  const [id, setId] = useState<string>();
  const [mvDetail, setMvDetail] = useState<Idetail>();
  const [mvUrl, setMvUrl] = useState<string>();
  const [mark, setMark] = useState<Imark[]>();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  // @ts-ignore
  const userId = useSelector(state => state.privateChatsState.userId);
  useEffect(() => {
    if (params) setId(params.id);
    (async () => {
      const data = await rqMvUrl(params.id);
      const tempMark = await rqMark(params.id, 1);
      // @ts-ignore
      tempMark && setMark(tempMark);
      if (data) {
        setMvDetail(data);
        if (data.hasOwnProperty("mvUrl")) {
          let url;
          for (let i in data["mvUrl"]) {
            url = data["mvUrl"][i];
          }
          setMvUrl(url);
        }
      }
    })();

    setTimeout(() => {
      let a = document.getElementById("root");
      if (a) a.scrollIntoView({ block: "start", behavior: "auto" });
    }, 0);
  }, [params]);

  const handelShare = () => {
    if (mvDetail) {
      const content = `${mvDetail.artistName},我正在听《${mvDetail?.name}》@SuperLuckyBo,http://www.bobozuishuai.com.cn/mv/${id}`;
      const url = `http://service.weibo.com/share/share.php?appkey=&title=${content}`;
      window.open(url);
    }
  };
  const handleShareFriend = () => {
    if (mvDetail) {
      const content = `${mvDetail.artistName},我正在听《${mvDetail?.name}》@SuperLuckyBo,http://localhost:3000/mv/${id}`;
      const url = `http://localhost:3000/main/chat?content=${content}`;
      window.open(url);
    }
  };
  const onAddComment = async (comment: string) => {
    let path = history.location.pathname;

    if (userId) {
      let res;
      if (path.indexOf("mv") !== -1) {
        res = await insertMark(params.id, userId, comment, 1);
      } else if (path.indexOf("song") !== -1) {
        res = await insertMark(params.id, userId, comment, 0);
      }
      console.log("res", res);
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
          // @ts-ignore
          setMark([newMark]);
        }
      }
    }
  };
  return (
    <div className="mv-page ">
      <Header />
      <div className="main ">
        <div className="mv-wrapper ">
          <div className="mv">
            <section className="mv-title">
              <h1>🎶 MV {mvDetail?.name}</h1>
            </section>
            <video
              src={mvUrl || defaultUrl}
              controls={true}
              className="vedio"
            ></video>
          </div>
          <div className="mv-button">
            <Button>
              <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
            </Button>
            <Button>💬 评论</Button>
            <Button onClick={handelShare}>🔗 分享到微博</Button>
            <Button onClick={handleShareFriend}>🔗 分享给好友</Button>
          </div>

          {
            //@ts-ignore
            <MarkAera onAddComment={onAddComment} mark={mark || []} />
          }
        </div>
        <div className="mv-sider">
          {/* <div className="mv-desc card-white"></div> */}
          <div>
            <img
              src={mvDetail?.picUrl + "?param=298x298"}
              alt=""
              style={{ borderRadius: 4 }}
            />
          </div>
          <Card
            size="small"
            title="💿 MV 简介"
            style={{ marginTop: 5, width: 300 }}
          >
            <p>
              <b>作者: </b> {mvDetail?.artistName}{" "}
            </p>
            <p>
              <b>出版时间: </b>
              {mvDetail?.publishTime}{" "}
            </p>
            <p>
              <b>播放量: </b> {mvDetail?.playCount}{" "}
            </p>
          </Card>
          <Card
            size="small"
            title="💿 MV 描述"
            style={{ marginTop: 5, width: 300 }}
          >
            {mvDetail?.desc}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default withRouter(React.memo(MvPage));
