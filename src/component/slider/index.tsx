import React, { PureComponent } from "react";
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

  addTransition = () => {
    this.isTransition = true;
  };
  removeTransition = () => {
    this.isTransition = false;
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

    // // 监听动画结束
    // slider?.addEventListener("transitionend", () => {
    //   if (this.state.index === this.state.slideCount - 1) {
    //     console.log("this.state.index", this.state.index);
    //     this.removeTransition();
    //     this.setState({ index: 1 });
    //   }
    // });
  }
  render() {
    const { children, speed, className } = this.props;
    const { index, sliderWidth, slideCount } = this.state;
    const {
      isTransition,
      handleClickLeft,
      handleClickRight,
      handleTransitionEnd
    } = this;
    // const childLength = React.Children.count(children);
    let sliderStyle;
    let sliders = React.Children.toArray(children);
    let sliderItems: React.ReactNode[] = [];

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
                  z-index={
                    childIndex === 0 || childIndex === slideCount - 1
                      ? 99 - childIndex
                      : 70
                  }
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
}
