(function() {
  var tag = document.getElementById('tag');
  var displayBox_1 = document.getElementById('displayBox_1');

  //点击标签，删除此标签。
  displayBox_1.addEventListener('click', function(e) {
      displayBox_1.removeChild(e.target);
    })
    //给tag绑定keyup事件
  tag.addEventListener('keyup', function(e) {
    if (e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 186 || e.keyCode == 188 || e.keyCode == 190) {
      if (e.keyCode == 13) {
        tag.value += " ";
      }
      keyUpEvent();
    }
  })

  /**
   *  keyup触发keyUpEvent()函数，传入的参数是输入框的最后一个字符；
   *  1.判断是否是“，。,. 空格 回车”
   *  2.鉴别是否和已添加标签冲突的函数collisionDetective();
   *  3.添加标签函数addTag();
   **/
  function keyUpEvent() {
    if (!collisionDetective()) {
      addTag();
      tag.value = null;
    } else {
      tag.value = null;
    }
  };

  //鉴别是否和已添加标签冲突的函数collisionDetective();
  function collisionDetective() {
    for (var i = 0; i < displayBox_1.children.length; i++) {
      if (displayBox_1.children[i].innerHTML == tag.value.slice(0, -1)) {
        alert("已有相同的标签");
        return true;
      }
    }
    return false;
  }
  //添加标签函数addTag();
  function addTag() {
    var item = document.createElement("div");
    item.classList.add('display-box-item');
    item.innerHTML = tag.value.slice(0, -1);
    displayBox_1.appendChild(item);
  }
  //匹配字符串（str，teststr），如果匹配成功，返回teststr在str中的index；如果匹配失败，返回null

  /**
   *  textarea
   **/
  var textarea = document.getElementById('textarea');
  var displayBox_2 = document.getElementById('displayBox_2');
  var btnAddTag = document.getElementById('btnAddTag');
  //点击标签，删除此标签。
  displayBox_2.addEventListener('click', function(e) {
      displayBox_2.removeChild(e.target);
    })
    //给按钮绑定事件
  btnAddTag.onclick = function() {
    var arrOrigin = splitContent();
    var arrHandled = collisionDetectiveAll(arr);
    addTagAll(arrHandled);
  }

  function splitContent() {
    //先用正则的方式将所有，。空格 回车 全部用,替代
    textarea.value
    //将处理过的字符串用装载到arrHandled并返回。
  }

})()
