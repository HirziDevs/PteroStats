module.exports = (used, total) => {
  if (used && total) {
    used = parseInt(used);
    total = parseInt(total);

    if (used >= 1 && total >= 1) {
      let percentage = ((used / total) * 100).toFixed(2).toLocaleString().replace(".00", "") + " %";

      return percentage;
    } else {
      return "ERROR";
    }
  } else {
    return "ERROR";
  }
};
