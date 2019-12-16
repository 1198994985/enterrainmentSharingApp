### 轮播图，translate动画导致文字模糊
解决方法：在item上开启GPU加速 translate3d(0, 0, 0) || translateZ(0)
### 轮播图 节流函数