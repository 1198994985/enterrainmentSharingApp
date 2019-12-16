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
    speed: 700,
    lazyLoad: false,
    arrows: true,
    arrowSize: "medium",
    arrowPosition: "inner",
    className: "slider-wrap"
  };
  state = {
    index: 0,
    sliderWidth: 0,
    slideCount: 0
  };

  handleClickLeft = () => {
    this.setState({ index: this.state.index - 1 });
  };
  handleClickRight = () => {
    console.log("clickRightButton");
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
  componentDidUpdate() {
    if (this.isTransition === false) this.addTransition();
  }
  componentDidMount() {
    let slider = document.getElementById("slider-list");
    if (slider) {
      // @ts-ignore
      this.setState({ sliderWidth: slider.offsetWidth });
    }
    let slideCount = React.Children.count(this.props.children);
    if (slideCount >= 1) {
      this.setState({ index: 1, slideCount: slideCount + 2 });
    }
  }
  render() {
    const { children, speed, className } = this.props;
    const { index, sliderWidth } = this.state;
    const {
      isTransition,
      handleClickLeft,
      handleClickRight,
      handleTransitionEnd
    } = this;

    let sliders = React.Children.toArray(children);
    let sliderItems: React.ReactNode[] = [];
    let sliderStyle;

    if (!children) return null;
    else {
      // 首尾添加 item 为了轮播
      sliderItems.push(sliders[sliders.length - 1]);
      sliders.map(item => {
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
        <div className={className}>
          <div
            id="slider-list"
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
        </div>
        <button onClick={handleClickLeft}>left</button>
        <button onClick={handleClickRight}>right</button>
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
