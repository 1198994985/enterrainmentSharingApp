## 轮播图

### 轮播图，translate 动画导致文字模糊

知识点:css GPU 加速
解决方法：在 item 上开启 GPU 加速 translate3d(0, 0, 0) || translateZ(0) || rotateZ(0)

### item 上用 tanslate 开启 GPU 加速首尾切换时闪动

尝试 `backface-visibility:hidden;` 与 `perspective:1000;`无效
改为 `rotateZ(0)`解决问题

### 轮播图 节流函数

知识点: 节流函数

- 问题 1 无缝轮播图收尾切换时，没有切换动画？

  - 原因：一开始不知道有 `transitionEnd` 的监听事件,所以在检测到最后一张图后,关闭动画，然后将当前索引设为 1 ,可是由于动画还没有结束,当前 `setState({index:1})` 已经执行,尝试放在回调函数中没有解决问题, `setTimeout` 延迟设为动画执行时间的方式不够优雅。
  - 解决:监听 `transitionEnd` 事件,在动画结束后检测索引,关闭动画,设置索引。每次执行完判断动画是否关闭,关闭则打开动画。

- 问题 2 点击过快,导致首尾切换不正确
  - 原因: 监听动画结束后才判断是否需要,重置位置(将索引设为 1 或倒数第二个),所以动画还没结束时,频繁点击,导致位移过大。
  - 解决:todo: 用节流函数包裹 click 函数
  - 添加节流函数方法,在constructor中添加节流,`this.handleClickLeft` 采用箭头函数,
    `this.handleClickLeft = throttle(this.handleClickLeft, props.speed, true);`
- 问题 3 界面缩放时,轮播图大小没有更新,导致其他图片显示
  - 原因: 没有添加窗口大小变化的事件监听
  - 解决: 通过addEventListener 添加窗口的事件监听,窗口变化,重置sliderWidth.
### id


