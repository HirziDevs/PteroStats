module.exports = (value, total) =>{
  let sol = (value*100)/total; 
    return `${sol.toFixed(2)}%`;
}