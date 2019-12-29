// @ts-nocheck
import React from "react";
import { List, Typography } from "antd";
import { PlayListTab, PlayListHead, PlayListTitle } from "../playListHead";
import { Link, NavLink, LinkProps } from "react-router-dom";
import "./temp.less";
interface IPnum {
  name?: number;
}
const RankNum: React.FC<IPnum> = ({ name }) => {
  return <span className="rank-num-temp">{name}</span>;
};

interface IPRankTitale {
  name: string;
  desc: string;
}
const RankTitle: React.FC<IPRankTitale> = ({ name, desc }) => {
  return (
    <div className="rank-link">
      <span className="rank-title">{name}</span>
    </div>
  );
};

interface IPitem {
  name?: string;
  num?: number;
  to?: string;
  imgUrl?: string;
  desc?: string;
}
const RankItem: React.FC<IPitem> = ({
  name = "我最帅",
  to,
  num,
  imgUrl,
  desc = "这是这首歌的描述"
}) => {
  return (
    <div className="rank-item-temp">
      <RankNum name={num} />
      {/* <img width="60px" height="60px" src={imgUrl} alt="" /> */}
      <NavLink to={to}>
        <RankTitle name={name} desc={desc} />
      </NavLink>
    </div>
  );
};

interface IrankList {
  id: number;
  name: string;
  picUrl: string;
  mvId: number;
  author: string;
}
interface Props {
  rankList?: IrankList[];
  title?: string;
}
const TempRankList: React.FC<Props> = ({ rankList, title = "音乐排行榜" }) => {
  return (
    <div className="temp-rank">
      <List
        size="default"
        header={<PlayListTitle name={"排行榜"} />}
        bordered={false}
        split={true}
        dataSource={rankList}
        renderItem={(item, index) => (
          <List.Item>
            <RankItem
              name={item.name}
              num={index + 1}
              to={"/song/" + item.id}
              imgUrl={item.picUrl + "?param=60x60"}
              desc={item.author}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default TempRankList;
