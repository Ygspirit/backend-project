export function getTextTime() {
  let textTime = '';
  let time = new Date().getHours();
  if (time <= 9) {
    textTime = '早上';
  } else if (time <= 14) {
    textTime = '上午';
  } else if (time <= 18) {
    textTime = '下午';
  } else {
    textTime = '晚上';
  }
  return textTime;
}
