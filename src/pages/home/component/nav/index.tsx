import React from "react";
import "./index.less";
interface Props {}
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

interface INavItemProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOut?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const NavItem: React.FC<INavItemProps> = ({
  children,
  className,
  onClick,
  onMouseOver,
  onMouseOut
}) => {
  return (
    <div
      className={"nav-item " + className}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </div>
  );
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
        <NavLink isWeight> 创作</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 翻唱</NavLink>
        <NavLink> 模仿</NavLink>
      </NavItem>
      <NavItem>
        <NavLink isWeight> 故事</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 音乐</NavLink>
        <NavLink> 故事</NavLink>
      </NavItem>
      <NavItem>
        <NavLink isWeight> 有声书</NavLink>
        <NavLink> | </NavLink>
        <NavLink> 有声电台</NavLink>
      </NavItem>
    </nav>
  );
};

export default Nav;
