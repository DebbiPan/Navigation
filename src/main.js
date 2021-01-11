const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')//获取localString中的x
const xObject = JSON.parse(x)//将x转化成对象
const hasMap =xObject || [
    { logo:'G',url:'https://github.com/'},
    { logo:'W',url:'https://wangdoc.com/html/'},
    { logo:'W',url:'https://www.zhangxinxu.com'}
]//parcel默认在代码外面加上作用于，若要变成全局变量就要用window
const simplifyUrl = (url)=>{
    return url.replace('https://','')
              .replace('http://','')
              .replace('www.','')
              .replace(/\/.*/,'')
}
const render = () =>{
    $siteList.find('li:not(.last)').remove()
        hasMap.forEach((node,index) =>{
            const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">×</div>
                </div>
            </li>`).insertBefore($lastLi)
            $li.on('click',()=>{
                window.open(node.url)
            })
            $li.on('click','.close',(e)=>{
                e.stopPropagation()//阻止冒泡
                hasMap.splice(index,1)//删除
                render()//重新渲染
            })
        });//渲染哈希
}

render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        console.log(url)
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url);
        hasMap.push({
            logo:simplifyUrl(url)[0],
            url:url
        });
    render()
})

window.onbeforeunload = () =>{
    const string = JSON.stringify(hasMap)//将hasMap的数据变成string
    localStorage.setItem('x',string)//将string存在x里面
}

$(document).on('keypress',(e) => {
    const {key} = e //const {key} = e.key可简写
    for (let i=0;i<hasMap.length;i++){
        if(hasMap[i].logo.toLowerCase()===key){
            window.open(hasMap[i].url)
        }
    }
})