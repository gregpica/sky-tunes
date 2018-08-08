const msToMinsAndSecs = ms => {
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
}

export default {
  msToMinsAndSecs: msToMinsAndSecs
}
