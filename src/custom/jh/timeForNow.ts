function timeForNow(value: Date) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금 전';
  else if (betweenTime < 60) return `${betweenTime}분 전`;

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간 전`;

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay >= 1 && betweenTimeDay < 7) return `${betweenTimeDay}일 전`;

  const betweenTimeWeek = Math.floor(betweenTime / 60 / 24 / 7);
  if (betweenTimeDay >= 7 && betweenTimeDay <= 120) return `${betweenTimeWeek}주 전`;

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
}

export default timeForNow