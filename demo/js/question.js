var vm = new Vue({
  el: ".swiper-wrapper",
  data: dateList,
  methods: {
    count: function() {
      var right = 0;
      for (var i in dateList.questions) {
        d = dateList.questions[i];
        if (d.signal) {
          answer = d.signalAnswer;
        } else {
          answer = d.answer.sort().toString();
        }
        if (answer == d.rightAnswer.sort().toString()) {
          right++;
        }
      }
      layer.open({content: "您答对了"+ right + "题",btn: ['确定']});
    },
  }
});
var mySwiper = new Swiper('.swiper-container', {
  effect: "slide",
  pagination: '.swiper-pagination',
  paginationType: 'progress',
  onTransitionEnd: function(swiper){
    if(swiper.isEnd&&swiper.previousIndex==swiper.activeIndex){
      layer.open({
        content: '已到最后一题，是否提交？',
        btn: ['提交', '取消'],
        shadeClose: false,
        yes: function(){
          vm.count();
        }, no: function(){
        }
      });
    }
  },
});
