$(function () {


    const nikename = getCookie('nikename')

    if (nikename) {
        $('.login .ul_lf li:nth-of-type(2) a:nth-of-type(1)').text(nikename)
    } else {
        $('.login .ul_lf li:nth-of-type(2) a:nth-of-type(1)').text('请登录')
    }

    $('.module > .center > ul > li').mouseenter(function() {
        $(this).stop().animate({width:400}).siblings().animate({width:202})
        $(this).find('.go').addClass('active').parent().siblings().find('.go').removeClass('active')
    })
    $('.module > .center > ul').mouseleave(function() {
        $(this).find('li').stop().animate({width:242}).find('.go').removeClass('active')
    })

    $('.writer_tabs > ul > li').mouseenter(function() {
        $(this).addClass('active').siblings().removeClass('active')
        const index = $(this).index()
        // console.log(index)
        // console.log($('.writer_tabs > span').css('left'))
        $('.writer_tabs > span').css('left', `${100*$(this).index()}px`)
    })


    //banner区域分类列表
    let list = null
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        
    }
    //请求一级分类列表
    getCateOne()
    async function getCateOne() { 
        const cat_one_list = await $.get('../php/getOne.php', null, null, 'josn')
         
    }



})