import React, { useState, useEffect, useMemo, useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Button, Icon, Card } from "antd";
import { Header, MarkAera } from "../musicDetail/component/";
import { rqMvUrl } from "../../ajax/";

import "./index.less";

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

const MvPage: React.FC = () => {
  const [id, setId] = useState<string>();
  const [mvDetail, setMvDetail] = useState<Idetail>();
  const [mvUrl, setMvUrl] = useState<string>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params) setId(params.id);
    (async () => {
      const data = await rqMvUrl(params.id);
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
      const url = `http://service.weibo.com/share/share.php?appkey=&title=我正在听${mvDetail?.name}http://www.bobozuishuai.com.cn:8010/song/${id}`;
      window.open(url);
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
          </div>
          <MarkAera />
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

export default withRouter(MvPage);
