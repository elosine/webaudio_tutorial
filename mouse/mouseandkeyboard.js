var mspad = document.getElementById("mspad");


var mouseDown = 0;


mspad.onmousemove = function(e) {

document.body.onmousedown = function() {
    mouseDown = 1;
  }
  document.body.onmouseup = function() {
    mouseDown = 0;
  }
  if (mouseDown == 1) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    console.log(x + ' ' + y);
  }

}
