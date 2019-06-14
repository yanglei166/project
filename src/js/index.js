var slideIndex = 0;
	showSlides();
	function showSlides() {
	    var i;
	    var slides = document.getElementsByClassName("mySlides");
	    var dots = document.getElementsByClassName("dot");
	    for (i = 0; i < slides.length; i++) {
	       slides[i].style.display = "none";  
	    }
	    slideIndex++;
	    if (slideIndex > slides.length) {slideIndex = 1}    
	    for (i = 0; i < dots.length; i++) {
	        dots[i].className = dots[i].className.replace(" active", "");
	    }
	    slides[slideIndex-1].style.display = "block";  
	    dots[slideIndex-1].className += " active";
	    setTimeout(showSlides, 2000); // 切换时间为 2 秒
	}
  
  let input = document.querySelector('#tx');
  function addScript(url) {
      let script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.src = url;
      document.body.appendChild(script);
  }
  input.onkeyup = function (e) {
      let val = this.value;
      addScript('http://suggestion.baidu.com/su?wd=' + val + '&cb=show');
  }
  function show(result) {
      // console.log(result.s);
      let arr = result.s;
      let listWrap = document.querySelector('.list-wrap');
      let container = document.querySelector('.container');
      let domStr = '';
      for (let i = 0; i < arr.length; i++) {
          domStr += '<li class="list">' + arr[i] + '</li>';
      }
      listWrap.innerHTML = domStr;
      let list = document.querySelectorAll('.list');

      listWrap.addEventListener('click', function (e) {
          let xhr = new XMLHttpRequest();
          let url = 'http://www.baidu.com/s?wd='
          if (e.target.tagName.toUpperCase() == 'LI') {
              input.value = e.target.textContent;
              this.innerHTML = null;
          }
          addScript(url + input.value);  
          let scrConts = Array.from(document.querySelectorAll('script'));
          let s = scrConts.filter(item => {
              return /http\:\/\/suggestion\.baidu\.com/.test(item.src);
          });
          for (let i = 0; i < s.length; i++) {
              document.body.removeChild(s[i]); 
          }
      }, false);

  }
  
  



require(['require.config'], () => {
  require(['url', 'template', "swiper", 'header','footer'], (url, template, Swiper) => {
    // 首页逻辑
    // class Index {
    //   constructor () {
    //     this.init();
    //   }
    //   init () {
    //     // header功能
    //     header.load().then(() => {
    //       header.search();
    //       // 等到异步返回之后才能访问header的DOM结构
    //       this.cart();
    //     })
    //   }
    //   cart () {
    //     console.log($("#car-num"));
    //   }
    // }

    class Index {
      constructor () {
        this.bindEvents();
        this.getType();
        this.banner();

      }


	
      // 绑定头部登录事件（示例）
      bindEvents () {
        // 由于login-btn是通过header模块的异步加载得到的，所以在这里同步代码获取不到，使用时间委托
        $("#header-container").on('click', "#login-btn", () => {
          console.log(123);
        })
      }
			
		
      // 获取分类数据
      getType () {
        // ajax请求数据
        $.get( url.rapBaseUrl + 'index/type', data => {
          if(data.res_code === 1) {
            this.renderType(data.res_body.list);
          }
        })
      }

      renderType (list) {
        console.log(template);
        let html = template("list-monopoly", { list });
        $("#list-container").html(html);
        
      }

    }

new Index()

    
    
  })
})

 