var page = require('webpage').create();

page.viewportSize = { width: 1920, height: 1080 };
page.open("http://localhost:8000", function start(status) {
  window.setTimeout(function () {
      page.render('example.jpeg', {format: 'jpeg', quality: '100'});
      phantom.exit();
  }, 0);
});
