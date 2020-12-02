/**
 * @description 返回时间
 * @param value
 * @returns YYYY-mm-dd HH:MM:SS
 */
export function getDateTime(date = new Date(), fmt = "YYYY-mm-dd HH:MM:SS") {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "S+": date.getSeconds().toString(),
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

/**
 * @description 返回时间段数组
 * @param startDate, endDate
 * @returns array[date]
 */
export function getTimeQuantum(start, end) {
  let ret = [];
  let startDate = new Date(start).getTime();
  let endDate = new Date(end).getTime();
  while (startDate <= endDate) {
    let time = getDateTime(new Date(startDate), "YYYY-mm-dd");
    ret.push(time);
    startDate += 24 * 60 * 60 * 1000;
  }

  return ret;
}
