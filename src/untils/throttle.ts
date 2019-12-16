/**
 * 节流函数
 * @param  {function} func 回调函数
 * @param  {number} waitTime 延迟时间
 * @param  {boolean} isImmediate 是否立刻执行
 * @returns {function} 返回函数引用
 */
export default function throttle(
  func: () => any,
  waitTime: number = 300,
  isImmediate: boolean = true
) {
  let timeout: NodeJS.Timeout | null;
  return function(...args: []) {
    // @ts-ignore
    let thisContext = this;
    if (!timeout) {
      if (isImmediate) {
        func.apply(thisContext, args);
        timeout = setTimeout(() => {
          timeout = null;
        }, waitTime);
      } else {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(thisContext, args);
        }, waitTime);
      }
    }
  };
}


