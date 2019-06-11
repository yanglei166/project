
define(['jquery'], () => {
    class Footer {
      constructor () {
        this.container = $("#footer-container")
        this.load().then(() => {
          // 操作header里面的DOM
          this.search()
        })
      }
  
      load () {
        return new Promise(resolve => {
          // 由于header模块要在不同的页面使用，所以路径一定是绝对路径 /html/....
          this.container.load('/html/module/footer.html', () => {
            // 异步加载完成
            resolve()
          })
        })
      }
  
      search () {
  
      }
    }
  
    return new Footer()
  })
