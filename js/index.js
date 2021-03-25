$(function () {
    //1、监听轮播图；大屏设置背景图片，小屏幕设置
    $(window).on('resize', function () {
        //窗口宽度
        var clientW = $(window).width();
        //设置临界点
        var isShowBig = clientW >= 900;
        //获取所有dom
        var $allItem = $("#lk-dot .carousel-item");

        //遍历
        $allItem.each(function (index, item) {
            var src = isShowBig ? $(item).data('lg-img') : $(item).data('sm-img')//获取自定义属性


            if (!isShowBig) {//大屏
                var imgDom = `<img src='${src}'>`;
                $(item).empty().append(imgDom);//清空然后追加
            } else { //小屏
                $(item).empty();
                //设置div  背景
                $(item).css({
                    backgroundImage: `url(${src})`
                })
            }
        })
    })

    // 2. 工具提示
    $('[data-toggle="tooltip"]').tooltip();

    // 3、添加轮播图滑动
    let startX = 0, endX = 0;
    let $carousel = $('#il_banner'); //轮播图的jquery对象
    let carousel = $('#il_banner')[0]; //轮播图的js对象
    carousel.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].clientX;
    })

    carousel.addEventListener('touchend', function (e) {
        endX = e.targetTouches[0].clientX;
        if (endX - startX > 0) {
            // 上一张
            $carousel.carousel('prev');
        } else if (endX - startX < 0) {
            // 下一张
            $carousel.carousel('next');
        }
    })

    // 4、 动态处理宽度
    $(window).on("resize", function () {
        let $ul = $("#il_center .nav");
        let $allLis = $("[role='presentation']", $ul);   //在ul里边寻找属性选择器
        // console.log($allLis);

        // 3.1 遍历
        let totalW = 0;
        $allLis.each(function (index, item) {
            totalW += $(item).width();
        });

        // console.log(totalW);

        let parentW = $ul.parent().width();//父div的宽度
        // console.log(parentW,totalW)
        // 3.2 设置宽度
        if (totalW > parentW) {
            $ul.css({
                width: totalW + "px"
            })
        } else {
            $ul.removeAttr("style"); //移除
        }
    });

    $(window).trigger('resize');//立即触发
})