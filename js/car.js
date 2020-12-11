$(function(){

    const nikename = getCookie('nikename')

    const cart = JSON.parse(window.localStorage.getItem('cart'))

    
    if(!cart.length){
        $('.all_boss').removeClass('hide')
        return
    }

    $('.all_boss').addClass('hide')

    bindHtml()

    function bindHtml() {

        let total = 0
        let totalMoney = 0
        cart.forEach(item => {
            total += item.cart_number - 0
            // console.log(item.cart_number)
            totalMoney+=(item.cart_number * item.goods_price).toFixed(2) - 0

            // console.log(totalMoney)
            setCookie('total',JSON.parse(total))
        })
        console.log(cart)

        let str =''

        let oll = 0
        cart.forEach(item => {
            let op = 0

            op = (item.goods_price * item.cart_number).toFixed(2)

            oll+=op

            str+=`
            <li>
            <div class="p-info">
                <img src="${ item.goods_small_logo }" alt="">
                <p>${ item.goods_name }</p>
            </div>
            <ul class="ul_Box">
                <li>￥${ item.goods_price }</li>
                <li>
                    <button class="subNum" data-id="${ item.goods_id }">-</button>
                    <input type="text" value="${ item.cart_number }" >
                 <button class="addNum" data-id="${ item.goods_id }">+</button>
                </li>
                <li>15</li>
                <li>￥${ op }</li>
                <li>
                    <p class="removeNum" data-id="${ item.goods_id }">
                        移除
                    </p>
                </li>
            </ul>
            </li>
            `
        
        $('.cart_main > ul').html(str)

        })
        
        let opp = ''

        opp+=`
            <p>总金额:
                <span>
                   ￥${ totalMoney }
                </span>
            </p>
        `

        $('.order_gift').html(opp)
    }

    $('.cart_main > ul').on('click' , '.removeNum' , function () {

        const id = $(this).data('id')

        // console.log(id)
        for(var i = 0; i < cart.length; i++){
            if(cart[i].goods_id == id){
                cart.splice(i,1)
                break
            }
        }
        bindHtml()
        
        window.localStorage.setItem('cart',JSON.stringify(cart))

        if(!cart.length) return window.location.reload()
    })

    $('.cart_main > ul').on('click' , '.addNum' , function () {

        const id = $(this).data('id')

        const flay = cart.filter(item => item.goods_id == id)[0]

        flay.cart_number = flay.cart_number - 0 + 1

        bindHtml()

        window.localStorage.setItem('cart',JSON.stringify(cart))
    })

    $('.cart_main > ul').on('click' , '.subNum' , function () {

        const id = $(this).data('id')

        // console.log(id)
        const flay = cart.filter(item => item.goods_id == id)[0]

        if(flay.cart_number === 1) return

        flay.cart_number = flay.cart_number - 0 - 1
        
        bindHtml()
        
        window.localStorage.setItem('cart',JSON.stringify(cart))

    })

    $('.cart_main').on('click','.leftBox' ,  function () {
        
        console.log(123)
        const a  = cart.length
    //   const a =  cart.firstElementChild()
        // console.log(a)
        cart.splice(0,a)
        
        bindHtml()


        window.localStorage.setItem('cart',JSON.stringify(cart))
        window.location.reload()
        
    })

    // $('.cart_main').on('click','')





})