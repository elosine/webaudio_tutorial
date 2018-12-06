var mspad = document.getElementById("mspad");

mspad.addEventListener('mousedown', mousemove);


function mousemove() {
  mspad.onmousemove = function(e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    console.log(x + ' ' + y);
  }
}
