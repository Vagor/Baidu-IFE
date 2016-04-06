(function() {
  var btnLeftin = document.getElementById('leftin');
  var btnRightin = document.getElementById('rightin');
  var btnLeftout = document.getElementById('leftout');
  var btnRightout = document.getElementById('rightout');
  var num = document.getElementById('num');
  var displayBox = document.getElementById('displayBox');
  var btnVisualize = document.getElementById('visualize');
  var btnSort = document.getElementById('sort');

  function leftin() {
    if (displayBox.children.length >= 60) {
      alert("不能超过60个元素");
      return 0;
    }
    if (num.value < 10 || num.value > 100) {
      num.value = null;
      alert("只能输入10～100之间的数字");
      return 0;
    }
    var box = document.createElement("div");
    box.innerHTML = num.value;
    box.classList.add('display-box-item');
    displayBox.insertBefore(box, displayBox.firstChild);
  }

  function rightin() {
    if (displayBox.children.length >= 60) {
      alert("不能超过60个元素");
      return 0;
    }
    if (num.value < 10 || num.value > 100) {
      num.value = null;
      alert("只能输入10～100之间的数字");
      return 0;
    }
    var box = document.createElement("div");
    box.innerHTML = num.value;
    box.classList.add('display-box-item');
    displayBox.appendChild(box);
  }

  function leftout() {
    if (displayBox.children.length == 0) {
      alert("已经没有元素了");
      return 0;
    }
    if (displayBox.lastChild.nodeName == "#text") {
      displayBox.removeChild(displayBox.firstChild);
      displayBox.removeChild(displayBox.firstChild);
    } else {
      displayBox.removeChild(displayBox.firstChild);
    }
  }

  function rightout() {
    if (displayBox.children.length == 0) {
      alert("已经没有元素了");
      return 0;
    }
    if (displayBox.lastChild.nodeName == "#text") {
      displayBox.removeChild(displayBox.lastChild);
      displayBox.removeChild(displayBox.lastChild);
    } else {
      displayBox.removeChild(displayBox.lastChild);
    }
  }

  function visualize() {
    for (var i = 0; i < displayBox.children.length; i++) {
      displayBox.children[i].style.height = 3 * displayBox.children[i].innerHTML + 'px';
    }
  }

  function sort() {
    var arr = new Array();
    var temp;
    for (var i = 0; i < displayBox.children.length; i++) {
      for (var j = 0; j < (displayBox.children.length - i - 1); j++) {
        if (displayBox.children[j].innerHTML < displayBox.children[j + 1].innerHTML) {
          temp = displayBox.children[j + 1];
          displayBox.replaceChild(displayBox.children[j], displayBox.children[j + 1]);
          displayBox.insertBefore(temp, displayBox.children[j]);
        }
      }
    }
  }

  btnLeftin.onclick = leftin;
  btnRightin.onclick = rightin;
  btnLeftout.onclick = leftout;
  btnRightout.onclick = rightout;
  btnVisualize.onclick = visualize;
  btnSort.onclick = sort;
})()
