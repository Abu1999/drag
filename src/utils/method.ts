export const throttled = (fn: any, delay = 500) => {
  let oldtime = Date.now()
  return function (...args: any) {
    let newtime = Date.now()
    if (newtime - oldtime >= delay) {
      fn.apply(null, args)
      oldtime = Date.now()
    }
  }
}
