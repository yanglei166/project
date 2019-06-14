require(['require.config'], () => {
  require(['url', 'header','footer'], (url) => {
    class Register {
      constructor () {
        this.usernameInput = $("#username");
        this.passwordInput = $("#password");
        this.btn = $("#submit");
        this.bindEvents();
      }

      bindEvents () {
        this.btn.on("click", () => {
          // 取用户名和密码提交后台
          let username = this.usernameInput.val(), 
              password = this.passwordInput.val();
          $.ajax({
            url: url.phpBaseUrl + "http://localhost:80/b.php",
            type: "post",
            data: {username, password},
            success: data => {
              if(data.res_code === 1) {
                alert(data.res_message+", 即将跳转登录页");
                location.href='login.html';
              }
            },
            dataType: 'json'
          })
          
        })
      }
    }
    new Register();
  })
})
