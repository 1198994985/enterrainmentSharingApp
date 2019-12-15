import React, { PureComponent } from "react";

export interface IProps {
  /**
   * 自定义样式
   */
  className: string;
  /**
   * 是否自动播放
   */
  autoPlay: boolean;
  /**
   * 自动播放速度
   */
  autoPlaySpeed: number;
  /**
   * 轮播速度
   */
  speed: number;
  /**
   * 是否启用懒加载
   */
  lazyLoad: boolean;
  /**
   * 是否显示箭头
   */
  arrows: boolean;
  /**
   * 箭头大小,可选值 "small" | "medium" | "large"
   */
  arrowSize: "small" | "medium" | "large";
  /**
   * 箭头位置,可选值 "inner"|"outer"
   */
  arrowPosition: "inner" | "outer";
}

export interface IState {
  index: number;
  sliderWidth: number;
  slideCount: number;
}

export default class index extends PureComponent<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
  }
  private static defaultProps = {
    autoPlay: false,
    autoPlaySpeed: 3000,
    speed: 300,
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

  addTransition = () => {};
  removeTransition = () => {};
  setTranslateX = () => {};
  handleClickLeft = () => {
    // TODO: 这里没有对index==0的情况处理,因为一开始
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

    // 不等于0,直接设置索引
  };
  handleClickRight = () => {
    const { index, slideCount } = this.state;
    this.setState({ index: index + 1 }, () => {
      if (index === slideCount - 1) {
        this.removeTransition();
        this.setState({ index: 1 });
        this.addTransition();
      }
    });
  };
  componentDidMount() {
    let slider = document.getElementById(".slider-wrap");
    if (slider) {
      // @ts-ignore
      this.setState(() => ({ sliderWidth: slider.offsetWidth }));
    }
    let slideCount = React.Children.count(this.props.children);
    if (slideCount > 1) {
      // 个数大于 1,可以轮播,收尾添加元素
      this.setState({ index: 1, slideCount: slideCount + 2 });
      // child 首尾添加 item
    }
    console.log("this.sliderWidth", this.state.sliderWidth);
  }
  render() {
    const { arrowPosition, className, children } = this.props;
    const { index, slideCount, sliderWidth } = this.state;
    const transformX = {
      transform: `transform:translateX(-${index * sliderWidth})`
    };
    let sliders = React.Children.toArray(children);
    // 无 item 不显示
    if (slideCount === 0 || !children) return null;
    else if (slideCount === 1) {
      // 单个 item 不显示箭头和进度栏
    } else if (slideCount > 1) {
      // 首尾添加 item 为了轮播
      sliders.unshift(sliders[0]);
      sliders.push(sliders[sliders.length - 1]);
    }

    return (
      <div id="slider-wrap" className="slider-wrap" style={transformX}>
        {React.Children.map(sliders, child => {
          return <div className="slider-item">{child}</div>;
        })}
        <button onClick={this.handleClickRight}>click</button>
      </div>
    );
  }
}
