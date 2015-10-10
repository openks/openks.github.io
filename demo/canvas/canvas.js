/**
 * 创建mun个span标签
 *
 * @param num
 *            span标签的个数
 * @returns
 */
function createSpans(num) {
	var frag = document.createDocumentFragment();
	for (var i = 0, a, m; i < num; i++) {
		a = document.createElement("span");
		m = getRandomColor();
		a.className = "colorTool js_color";
		a.style.backgroundColor = m;
		a.style.border = "1px solid #fff";
		frag.appendChild(a);
	}
	return frag;
};
/**
 * 获取随机颜色值
 *
 * @returns {String} rgb格式的颜色值
 */
function getRandomColor() {
	return "rgb(" + parseInt(Math.random() * 255, 10) + "," + parseInt(Math.random() * 255, 10) + "," + parseInt(Math.random() * 255, 10) + ")";
}
$("#tools").append(createSpans(18));

var c = document.getElementById("myCanvas");
var cxt = c.getContext("2d");
cxt.canvas.style.cursor = "url(favicon.ico),auto";
$(document).ready(function(e) {

	$("#myCanvas").on("vmousedown", function(event) {
		console.log("pageX:" + event.pageX + "--pageY:" + event.pageY);
		console.log("clientX:" + event.clientX + "--clientY:" + event.clientY);
		console.log("offsetX:" + event.offsetX + "--offsetY:" + event.offsetY);
		console.log("pageX-offsetX:" + (event.pageX - event.offsetX) + "--pageY-offsetY:" + (event.pageY - event.offsetY));
	});


	$("#myCanvas").on("vmousedown", function(event) {
		cxt.beginPath();
		cxt.lineJoin = "round";
		cxt.moveTo(event.offsetX, event.offsetY);
		$("#myCanvas").on("vmousemove", function(event) {
			cxt.lineTo(event.offsetX, event.offsetY);
			cxt.stroke();
		});
	});
	$("#myCanvas").on("vmouseup", function(event) {
		cxt.closePath();
		$("#myCanvas").off("vmousemove");
	});
	$("#tools").on("click", ".js_color", function() {
		var _this = $(this);
		//所有对象设背景色为默认值	
		$(".js_color").css({
			"border": "1px solid #fff"
		});
		//当前选中对象背景色修改为选中
		_this.css({
			"border": "1px solid #FF0000"
		});
		cxt.strokeStyle = _this.css("background-color");
	});
});

// 画个长方形 :
//cxt.fillStyle = "#FF0000";
//cxt.fillRect(120, 10, 150, 25);

// 使用画布画线:
//cxt.moveTo(120, 15);
//cxt.lineTo(145, 20);
//cxt.lineWidth = 10;
//cxt.strokeStyle = 'blue';
//cxt.stroke();

// 画空心长方形:
//cxt.lineJoin = 'round';
//cxt.strokeRect(20, 150, 50, 50);

// 使用arc画圆形 :
//cxt.fillStyle = "yellow";
//cxt.beginPath();
//cxt.arc(70, 50, 20, 0, Math.PI2, true);
//cxt.closePath();
//cxt.fill();

// 使用arcTo画圆角 并填充颜色 :
//cxt.moveTo(20, 10);
//cxt.lineTo(90, 10);
//cxt.arcTo(100, 10, 100, 100, 10);
//cxt.lineTo(100, 100);
//cxt.arcTo(100, 110, 90, 110, 10);
//cxt.lineTo(20, 110);
//cxt.arcTo(10, 110, 10, 100, 10);
//cxt.lineTo(10, 20);
//cxt.arcTo(10, 10, 20, 10, 10);
//cxt.stroke();
//cxt.fillStyle = "green";
//cxt.fill();

