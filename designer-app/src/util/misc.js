export function pause(timeMS = 0) {
  return new Promise((res) => setTimeout(res, timeMS));
}
