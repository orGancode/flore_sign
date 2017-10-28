/**
 * 将form里面的内容序列化成json
 * 相同的checkbox用分号拼接起来
 * @param {dom} 指定的选择器
 * @param {obj} 需要拼接在后面的json对象
 * @method serializeJson
 * */
$.fn.serializeJson=function(otherString){
  var serializeObj={},
    array=this.serializeArray();
  $(array).each(function(){
    if(serializeObj[this.name]){
      serializeObj[this.name]+=';'+this.value;
    }else{
      serializeObj[this.name]=this.value;
    }
  });

  if(otherString!=undefined){
    var otherArray = otherString.split(';');
    $(otherArray).each(function(){
      var otherSplitArray = this.split(':');
      serializeObj[otherSplitArray[0]]=otherSplitArray[1];
    });
  }
  return serializeObj;
};
