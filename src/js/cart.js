
require(['require.config'], () => {
  require(['template', 'header','footer'], (template) => {
    class Cart {
      constructor () {
        this.init();
      }

      init () {
        let cart = localStorage.getItem('cart');
        if(cart) {
          // 渲染列表
          cart = JSON.parse(cart);
          this.render(cart);
        }else{
          // 提示购物车为空
          alert('购物车为空，你太穷了');
        }
      }

      render (cart) {
        // template('cart-template', {list: cart})
        $("#list-container").html(template('cart-template', {cart}));
      }
    }
    new Cart();
  })
})