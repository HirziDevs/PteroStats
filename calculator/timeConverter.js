module.exports = (value, unit) => {
  let ms = "0ms"
  let sec = "0sec"
  let min = "0min"
  let hour = "0hour"
  let day = "0day"
  let month = "0month"
  let year = "0year"
  if(unit == "ms"){
    if(value >= 1000){
      ms = `${Math.round(value%1000)}ms`
      value = Math.round(value/1000)
      unit = "sec"
      sec = `${value}sec`
      if(value > 1){
        sec = sec + 's'
      }
    }
  }
  if(unit == "sec" || unit == "secs"){
    if(value >= 60){
      sec = `${Math.round(value%60)}sec`
      value = Math.round(value/60)
      unit = "min"
      min = `${value}min`
      if(value > 1){
        min = min + 's'
      }
    } 
  }
  if(unit == "min" || unit == "mins"){
    if(value >= 60){
      min = `${Math.round(value%60)}min`
      value = Math.round(value/60)
      unit = "hour"
      hour = `${value}hour`
      if(value > 1){
        hour = hour + 's'
      }
    } 
  }
  if(unit == "hour" || unit == "hours"){
    if(value >= 24){
      hour = `${Math.round(value%24)}hour`
      value = Math.round(value/24)
      unit = "day"
      day = `${value}day`
      if(value > 1){
        day = day + 's'
      }
    }
  }
  if(unit == "day" || unit == "days"){
    if(value >= 30){
      day = `${Math.round(value%30)}day`
      value = Math.round(value/30)
      unit = "month"
      month = `${value}month`
      if(value > 1){
        month = month + 's'
      }
    } 
  }
  if(unit == "month" || unit == "months"){
    if(value >= 30){
      month = `${Math.round(value%30)}month`
      value = Math.round(value/30)
      unit = "year"
      year = `${value}year`
      if(value > 1){
        year = year + 's'
      }
    } 
  }

  if(unit == "year" || unit == "years"){
    return year + " " + month + " " + day + " " + hour + " " + min + " " + sec + " " + ms
  }
  else if(unit == "month" || unit == "months"){
    return month + " " + day + " " + hour + " " + min + " " + sec + " " + ms
  }
  else if(unit == "day" || unit == "days"){
    return day + " " + hour + " " + min + " " + sec + " " + ms
  }
  else if(unit == "hour" || unit == "hours"){
    return hour + " " + min + " " + sec + " " + ms
  }
  else if(unit == "min" || unit == "mins"){
    return min + " " + sec + " " + ms
  }
  else if(unit == "sec" || unit == "sec"){
    return sec + " " + ms
  }else if(unit == "ms"){
    return ms
  }
  else{
    console.log("unknown unit")
    return
  }
}