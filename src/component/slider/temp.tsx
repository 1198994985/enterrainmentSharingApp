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
    this.isTransition = true;
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
    arrowPosition: "inner"
  };
  state = {
    index: 0,
    sliderWidth: 0,
    slideCount: 0
  };

  addTransition = () => {
    this.isTransition = true;
    console.log("addTransition");
  };
  removeTransition = () => {
    console.log("removeTransition");
    this.isTransition = false;
  };
  handleClickLeft = () => {
    this.setState(
      prevState => ({
        index: prevState.index - 1
      }),
      () => {
        if (this.state.index === 0) {
          this.removeTransition();
          this.setState(prevState => ({
            index: prevState.slideCount - 2
          }));
          this.addTransition();
        }
      }
    );
  };
  handleClickRight = () => {
    if (this.isTransition === false) {
      this.addTransition();
    }
    this.setState(preState => ({ index: preState.index + 1 }));
  };
  
  componentDidUpdate() {
    const { index, slideCount } = this.state;
    const { speed } = this.props;
    if (index === slideCount - 1) {
      this.removeTransition();
      setTimeout(() => {
        this.setState({ index: 1 });
      }, speed);
    }
  }

  componentDidMount() {
    let slider = document.getElementById("slider");
    if (slider) {
      // @ts-ignore
      this.setState(() => ({ sliderWidth: slider.offsetWidth }));
      console.log("slider.offsetWidth :", slider.offsetWidth);
    }
    let slideCount = React.Children.count(this.props.children);
    if (slideCount > 1) {
      // 个数大于 1,可以轮播,收尾添加元素
      this.setState({ index: 1, slideCount: slideCount + 2 });
    }

    // // 监听动画结束
    // slider?.addEventListener("transitionend", () => {});
  }
  render() {
    const { children, speed } = this.props;
    const { index, slideCount, sliderWidth } = this.state;
    const { isTransition } = this;
    const childLength = React.Children.count(children);
    let sliderStyle;
    let sliders = React.Children.toArray(children);
    let sliderItems: React.ReactNode[] = [];

    // 无 item 不显示
    if (childLength === 0 || !children) return null;
    else if (childLength === 1) {
      // 单个 item 不显示箭头和进度栏
    } else if (childLength > 1) {
      // 首尾添加 item 为了轮播
      sliderItems.push(sliders[sliders.length - 1]);
      sliders.map(item => {
        sliderItems.push(item);
      });
      sliderItems.push(sliders[0]);
    }
    if (index) {
      sliderStyle = {
        transform: `translateX(${-(index * sliderWidth)}px)`,
        transition: isTransition ? `all ${speed}ms` : "none",
        width: slideCount * sliderWidth
      };
    }

    return (
      <>
        <div className="slider-wrap">
          <div id="slider" className="slider" style={sliderStyle || {}}>
            {index &&
              sliderItems.map((child, index) => {
                return (
                  <div
                    className="slider-item"
                    style={{ width: sliderWidth }}
                    key={index}
                  >
                    {child}
                  </div>
                );
              })}
          </div>
        </div>
        <button onClick={this.handleClickRight}>click</button>
      </>
    );
  }
}
