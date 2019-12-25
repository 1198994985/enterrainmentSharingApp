
// @ts-nocheck
import React from "react";
import { List, Typography } from "antd";
import { PlayListTab, PlayListHead, PlayListTitle } from "../playListHead";
import { Link, NavLink,LinkProps } from "react-router-dom";
import "./index.less";
interface IPnum {
  name?: number;
}
const RankNum: React.FC<IPnum> = ({ name }) => {
  return (
    <>
      <span className="rank-num">{name}</span>
    </>
  );
};

interface IPRankTitale {
  name?: string;
}
const RankTitle: React.FC<IPRankTitale> = ({ name }) => {
  return (
    <div className="rank-link">
      <span className="rank-title">{name}</span>
      <div className="rank-desc">这是这首歌的介绍</div>
    </div>
  );
};
interface IPitem {
  name?: string;
  num?: number;
  to?: string ;
}
const RankItem: React.FC<IPitem> = ({ name, to, num }) => {
  return (
    <>
      <RankNum name={num} />
      <NavLink to={to}>
        <RankTitle name={name} />
      </NavLink>
    </>
  );
};



interface Props {
  rankList?:[];
}
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires."
];
const RankList: React.FC<Props> = ({ rankList = data }) => {
  return (
    <div>
      <h3 style={{ margin: "16px 0" }}>Large Size</h3>
      <List
        size="large"
        header={<PlayListTitle name="音乐排行榜" />}
        bordered={false}
        split={true}
        dataSource={rankList}
        renderItem={(item, index) => (
          <List.Item>
            <RankItem name={item} num={index + 1} to="/test" />
          </List.Item>
        )}
      />
    </div>
  );
};
export default RankList;
