$(function() {

    let info = null
    const id = getCookie('goods_id')
    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('../php/getGoodsInfo.php', { goods_id: id }, null, 'json')

        info = goodsInfo.info
        console.log(info)
        bindHtml(info)
    }

    // 渲染商品详情页面
    function bindHtml(info) {

        $('.detail_nav').html(`
            <p>${ info.cat_one_id }</p><b>></b>
            <span>${ info.cat_two_id }</span><b>></b>
            <span>${ info.cat_three_id }</span><b>></b>
        `)
        // 渲染放大镜
        $('.magnifier').html(`
            <div class="show">
                <img src="${ info.goods_big_logo }" data-url="${ info.goods_big_logo }" alt="">
                <div class="move_box"></div>
            </div>
            <div class="img_list">
                <p class="active"><img src="${ info.goods_small_logo }" alt=""></p>
            </div>
            <div class="enlarge">
                
            </div>
        `)

        //渲染商品信息

        $('.information').html(`
            <p class="info_intro">${ info.goods_name }</p>
            <p class="info_price">
                ￥ <span>${ info.goods_price }</span>
            </p>
            <div class="togglenum">
                <p>购买数量:</p>
                <button class="subNum">-</button><input class="cartNum" type="text" value="1"><button class="addNum">+</button>
            </div>
            <div class="last_pay">
                <button class="addCart">加入购物车</button>
                <button class="going">继续去购物</button>
                <button class="gocar">前往购物车</button>
            </div>
        `)
    }
    // console.log(1)

    //放大镜功能
    const show_width = parseInt($('.magnifier').find('.show').css('width'))
    const show_height = parseInt($('.magnifier').find('.show').css('height'))
    // console.log(show_width,show_height)
    const move_width = parseInt($('.magnifier').find('.show').find('.move_box').css('width'))
    const move_height = parseInt($('.magnifier').find('.show').find('.move_box').css('height'))
    const width = (move_width / show_width) * 800 
    const height = (move_height / show_height) * 800 
    // console.log(width, height)
    //移入移出
    $('.magnifier').find('.enlarge').css({'width':`${width}px`,'height':`${height}px`})
    $('.magnifier').on('mouseenter', '.show', function(e) {
        const url = $('.magnifier').find('.show').find('img').data('url')
        // console.log(url)
        $('.magnifier').find('.show').find('.move_box').addClass('active')
        $('.magnifier').find('.enlarge').addClass('active').css({'background-image':`url(${url})`, 'background-repeat': 'no-repeat','background-position': '0px 0px'})

    })
    
    //鼠标移动
    $('.magnifier').on('mousemove', '.show', function(e) {

        const positionX = e.pageX-$(this).offset().left
        const positionY = e.pageY-$(this).offset().top
        let x = positionX - move_width / 2
        let y = positionY - move_height / 2
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= show_width - move_width) x = show_width - move_width
        if (y >= show_height - move_height) y = show_height - move_height
        // console.log(x,y)
        $('.magnifier').find('.show').find('.move_box').css({'left':`${x}px`,'top':`${y}px`})
        const bg_x = width * x / move_width
        const bg_y = height * y / move_height
        $('.magnifier').find('.enlarge').addClass('active').css('background-position',`-${ bg_x }px -${ bg_y }px`)
    })
    //鼠标移出
    $('.magnifier').on('mouseleave', '.show', function() {
        $('.magnifier').find('.show').find('.move_box').removeClass('active')
        $('.magnifier').find('.enlarge').removeClass('active')
    })

    // 4. 加入购物车的操作
  $('.information').on('click', '.last_pay > .addCart', function () {
    // console.log(1)
 
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    const flag = cart.some(item => item.goods_id === id)
 
    if (flag) {
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
   
      cart.push(info)
    }
    
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

   // 5. ++ -- 的事件
   $('.information')
    .on('click', '.subNum', function () {
     
     let num = $('.cartNum').val() - 0
    
     if (num === 1) return
     
     $('.cartNum').val(num - 1)
   })
   .on('click', '.addNum', function () {

     let num = $('.cartNum').val() - 0
     $('.cartNum').val(num + 1)
   })
   .on('click', '.going', function () {
    window.location.href = '../pages/index.html'
   })
   .on('click', '.gocar', function () {
    window.location.href = '../pages/car.html'
   })
})
