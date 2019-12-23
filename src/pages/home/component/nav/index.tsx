import React from 'react'
import './index.less'
interface Props {
  
}
interface ILink {
  isWeight?: boolean;
}
const NavLink: React.FC<ILink> = ({ children, isWeight = false }) => {
  return (
    <span className={isWeight ? "nav-font nav-link" : "nav-link"}>
      {children}
    </span>
  );
};
const NavItem: React.FC = ({ children }) => {
  return <div className="nav-item">{children}</div>;
};
const Nav: React.FC<Props> = () => {
  return (
    <nav className="nav-home">
      <NavItem>
        <NavLink isWeight> 音乐</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 流行</NavLink>
        <NavLink> 摇滚</NavLink>
      </NavItem>
      <NavItem>
        <NavLink isWeight> 图片</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 风景</NavLink>
        <NavLink> 写实</NavLink>
      </NavItem>
      <NavItem>
        <NavLink isWeight> 电影</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 科幻</NavLink>
        <NavLink> 惊悚</NavLink>
      </NavItem>
      <NavItem>
        <NavLink isWeight> 音乐</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 流行</NavLink>
        <NavLink> 摇滚</NavLink>
      </NavItem>
    </nav>
  );
};

export default Nav;
