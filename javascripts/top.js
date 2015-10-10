$(function() {

	var html = '<div class="jump-top-box"><div class="jump-top js_top"><a href="#" target="_self">返回顶部</a></div><div class="jump-task-list"><a target="_blank" href="../../demo.html">栗子列表</a></div></div>';
	$("body").append(html);

	var fileref = document.createElement('link');
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", "//demo.zhuyangxing.cn/stylesheets/top.css");
	document.getElementsByTagName("head")[0].appendChild(fileref);

	$(".js_top").on("mouseenter", function() {
		$(".js_top").css({
			"font-size": "12px",
			"background-position": "0px 0px"
		});
	}).on("mousemove", function() {
		$(".js_top").css({
			"font-size": "12px",
			"background-position": "0px 0px"
		});
	}).on("mouseout", function() {
		$(".js_top").css({
			"font-size": "0px",
			"background-position": "0px -90px"
		});
	}).on("click", function() {
		window.scroll(0, 0);
	});
	window.onscroll = function() {
		if (document.documentElement.scrollTop + document.body.scrollTop > 99) {
			$(".js_top").css({
				"visibility": "visible"
			});
		} else {
			$(".js_top").css({
				"visibility": "hidden"
			});
		}
	}
})