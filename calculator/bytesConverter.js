module.exports = (value, unit) => {
  if(unit == "Bit" || unit == "Bits"){
    if(value >= 8){
      value = Math.round(value/8)
    }
    if(value > 1){
      unit = "Bytes"
    }else{
      unit = "Byte"
    }
  }
  if(unit == "Byte" || unit == "Bytes"){
    if(value >= 1024){
      value = Math.round(value/1024)
      unit = "KB"
    }
  }
  if(unit == "KB"){
    if(value >= 1024){
      value = Math.round(value/1024)
      unit = "MB"
    }
  }
  if(unit == "MB"){
    if(value >= 1024){
      value = Math.round(value/1024)
      unit = "GB"
    } 
  }
  if(unit == "GB"){
    if(value >= 1024){
      value = Math.round(value/1024)
      unit = "TB"
    }
  }
  if(unit == "TB"){
    if(value >= 1024){
      value = Math.round(value/1024)
      unit = "PB"
    }
  }

  return `${value.toFixed(2).replace(".00", "")}${unit}`
}
