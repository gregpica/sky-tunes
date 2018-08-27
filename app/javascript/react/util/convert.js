const msToMinsAndSecs = ms => {
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
}

const toUpperUnderscore = str => str.toUpperCase().replace(/-/g,'_')

const toUnderscore = str => str.replace(/-/g,'_')

export default {
  msToMinsAndSecs: msToMinsAndSecs,
  toUpperUnderscore: toUpperUnderscore,
  toUnderscore: toUnderscore
}
