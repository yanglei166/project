

require(['require.config'], () => {
  require(['url','template', 'header','footer', "zoom", "fly"], (url, template, header) => {
    class Detail {
      constructor () {
        this.init();
        // $ 构造函数
        // zoom在$原型（prototype上新增了一个elevateZoom方法）
        // $("div") 就是$的实例，所以就能访问elevateZoom方法了
        this.addCart();
        this.inputs();
      }
    
  
      init () {
        // 从url取到id， 携带id请求详情数据, 渲染详情页
        let id = Number(location.search.slice(4));
        // this.id = id; // 将来加入购物车等逻辑还需要id
        $.get(url.rapBaseUrl + "detail/get", {id}, res => {
          if(res.res_code === 1) {
            let {data} = res.res_body;
            // data展开成  title: "abc", price:100
            // 再在后面解构赋值增加一个id字段
            // {title: "abc", price:100, id：id}
            data = {...data, id}; // 当接口变成真实接口的时候，这句代码不需要
            // data.id = id;
            // 把当前数据存下来
            this.data = data;
            this.render(data);
          }
        })
      }

  
      render (data) { $("#detail").html(template("detail-template", { data }));this.zoom(); }

      addCart () {
        $("#detail").on('click', '#add-car',  e =>{
          $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px'>`).fly({
            start: { left: e.clientX,top: e.clientY },
            end: { left: $("#car-num").offset().left,top: $("#car-num").offset().top },
            onEnd: function () { this.destroy();  header.calcCartNum(); }
          });

          // 列表页自定义属性，详情页可以不用
          // let id = $(this).attr("data-id");
          // 取到这条id对应的数据
          // 把this.data存在localstorage里

          // 先把cart取出来
          let cart = localStorage.getItem('cart');
          if(cart) {
            cart = JSON.parse(cart);
            // 已经存过购物车了
            // 判断有没有当前商品
            let index = -1;
            if(cart.some((shop, i) => {
              // some找到满足条件的就不会再继续了
              // 所以index的值在最后就等于满足条件的索引
              index = i;
              return shop.id === this.data.id;
            })){
              // 有这条数据
              cart[index].num++;
            }else{
              // 没有这条数据
              cart.push({...this.data, num: 1});
            }

            

          }
          else{cart = [{...this.data, num: 1}];
          }
          // 重新存cart
          localStorage.setItem('cart', JSON.stringify(cart));
        })
      }

      zoom () {
        // 放大镜插件
         $(".zoom-img").elevateZoom({
          gallery:'gal1',
          cursor: 'pointer',
          galleryActiveClass: 'active',
          borderSize:'1',    
          borderColor:'#888' });}
    }
    
 
    new Detail();
    
  })
  
})

