$(function() {

    const uls = $('.imgBox > li')
    // console.log(uls.eq(0))
    const ols = $('.pointBox > li')
    // console.log(ols)

    //分页栏点击切换图片
    $('.pointBox > li').on('click', function() {
        // console.log($(this).index())
        const index = $(this).index()
        $(this).addClass('active').siblings().removeClass('active')
            .parent().prev().find('li').eq(index).addClass('active')
            .siblings().removeClass('active')
    })
    //左右切换图片
    //index当前展示图片的索引
    let index = $('.pointBox').find('li.active').index()

    $('.leftRightBox > div').on('click', function() {
        const classname = $(this).attr('class')
        // console.log(index)
        // console.log(classname)
        if(classname == 'left') {
            index -= 1
            if(index < 0) index = 4
            $('.pointBox > li').eq(index).addClass('active').siblings().removeClass('active')
            $('.imgBox > li').eq(index).addClass('active').siblings().removeClass('active')
        }
        if(classname == 'right') {
            index += 1
            if(index > 4) index = 0
            $('.pointBox > li').eq(index).addClass('active').siblings().removeClass('active')
            $('.imgBox > li').eq(index).addClass('active').siblings().removeClass('active')
        }
    })

    //自动轮播
    var time = setInterval(move, 2000)
    function move() {
        // console.log(index)
        index ++
        if(index > 4) index = 0
        $('.pointBox > li').eq(index).addClass('active').siblings().removeClass('active')
            $('.imgBox > li').eq(index).addClass('active').siblings().removeClass('active')
    }

    $('.banner').mouseover(function () { 
        clearInterval(time)
    })
    $('.banner').mouseleave(function () { 
        time = setInterval(move, 2000)
    })

})