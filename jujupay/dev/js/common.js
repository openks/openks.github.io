/**
 * 选择器选取的照片可以在微信里双击打开
 * 需引入jquery
 * @param  {String} selector jquery的可以选择img的选择器
 */
function showPicInWeixin(selector){
  var srcList = [];
   $.each($(selector),function(i,item){
      if(item.src) {
          srcList.push(item.src);
      }
   });
   $(selector).on("click",function(){
    var src = $(this).attr("src");
     WeixinJSBridge.invoke('imagePreview',{
        'current' : src,
        'urls' : srcList
     });
   });
};


/**
 * 自动计算并设置弹层高度
 * @param  {String} selector 弹层容器选择器
 */
function calHeight(selector){
  var height = $(selector).css("height");
  height=-parseInt(height,10)/2;
  console.log(height);
  $(selector).css("margin-top",height+"px");
};
