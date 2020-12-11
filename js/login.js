//登录验证
$().ready(function () {

    //切换登录注册表单
    $('.tabs').on('click', 'span', function () { 
        // console.log(this)
        const text = $(this).text()
        // console.log(text)
        $(this).addClass('active').siblings().removeClass('active')
        if (text == '登录') {
            $('.tabs_login').css('display', 'block')
            $('.tabs_register').css('display', 'none')
        }
        if (text == '注册') {
            $('.tabs_login').css('display', 'none')
            $('.tabs_register').css('display', 'block')
        }
    })

    //登录表单验证
   
    $('.login input').on('input', function() {
        //   console.log(value.length)
        $('.tabs_login > span').css('display', 'none')

        const value = this.value
        if(this.name == 'username') {
            if(value.length == 0) {
                // console.log(this)
                $(this).next().css('display','block')
            } else if(value.length < 5) {
                $(this).next().text('账号不能小于5个字符').css('display','block')
            } else if (value.length > 16) {
                $(this).next().text('账号不能大于16个字符').css('display','block')
            }else {
                $(this).next().css('display','none')
            }
           
        }
        if(this.name == 'password') {
            if(value.length == 0) {
                console.log(this)
                $(this).next().css('display','block')
            } else if(value.length < 5) {
                $(this).next().text('密码不能小于5个字符').css('display','block')
            } else if (value.length > 16) {
                $(this).next().text('密码不能大于16个字符').css('display','block')
            }else {
                $(this).next().css('display','none')
            }
           
        }
    })
    //登录事件
    $('.disabled').click(function() {
        const username = $('#login input[name=username]').val()
        const password = $('#login input[name=password]').val()
        // 判断账号密码格式内容
        if (!username || !password) {
            $('.signin').prev().text(' ')
            $('.signin').prev().css('display', 'block').text('账号或密码不能为空')
            return
        }
        if (username && password) {
            const user_span = $('#login input[name=username]').next().css('display')
            const pass_span = $('#login input[name=password]').next().css('display')
            if(user_span != 'none' || pass_span != 'none') {
                $('.signin').prev().text(' ')
                $('.signin').prev().css('display', 'block').text('请输入正确格式的账号或密码')
                
                return
            }
            // 账号密码格式正确获取数据
            if(user_span == 'none' && pass_span == 'none'){
                const info = {username: username, password: password}
                $.post('../php/login.php', info, null, 'json').then(res => {

                    // console.log(res)
                    if (res.code == 0){
                        $('.signin').prev().text(' ')
                        $('.signin').prev().css('display', 'block').text('*用户名或密码错误')
                    } else if (res.code == 1) {
                        setCookie('nikename', res.nikename, 60 * 60 * 24 * 6)
                        window.location.href = '../pages/index.html'
                    }

                })
            }
        }
    })

    //注册表单事件

    $('.login input').on('input', function() {
        //   console.log(value.length)
        $('.tabs_register > span').css('display', 'none')

        const value = this.value
        if(this.name == 'username') {
            if(value.length == 0) {
                // console.log(this)
                $(this).next().css('display','block')
            } else if(value.length < 5) {
                $(this).next().text('账号不能小于5个字符').css('display','block')
            } else if (value.length > 16) {
                $(this).next().text('账号不能大于16个字符').css('display','block')
            }else {
                $(this).next().css('display','none')
            }
           
        }
        if(this.name == 'password') {
            if(value.length == 0) {
                console.log(this)
                $(this).next().css('display','block')
            } else if(value.length < 5) {
                $(this).next().text('密码不能小于5个字符').css('display','block')
            } else if (value.length > 16) {
                $(this).next().text('密码不能大于16个字符').css('display','block')
            }else {
                $(this).next().css('display','none')
            }
           
        }
        if(this.name == 'repassword') {
            const repassword = $('.re_password > input[name=password]').val()
            // console.log(repassword)
            if(value != repassword) {
                $(this).next().css('display','block')
                // return
            }else {
                $(this).next().css('display','none')
            }
        }
    })

    //注册事件
    
    $('.re_btn').click(function() {
        const orpassword = $('.re_password > input[name=password]').val()
        const repassword = $('.password_repeat > input[name=repassword]').val()
        // console.log(orpassword)
        // console.log(repassword)
        if(orpassword != repassword) {
            $('.password_repeat > input[name=repassword]').next().css('display','block')
            // console.log($('.password_repeat > input[name=repassword]'))
            return
        }else {
            $('.password_repeat > input[name=repassword]').next().css('display','none')
        }
        // console.log(1)
        const nikename = $('#register input[name=nikename]').val()
        const username = $('#register input[name=username]').val()
        const password = $('#register input[name=password]').val()
        // 判断账号密码格式内容
        if (!username || !password) {
            $('.signup').prev().text(' ')

            $('.signup').prev().css('display', 'block').text('账号或密码不能为空')
            return
        }
        if (username && password) {
            const user_span = $('#register input[name=username]').next().css('display')
            const pass_span = $('#register input[name=password]').next().css('display')
            const re_span = $('#register input[name=repassword]').next().css('display')
            if(user_span != 'none' || pass_span != 'none' || re_span != 'none') {
                $('.signup').prev().text(' ')
                $('.signup').prev().css('display', 'block').text('请输入正确格式的账号或密码')
                return
            }
            console.log(user_span)
            console.log(pass_span)
            console.log(re_span)

            // 账号密码格式正确获取数据
            if(user_span == 'none' && pass_span == 'none' && re_span == 'none'){
                console.log(1)
                const info = {username: username, password: password, nikename: nikename}
                console.log(info)
                $.post('../php/register.php', info, null, 'json').then(res => {
                    console.log(res)
                    if(res.code == 1){
                        alert('注册成功')
                        location.reload()
                    }
                    if(res.code == 0){
                        $('.signup').prev().css('display', 'block').text(res.message)
                    }
                })
            }
        }
    })

})