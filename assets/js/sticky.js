document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar'); // 获取sidebar元素
  
    // 检查sidebar是否存在
    if (sidebar) {
      const sidebarPosition = sidebar.offsetTop; // 获取sidebar距离顶部的初始位置
  
      // 监听滚动事件
      window.addEventListener('scroll', function() {
        // 获取当前滚动位置
        const scrollPosition = window.scrollY;
  
        // 如果页面滚动超过sidebar初始位置
        if (scrollPosition > sidebarPosition) {
          // 将sidebar固定在屏幕的相对位置
          sidebar.style.position = 'fixed';
          sidebar.style.top = '0';
        } else {
          // 恢复到原本的位置
          sidebar.style.position = 'absolute';
          sidebar.style.top = `${sidebarPosition}px`;
        }
      });
    }
  });