$(function() {
	$("#search").on("click", searchClick);
	$("#clear").on("click", clearClick);
	$(".wrapper-inner").on("click", wrapperInnerClick);
	$(".wrapper").on("click", wrapperClick);
	$("#testLink").on("click", function(e) {
		e.preventDefault();
		alert("看看，不会跳转了吧！");
	})
});

function searchClick(e) {
	console.log("search button clicked!");
	$(".tips").append("<p>search button clicked!</p>");
};

function clearClick(e) {
	e.stopPropagation();
	$(".tips").empty();
};

function wrapperInnerClick(e) {
	$(".tips").append("<p>wrapper-inner clicked!</p>");
};

function wrapperClick(e) {
	$(".tips").append("<p>wrapper clicked!</p>");
}
