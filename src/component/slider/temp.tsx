import React, { useState, useEffect, useMemo, useCallback } from "react";
import throttle from "../../untils/throttle";
import "./index.css";
interface Props {
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

const Slider: React.FC<Props> = React.memo(
  ({
    autoPlay = false,
    autoPlaySpeed = 3000,
    speed = 300,
    lazyLoad = false,
    arrows = true,
    arrowSize = "medium",
    arrowPosition = "inner",
    className = "slider-wrap",
    children
  }) => {
    const [index, setIndex] = useState<number>(0);
    const [sliderWidth, setSliderWidth] = useState<number>(0);
    const [slideCount, setSlideCount] = useState<number>(0);
    const [isArrowsVisiable, setIsArrowsVisiable] = useState<boolean>(false);
    const [isTransition, setIsTransition] = useState<boolean>(false);

    const addTransition = useCallback(() => {
      setIsTransition(true);
    }, []);
    const removeTransition = useCallback(() => {
      setIsTransition(false);
    }, []);

    const handleClickLeft = useCallback(
      throttle(
        function() {
          setIndex(c => c - 1);
        },
        speed,
        true
      ),
      []
    );
    const handleClickRight = useCallback(
      throttle(
        function() {
          setIndex(c => c + 1);
        },
        speed,
        true
      ),
      []
    );
    const handleTransitionEnd = () => {
      if (index === slideCount - 1) {
        removeTransition();
        setIndex(1);
      } else if (index === 0) {
        removeTransition();
        setSlideCount(slideCount - 2);
      }
    };
    const handleWindowResize = useCallback(() => {
      let sliderWrap = document.getElementById("slider-wrap");
      sliderWrap && setSliderWidth(sliderWrap.offsetWidth);
    }, []);
    const handleMouseHover = useCallback(() => {
      if (arrows) {
        setIsArrowsVisiable(true);
      }
    }, [arrows]);
    const handleMouseLeave = useCallback(() => {
      setIsArrowsVisiable(false);
    }, []);
    useEffect(() => {
      if (isTransition === false) addTransition();
    });
    useEffect(() => {
      let slider = document.getElementById("slider-wrap");

      if (slider) {
        // @ts-ignore
        setSliderWidth(slider.offsetWidth);
        window.addEventListener("resize", handleWindowResize);
      }
      let slideCount = React.Children.count(children);
      if (slideCount >= 1) {
        setIndex(1);
        setSlideCount(slideCount + 2);
      }
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [children, handleWindowResize]);

    let sliderButtonStyle;
    let sliders = React.Children.toArray(children);
    let sliderItems: React.ReactNode[] = [];
    let sliderStyle;
    if (isArrowsVisiable === true) {
      sliderButtonStyle = " arrows";
    } else {
      sliderButtonStyle = "";
    }
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
            <span className="iconfont" onClick={handleClickRight}>
              &#xe622;
            </span>
          </div>
        </div>
      </>
    );
  }
);

export default Slider;