// 绘制弧形 :
//cxt.fillStyle = "red";
//cxt.strokeStyle = 'blue';
//cxt.beginPath();
//cxt.arc(200, 200, 40, Math.PI * 3 / 2, 0, true);
//cxt.closePath();// 如果不关闭就是开口的弧度 :
//cxt.stroke();
//cxt.fill();

// 绘制三角形 :
//cxt.fillStyle = "yellow";
//cxt.strokeStyle = 'blue';
//cxt.lineWidth = 1;
//cxt.moveTo(10, 400);
//cxt.lineTo(40, 400);
//cxt.lineTo(40, 360);
//cxt.closePath();
//cxt.stroke();
//cxt.fill();
//
//cxt.fillStyle = "yellow";
//cxt.beginPath();
//cxt.arc(200, 200, 40, Math.PI * 3 / 2, 0, true);
//cxt.closePath();
//cxt.stroke();
//cxt.fill();

/**
 * 绘制圆角矩形
 *
 * @param x
 *            矩形的左上角x轴坐标
 * @param y
 *            矩形的左上角y轴坐标
 * @param w
 *            矩形的宽度
 * @param h
 *            矩形的高度
 * @param r
 *            圆角的半径
 * @returns {CanvasRenderingContext2D}
 */
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
	if (w < 2 * r) {
		r = w / 2;
	}
	if (h < 2 * r) {
		r = h / 2;
	}
	this.beginPath();
	this.moveTo(x + r, y);
	// （B圆角） 起点在AB线上 其他三个参数，参数1-B点，参数2-BC线上的点，参数3-半径:
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	return this;
};
/**
 * 绘制直角三角形
 *
 * @param x
 *            三角形起点x轴坐标
 * @param y
 *            三角形起点y轴坐标
 * @param w
 *            三角形的x轴方向的边长
 * @param h
 *            三角形的y轴方向的边长
 * @returns {CanvasRenderingContext2D}
 */
CanvasRenderingContext2D.prototype.triangle = function(x, y, w, h) {
	this.beginPath();
	this.moveTo(x, y);
	this.lineTo(x + w, y);
	this.lineTo(x + w, y + h);
	this.closePath();
	return this;
};

//cxt.roundRect(10, 10, 80, 80, 20).stroke();
//cxt.triangle(100, 10, 30, 20).stroke();

CanvasRenderingContext2D.prototype.triangle1 = function(x, y, a, α, β, b) {
	this.beginPath();
	this.moveTo(x, y);
	var y1 = b * Math.sin(Math.PI * (90 - α - β) / 180) + y;
	var x1 = b * Math.cos(Math.PI * (90 - α - β) / 180) + x;
	var y2 = a * Math.sin(Math.PI * (90 - α) / 180) + y;
	var x2 = a * Math.cos(Math.PI * (90 - α) / 180) + x;
	console.log("triangle1----BBB-(" + x1 + "," + y1 + ")---CC-(" + x2 + "," + y2 + ")");
	this.lineTo(x1, y1);
	this.lineTo(x2, y2);
	this.closePath();
	return this;
};
//cxt.triangle1(100, 100, 40, 0, 120, 60).stroke();
CanvasRenderingContext2D.prototype.triangle2 = function(x, y, a, α, b) {
	this.beginPath();
	this.moveTo(x, y);
	var x1 = b * Math.sin(Math.PI * α / 180) + x;
	var y1 = b * Math.cos(Math.PI * α / 180) + y;
	var x2 = x;
	var y2 = a + y;
	console.log("triangle2---BBB-(" + x1 + "," + y1 + ")---CC-(" + x2 + "," + y2 + ")");
	this.lineTo(x1, y1);
	this.lineTo(x2, y2);
	this.closePath();
	return this;
};

//cxt.beginPath();
//cxt.fillStyle = "yellow";
//cxt.fillRect(0, 0, 800, 800);
//
//cxt.fill();
//cxt.triangle2(100, 100, 40, 30, 60).stroke();
//cxt.closePath();
//cxt.rotate(45 * Math.PI / 180);