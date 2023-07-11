const SUPPORTED_TYPES = ["mb", "gb", "tb"];

module.exports = (value, type) => {
  if (value) {
    value = parseInt(value);

    if (value > 0) {
      if (!type) {
        type = "mb";
      } else {
        type = type?.toLowerCase() || "mb";

        if (!SUPPORTED_TYPES.includes(type)) {
          type = "mb";
        }
      }

      let result = "";

      switch (type) {
        case "mb":
          result = value.toFixed(2).toLocaleString().replace(".00", "") + " MB";
          break;
        case "gb":
          result =
            (value / 1024).toFixed(2).toLocaleString().replace(".00", "") +
            " GB";
          break;
        case "tb":
          result =
            (value / (1024 * 1000))
              .toFixed(2)
              .toLocaleString()
              .replace(".00", "") + " TB";
          break;
      }

      return result;
    } else {
      return "INVALID VALUE";
    }
  } else {
    return "ERROR";
  }
};
