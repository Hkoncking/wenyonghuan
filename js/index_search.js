// $(function() {

//     $('.search > input').on('input', function() {

//         const value = $(this).val().trim()
//         if(!value) return
//         console.log(value)
//         const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
//         const script = $(`<script src=${url} id="spt"></script>`)
//         $('body').append(script)
//         $('#spt').remove()
        
//         function bindHtml(res) {
//             console.log(res)
//         }
//     })
// })
const ul = document.querySelector('#search')
const inp = document.querySelector('.search > input')
inp.addEventListener('input', function () {
    const value = this.value.trim()
    if (!value) {
        ul.classList.remove('active')
        return
    }
    const script = document.createElement('script')
    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`

    script.src = url
    document.body.appendChild(script)
    script.remove()
})
function bindHtml(res) {
    // console.log(res)
    if (!res.g) {
        ul.classList.remove('active')
        return
    }

    //渲染页面
    let str = ''
    for(let i = 0; i < res.g.length; i++) {
        str +=`
            <li>${res.g[i].q}</li>
        `
    }
    ul.innerHTML = str
    ul.classList.add('active')
}