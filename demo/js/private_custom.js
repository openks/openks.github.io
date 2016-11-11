/**
 * Created by Administrator on 2016/11/11.
 */

function init_inp_time() {
    $(".inp_time").on("focus", function() {
        $(".result_wrapper").addClass("hide");
        $(this).next().removeClass("hide");
    });
    $(document).on("click", ":not(.time_sel)", function(e) {
        e.stopPropagation();
        if ($(e.currentTarget).parents(".time_sel").length < 1) {
            $(".result_wrapper").addClass("hide");
        }
    });
    $(".result_left").on("click", ".up", function() {
        var hour = $(this).parent().find(".result_hour");
        var tmp = (parseInt(hour.val()) + 1) % 13;
        tmp = tmp == 0 ? 1 : tmp;
        hour.val(tmp);
        var time = $(this).parents(".time_sel").find(".inp_time");
        var n = time.val().split(":");
        n.shift();
        n.unshift(tmp);
        time.val(n.join(":"));
    });
    $(".result_left").on("click", ".down", function() {
        var hour = $(this).parent().find(".result_hour");
        var tmp = (parseInt(hour.val()) - 1) % 12;
        tmp = tmp == 0 ? 12 : tmp;
        hour.val(tmp);
        var time = $(this).parents(".time_sel").find(".inp_time");
        var n = time.val().split(":");
        n.shift();
        n.unshift(tmp);
        time.val(n.join(":"));
    });
    $(".result_right").on("click", ".up", function() {
        var mininute = $(this).parent().find(".result_mininute");
        var tmp = (parseInt(mininute.val()) + 10) % 60;
        // tmp = tmp == 0 ? 1 : tmp;
        tmp = tmp < 10 ? "0" + tmp : tmp;
        mininute.val(tmp);
        var time = $(this).parents(".time_sel").find(".inp_time");
        var n = time.val().split(":");
        n.pop();
        n.push(tmp);
        time.val(n.join(":"));
    });
    $(".result_right").on("click", ".down", function() {
        var mininute = $(this).parent().find(".result_mininute");
        var tmp = (parseInt(mininute.val()) + 50) % 60;
        tmp = tmp < 10 ? "0" + tmp : tmp;
        mininute.val(tmp);
        var time = $(this).parents(".time_sel").find(".inp_time");
        var n = time.val().split(":");
        n.pop();
        n.push(tmp);
        time.val(n.join(":"));
    });
}

function init_inp_sel() {
    $(".inp_sel").on("mouseenter",".resut_item",function () {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
    });
    $(".inp_sel").on("mousedown", ".resut_item", function () {
        $(this).parents(".inp_sel").find("input").val($(this).text());
    });
    $(".inp_tt").on("focus", function () {
        $(this).next().removeClass("hide");
    });
    $(".sel_tt").on("focus", function () {
        $(this).next().removeClass("hide");
    });
    $(".inp_tt, .sel_tt").on("blur", function () {
        $(this).next().addClass("hide");
    });
}

$(function(){
    init_inp_time();
    init_inp_sel();
})