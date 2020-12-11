$(function () {
    
    let list = null

    let list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort_method:'综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 12
    }

    // 请求一级分类
    getCateOne()
    async function getCateOne(){
        const cat_one_list = await $.get('../php/getCateOne.php', null, null, 'json')

        let str = `<li class="active" data-type="all">全部</li>`
        cat_one_list.list.forEach (item => {
            str += `<li data-type="${ item.cat_one_id }">${ item.cat_one_id }</li>`
        })
        $('.catOneBox > .right').html(str)
    }
    // 请求二级分类
    getCateTwo()
    async function getCateTwo() {

        const cat_two_list = await $.get('../php/getCateTwo.php', {cat_one: list_info.cat_one}, null, 'json')

        let str = `<li class="active" data-type="all">全部</li>`
        cat_two_list.list.forEach(item => {
            str +=`<li data-type="${item.cat_two_id}">${item.cat_two_id}</li>`
        });

        $('.catTwoBox > .right').html(str)
    }

    // 请求三级分类
    getCateThree()
    async function getCateThree() {

        const cat_three_list = await $.get('../php/getCateThree.php', {cat_one: list_info.cat_one, cat_two: list_info.cat_two}, null, 'json')

        let str = `<li class="active" data-type="all">全部</li>`
        cat_three_list.list.forEach(item => {
            str +=`<li data-type="${item.cat_three_id}">${item.cat_three_id}</li>`
        });

        $('.catThreeBox > .right').html(str)

    }

    // 请求总页数,渲染分页器
    getTotalPage() 
    async function getTotalPage() {

        const totalInfo = await $.get('../php/getTotalPage.php', list_info, null, 'json')
        // console.log(totalInfo)
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback (index) {
                // console.log(index)
                list_info.current = index.getCurrent()
                getGoodsList()
            }
        })
    }

    // 请求商品列表数据
    getGoodsList()
    async function getGoodsList() {

        const goodslist = await $.get('../php/getGoodsList.php',list_info, null, 'json')
        list = goodslist.list
        let str = ''
        list.forEach (item => {
            str +=`
                <li class="thumbnail" style="cursor: pointer;">
                    <img src="${item.goods_big_logo}" alt="..." data-id="${item.goods_id}">
                    <div class="caption">
                        <h3 data-id="${item.goods_id}">${item.goods_name}</h3>
                        <p class="price">￥ <span class="text-danger">${item.goods_price}</span></p>
                        <p>
                            <a href="javascript:;" class="btn btn-danger" role="button" data-id="${ item.goods_id }">加入购物车</a>
                            <a href="./car.html" class="btn btn-warning" role="button" data-id="${ item.goods_id }">去结算</a>
                        </p>
                    </div>
                </li>
            `
        })
        $('.goodsList > ul').html(str)
    }

    //6.1 一级分类的点击事件
    $('.catOneBox').on('click', 'li', function () {
        // 一级分类列表状态
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')

        list_info.cat_two = 'all'
        list_info.cat_three = 'all'

        list_info.current = 1
        list_info.cat_one = type
        getTotalPage()
        getGoodsList()

        // 三级分类列表状态
        $('.catThreeBox > .right').html('<li data-type="all" class="active">全部</li>')
        // 二级分类列表状态
        if(type == 'all') {
            $('.catTwoBox > .right').html('<li data-type="all" class="active">全部</li>')
        } else {
            getCateTwo()
        }
    })
    // 6.2二级分类列表的点击事件
    
    $('.catTwoBox').on('click', 'li', function () {
        // 二级分类列表的状态
        const type = $(this).data('type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.cat_three = 'all'
        list_info.current = 1
        list_info.cat_two = type
        getTotalPage()
        getGoodsList()
        // 三级分类列表的状态
        if(type == 'all') {
            $('.catThreeBox > .right').html('<li data-type="all" class="active">全部</li>')
        } else {
            getCateThree()
        }
    })

    // 6.3三级分类列表的点击事件
    $('.catThreeBox').on('click', 'li', function () {
        const type = $(this).data('type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.current = 1
        list_info.cat_three = type
        getTotalPage()
        getGoodsList()
    })

     // 7.排序方式的点击事件
     $('.catMethod').on('click', 'li', function() {
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
        $(this).addClass('active').siblings().removeClass('active')
        list_info.sort_method = method
        list_info.sort_type = type
        getTotalPage()
        getGoodsList()
        $(this)
            .attr('data-type', type == 'ASC' ? 'DESC' : 'ASC')
            .siblings()
            .attr('data-type', 'ASC')  
    })


    // 8.点击跳转详情页
    $('.goodsList > ul').on('click', 'img, h3', function () {
        // console.log('点击')
        const id = $(this).data('id')
        setCookie('goods_id', id)
        window.location.href = './detail.html'
    })
    let info = null

    $('.goodsList > ul').on('click', '.btn-danger', function () {
        console.log('点击')
        const id = $(this).data('id')
        setCookie('goods_id', id)
            
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const flag = cart.some(item => item.goods_id === id)
    
        getGoodsInfo()
        async function getGoodsInfo() {
            const goodsInfo = await $.get('../php/getGoodsInfo.php', { goods_id: id }, null, 'json')
    
            info = goodsInfo.info
            console.log(info)
        }
        if (flag) {
        const cart_goods = cart.filter(item => item.goods_id === id)[0]
        cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
        } else {
        info.cart_number = 1
    
        cart.push(info)
        }
        
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })
})