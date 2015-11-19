//导航事件
function nav_mark(n){
	var _t;
	if(n=='home'){
		_t = 0
	}else if(n=='competition'){
		_t = 1
	}else if(n=='activity'){
		_t = 2
	}else if(n=='futurestar'){
		_t = 3
	}
	$(".nav_bar").find('li').eq(_t).addClass('cur')
	$(".nav_bar li").hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur')
	},function(){
		$(this).removeClass('cur')
		$(".nav_bar").find('li').eq(_t).addClass('cur')
	});
}
