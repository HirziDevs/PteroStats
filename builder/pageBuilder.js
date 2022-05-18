module.exports = (input, array) => {
  let page = 1;
  let start = 0;
  let stop = 9;

  if(!input){
    input = 1;
  }

  page = input;

  if(page < 1){
    page = 1;
    }else if(page > 1){
    if(((((page-1)*10)+1) > array.length)){
    page = 1;
    }else{
    start += (page-1)*10;
    stop += (page-1)*10;
    }
  }

  if(stop > array.length-1){
    stop = array.length-1;
  }

  let pages = 1;
  
  if(array.length % 10 == 0){
    pages = Math.floor(array.length/10);
  }else{
    pages = Math.floor(array.length/10)+1;
  }

  return [start, stop, page, pages];
}