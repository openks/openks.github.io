var clock = document.getElementById("clock");
var drawing = clock.getContext("2d");
var cxt_pins = document.getElementById("pins").getContext("2d");
drawing.fillStyle = "rgb(0,0,0)";
drawing.moveTo(200, 200);
drawing.beginPath();
drawing.save();
//绘制外面的大圆
drawing.lineWidth = 2;
drawing.arc(200, 200, 180, 0, Math.PI * 2, true);
drawing.stroke();
drawing.restore();
drawing.closePath();

drawing.translate(200, 200);
drawing.fillStyle = "rgb(0,0,0)";
//绘制60个分钟界
for (var i = 0; i < 60; i++) {
	drawing.save();
	drawing.rotate(-6 * i * Math.PI / 180);
	if (i % 5 == 0) {
		drawing.fillRect(-2, -180, 4, 10);
	} else {
		drawing.fillRect(-1, -180, 2, 5);
	}
	drawing.restore();
}
//填充12个数字
for (var i = 1; i <= 12; i++) {
	drawing.fillText(i, 150 * Math.cos((30 * i - 90) * Math.PI / 180), 150 * Math.sin((30 * i - 90) * Math.PI / 180));
}
cxt_pins.translate(200, 200);

function getTime() {
	cxt_pins.clearRect(-200, -200, 400, 400);
	var cur = new Date();
	var h = cur.getHours();
	var m = cur.getMinutes();
	var s = cur.getSeconds();
	var h1 = h > 12 ? h - 12 : h;

	cxt_pins.save();
	cxt_pins.rotate((h1 * 30 + m * 0.5 + 180) * Math.PI / 180);
	cxt_pins.fillRect(-3, -20, 6, 120);
	cxt_pins.restore();

	cxt_pins.save();
	cxt_pins.rotate((m * 6 + s * 0.1 + 180) * Math.PI / 180);
	cxt_pins.fillRect(-2, -20, 4, 150);
	cxt_pins.restore();

	//绘制秒钟
	cxt_pins.save();
	cxt_pins.rotate((6 * s + 180) * Math.PI / 180);
	//	cxt_pins.beginPath();
	//	cxt_pins.fillStyle = 'black';
	//	cxt_pins.moveTo(-2, -20);
	//	cxt_pins.lineTo(0, 170);
	//	cxt_pins.lineTo(2, -20);
	//	cxt_pins.lineTo(-2, -20);
	//	cxt_pins.fill();
	//	cxt_pins.closePath();
	cxt_pins.fillRect(-1, -20, 2, 180);
	cxt_pins.restore();
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;

	cxt_pins.save();
	cxt_pins.fillStyle = "rgb(255,255,255)";
	cxt_pins.arc(0, 0, 2, 0, Math.PI * 2, true);
	cxt_pins.fill();
	cxt_pins.restore();

	cxt_pins.beginPath();
	cxt_pins.rect(-95, 190, 200, 50);
	cxt_pins.stroke();
	cxt_pins.clearRect(-95, 190, 200, 50);
	cxt_pins.font = "48px serif";
	cxt_pins.fillText(h + ":" + m + ":" + s, -95, 230);
	cxt_pins.closePath();
	window.requestAnimationFrame(getTime);
}
window.requestAnimationFrame(getTime);
//setInterval(getTime,1000);

function setTime(){
 var  time=new Date();
  var seconds = time.getSeconds();
  var mins=time.getMinutes();
  var hours=time.getHours()%12;
  $(".second").css({"transform":"rotate("+seconds*6+"deg)"});
  $(".minute").css({"transform":"rotate("+(seconds/10+mins*6)+"deg)"});
  $(".hour").css({"transform":"rotate("+(seconds/120+mins/2+hours*30)+"deg)"});
  window.requestAnimationFrame(setTime);
}
window.requestAnimationFrame(setTime);
//setInterval(setTime,1000);
//setTimeout(setTime,1000)



function showCountDown(year,month,day){
    var now=new Date();
    var endDate = new Date(year,month-1,day);
    var leftsecond = (endDate.getTime()-now.getTime())/1000;
    var day1 = Math.floor(leftsecond/(60*60*24));
    var hour = Math.floor((leftsecond-day1*60*60*24)/60/60);
    var minute = Math.floor((leftsecond-day1*60*60*24-hour*3600)/60);
    var second = Math.floor(leftsecond-day1*60*60*24-hour*3600-minute*60);
//  console.log("距离"+year+"年"+month+"月"+day+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒");
		$(".timeInfo").text(day1+"天"+hour+"小时"+minute+"分"+second+"秒");
		window.requestAnimationFrame(function(){showCountDown(2020,2,2);});
}
window.requestAnimationFrame(function(){showCountDown(2020,2,2);});
//var myInterval = setInterval(function(){showCountDown(2020,2,2);},1000);
