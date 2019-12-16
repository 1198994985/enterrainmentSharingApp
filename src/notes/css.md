### 轮播图，translate动画导致文字模糊
解决方法：在item上开启GPU加速 translate3d(0, 0, 0) || translateZ(0)
### item上用tanslate 开启GPU加速后第一张图与最后一张图切换时闪动
尝试 `backface-visibility:hidden;` 与 `perspective:1000;`无效
改为 `rotateZ(360deg)`加速解决问题
### 轮播图 节流函数