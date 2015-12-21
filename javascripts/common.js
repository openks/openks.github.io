;
/**
 * 倒计时程序
 *
 * @param totle
 *            倒计时的开始数字
 * @param callBack
 *            每隔数字的处理函数
 * @param callBackLast
 *            数到0时的处理函数
 */
var COUNT_INTERVAL = null;

function countDown(totle, callBack, callBackLast) {
	if (arguments.length == 2) {
		callBackLast = callBack;
	}

	function count() {
		console.log(totle);
		if (totle == 0) {
			clearInterval(COUNT_INTERVAL);
			console.log("等于0了");
			callBackLast(totle);
		} else {
			callBack(totle);
		}
		totle--;
	}
	COUNT_INTERVAL = setInterval(count, 1000);
};
//根据设备判断事件类型
var EVENT_TYPE = "click";
if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)) {
	EVENT_TYPE = "touchend";
};

//js做日志
var log = {};
if (location.hash.indexOf("debug=true") > -1) {
	log.info = function(msg) {
		console.log(msg);
	}
} else {
	log.info = function() {};
}
window.log = log;

//动态设置字体大小
var fontNo = screen.width / 320 * 20;
document.getElementsByTagName("html")[0].style.fontSize = fontNo + "px"

/**
 * 根据年龄字符串获取年龄值
 * @param {Object} dateStr "2010-01-01"
 */
function getYears(dateStr) {
	var now = new Date();
	var old = new Date(dateStr);
	var years = now.getFullYear() - old.getFullYear();
	if (now.getMonth() < old.getMonth()) {
		years = years - 1;
	}
	if (now.getMonth() == old.getMonth() && now.getDate() < old.getDate()) {
		years = years - 1;
	}
	years = years < 0 ? 0 : years;
	//  console.log(dateStr  + "--" + years);
	return years;
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};
/*
 * <img data‐src="1.png" data‐webp="1.png.webp" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" >
	1.  img标签使用1px的透明gif做填充图片
	2.  利用data­src放普通图片
	3.  利用data­webp放webp图片
	4.  利用js判断浏览器是否支持webp，从而选择合适的图片格式
 */
function check_webp() {
	var img = new Image();
	img.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	img.onload = function() {
		var result = (img.width > 0) && (img.height > 0);
		var imgs = document.getElementsByTagName("img");
		if (result) {
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].src = imgs[i].getAttribute("data-webp");
			}
		} else {
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].src = imgs[i].getAttribute("data-src");
			}
		}
	};
	img.onerror = function() {
		var imgs = document.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].src = imgs[i].getAttribute("data-src");
		}
	};
}