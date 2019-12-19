import React, { PureComponent } from "react";
import throttle from "../../untils/throttle";
import "./index.css";

export interface IProps {
  /**
   * 自定义样式
   */
  className?: string;
  /**
   * 是否自动播放
   */
  autoPlay?: boolean;
  /**
   * 自动播放速度
   */
  autoPlaySpeed?: number;
  /**
   * 轮播速度
   */
  speed?: number;
  /**
   * 是否启用懒加载
   */
  lazyLoad?: boolean;
  /**
   * 是否显示箭头
   */
  arrows?: boolean;
  /**
   * 箭头大小,可选值 "small" | "medium" | "large"
   */
  arrowSize?: "small" | "medium" | "large";
  /**
   * 箭头位置,可选值 "inner"|"outer"
   */
  arrowPosition?: "inner" | "outer";
}

export interface IState {
  index: number;
  sliderWidth: number;
  slideCount: number;
  isArrowsVisiable: boolean;
}

export default class Slider extends PureComponent<IProps, IState> {
  isTransition: boolean;
  constructor(props: Readonly<IProps>) {
    super(props);
    this.isTransition = false;
    this.handleClickLeft = throttle(this.handleClickLeft, props.speed, true);
    this.handleClickRight = throttle(this.handleClickRight, props.speed, true);
  }
  private static defaultProps = {
    autoPlay: false,
    autoPlaySpeed: 3000,
    speed: 300,
    lazyLoad: false,
    arrows: true,
    arrowSize: "medium",
    arrowPosition: "inner",
    className: "slider-wrap"
  };
  state = {
    index: 0,
    sliderWidth: 0,
    slideCount: 0,
    isArrowsVisiable: false
  };

  handleClickLeft = () => {
    this.setState({ index: this.state.index - 1 });
  };
  handleClickRight = () => {
    this.setState({ index: this.state.index + 1 });
  };
  handleTransitionEnd = () => {
    const { index, slideCount } = this.state;
    if (index === slideCount - 1) {
      this.removeTransition();
      this.setState({ index: 1 });
    } else if (index === 0) {
      this.removeTransition();
      this.setState({ index: slideCount - 2 });
    }
  };
  handleWindowResize = () => {
    let sliderWrap = document.getElementById("slider-wrap");
    sliderWrap &&
      this.setState({
        sliderWidth: sliderWrap.offsetWidth
      });
  };
  handleMouseHover = () => {
    if (this.props.arrows) {
      this.setState({ isArrowsVisiable: true });
    }
  };
  handleMouseLeave = () => {
      this.setState({ isArrowsVisiable: false });
  };
  componentDidUpdate() {
    if (this.isTransition === false) this.addTransition();
  }
  componentDidMount() {
    let slider = document.getElementById("slider-wrap");

    if (slider) {
      // @ts-ignore
      this.setState({ sliderWidth: slider.offsetWidth });
      window.addEventListener("resize", this.handleWindowResize);
    }
    let slideCount = React.Children.count(this.props.children);
    if (slideCount >= 1) {
      this.setState({ index: 1, slideCount: slideCount + 2 });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
  render() {
    const { children, speed, className, arrows } = this.props;
    const { index, sliderWidth, isArrowsVisiable } = this.state;
    const {
      isTransition,
      handleClickLeft,
      handleClickRight,
      handleTransitionEnd,
      handleMouseHover,
      handleMouseLeave
    } = this;

    let sliderButtonStyle;
    if (isArrowsVisiable === true) {
      sliderButtonStyle = " arrows";
    } else {
      sliderButtonStyle = "";
    }
    let sliders = React.Children.toArray(children);
    let sliderItems: React.ReactNode[] = [];
    let sliderStyle;

    if (!children) return null;
    else {
      // 首尾添加 item 为了轮播
      sliderItems.push(sliders[sliders.length - 1]);
      sliders.forEach(item => {
        sliderItems.push(item);
      });
      sliderItems.push(sliders[0]);
    }
    // 如果获取到宽度，设置style
    if (sliderWidth) {
      sliderStyle = {
        transform: `translateX(${-(index * sliderWidth)}px)`,
        transition: isTransition ? `all ${speed}ms` : "none",
        width: sliderItems.length * sliderWidth
      };
    }

    return (
      <>
        <div
          id={className}
          className={className}
          onMouseOver={arrows ? handleMouseHover : undefined}
          onMouseLeave={arrows ? handleMouseLeave : undefined}
        >
          <div
            className="slider-list"
            style={sliderStyle || {}}
            onTransitionEnd={handleTransitionEnd}
          >
            {sliderItems.map((child, childIndex) => {
              return (
                <div
                  className="slider-item"
                  style={{ width: sliderWidth }}
                  key={childIndex}
                >
                  {child}
                </div>
              );
            })}
          </div>
          <div className={"slider-button-left " + sliderButtonStyle}>
            <span className="iconfont" onClick={handleClickLeft}>
              &#xe622;
            </span>
          </div>
          <div className={"slider-button-right " + sliderButtonStyle}>
            {/*  <button onClick={handleClickRight}>right</button> */}
            <span className="iconfont" onClick={handleClickRight}>
              &#xe622;
            </span>
          </div>
        </div>
      </>
    );
  }
  addTransition = () => {
    this.isTransition = true;
  };
  removeTransition = () => {
    this.isTransition = false;
  };
}
