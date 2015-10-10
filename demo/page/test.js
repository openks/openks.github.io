 /**
 * Created by c_zhuyangxing on 2015/8/10.
 */
// $(function(){
//     $("div").on("click",function(){
//         console.log(this);
//     })
// })

$(function() {
    $("#bt1").on("click", function(e) {
        $("#d1").animate({
            width: 0
        }, 1000);
        $("#d2").animate({
            width: "100%"
        }, 1000);
    });
    $("#bt2").on("click", function(e) {
        $("#d2").animate({
            width: 0
        }, 1000);
        $("#d1").animate({
            width: "100%"
        }, 1000);
    });
    $("#bt3").on("click", function(e) {
        $("#d1").animate({
            width: 0
        }, 1000);
        $("#d3").animate({
            width: "100%"
        }, 1000);
    });
    $("#bt4").on("click", function(e) {
        $("#d3").animate({
            width: 0
        }, 1000);
        $("#d1").animate({
            width: "100%"
        }, 1000);
    });
    $("#showPage1").on("click", function() {
        $(".page").css({"display": "none"});
        $("#page1").css({"display": "block"});
    });
    $("#showPage2").on("click", function() {
        $(".page").css({"display": "none"});
        $("#page2").css({"display": "block"});
    });
    $("#showPage3").on("click", function() {
        $(".page").css({"display": "none"});
        $("#page3").css({"display": "block"});
    })
    $(".page").on("click",function(){
    	alert(this.innerHTML);
    })
});
