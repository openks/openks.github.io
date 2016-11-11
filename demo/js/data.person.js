// 使用 Mock
var data = Mock.mock({
  'person|5-10': [{
    'id|+1': 1,
    'name': '@cname',
    'warn|1-2': true,
    'department|1': ['生产部', '销售部', '开发部'],
  }]
});
// console.log(data);

function formate_person(data) {
  var newDate = {};
  for (var i = 0, j = data.person.length; i < j; i++) {
    var arr = data.person[i];
    if (arr['department'] in newDate) {
      newDate[arr['department']].push(arr);
    } else {
      newDate[arr['department']] = [];
      newDate[arr['department']].push(arr);
    }
  }
  return newDate;
}

function fillUsers(data){
  var str="";
  for(var i=0;i<data.person.length;i++){
    str+='<li class="resut_item">'+data.person[i].name+'</li>'
  }
  $(".userList").find("ul").empty().append(str);
  //input集联
  $('.inp_tt').on('keyup', function(){
    var _this = $(this)
    var _html = '';
    data.person.forEach(function (item, index, array) {
      if(item.name.indexOf(_this.val()) != -1){
        _html += '<li class="resut_item">'+ item.name +'</li>'
      }
    });
    _this.next().empty().append(_html);
  })
}

fillUsers(data);