export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string) {
  const dayInMS = 24 * 60 * 60 * 1000;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMS);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}
