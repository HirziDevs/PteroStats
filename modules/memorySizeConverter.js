const SUPPORTED_TYPES = ["MB", "GB", "TB"];

module.exports = (value, type) => {
  if (value && type) {
    value = parseInt(value);

    if (value > 0) {
      if (SUPPORTED_TYPES.includes(type)) {
        let result = "";

        switch (type) {
          case "MB":
            result =
              value.toFixed(2).toLocaleString().replace(".00", "") + " MB";
            break;
          case "GB":
            result =
              (value / 1024).toFixed(2).toLocaleString().replace(".00", "") +
              " GB";
            break;
          case "TB":
            result =
              (value / (1024 * 1000))
                .toFixed(2)
                .toLocaleString()
                .replace(".00", "") + " TB";
            break;
          default:
            result =
              value.toFixed(2).toLocaleString().replace(".00", "") + " MB";
            break;
        }

        return result;
      } else {
        return "INVALID TYPE";
      }
    } else {
      return "INVALID VALUE";
    }
  } else {
    return "ERROR";
  }
};
