import React from "react";
import { NavItem } from "../nav";
import "./index.less";

interface Props {
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const PlayListTab: React.FC<Props> = ({
  onClick,
  name,
  onMouseOver,
  onMouseOut
}) => {
  return (
    <>
      <NavItem
        className="playlist-nav-item"
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <span className="playlist-tab"> {name} </span>
      </NavItem>
    </>
  );
};

interface IPLTitle {
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PlayListTitle: React.FC<IPLTitle> = ({
         onClick,
         name,
         onMouseOver,
         onMouseOut
       }) => {
         return (
           <h2
             className="playlist-title"
             onClick={onClick}
             onMouseOver={onMouseOver}
             onMouseOut={onMouseOut}
           >
             {name}
           </h2>
         );
       };

interface IPLHead {}

const PlayListHead: React.FC<IPLHead> = () => {
  return (
    <div className="playlist-head">
      <PlayListTitle name="今日热门" />
      <div className="playlist-tabs">
        <PlayListTab name="音乐" />

        <PlayListTab name="音乐" />
        <PlayListTab name="今日腿" />
        <PlayListTab name="英雄联盟" />
        <PlayListTab name="音乐" />
      </div>
    </div>
  );
};

export { PlayListTab, PlayListHead, PlayListTitle };
