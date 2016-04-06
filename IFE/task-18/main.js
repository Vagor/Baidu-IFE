(function() {
  var btnLeftin = document.getElementById('leftin');
  var btnRightin = document.getElementById('rightin');
  var btnLeftout = document.getElementById('leftout');
  var btnRightout = document.getElementById('rightout');
  var num = document.getElementById('num');
  var displayBox = document.getElementById('displayBox');

  function leftin() {
    var box = document.createElement("div");
    box.innerHTML = num.value;
    box.classList.add('display-box-item');
    displayBox.insertBefore(box,displayBox.firstChild);
  }
  function rightin() {
    var box = document.createElement("div");
    box.innerHTML = num.value;
    box.classList.add('display-box-item');
    displayBox.appendChild(box);
  }
  function leftout() {
    displayBox.removeChild(displayBox.firstChild);
  }
  function rightout() {
    displayBox.removeChild(displayBox.lastChild);
  }

  btnLeftin.onclick = leftin;
  btnRightin.onclick = rightin;
  btnLeftout.onclick = leftout;
  btnRightout.onclick = rightout;
})()
