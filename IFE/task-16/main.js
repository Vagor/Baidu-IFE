init();

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {
    "北京": 90,
    "上海": 40
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById('aqi-city-input').value;
    var aqi = document.getElementById('aqi-value-input').value;

    if (/^[\u4e00-\u9fa5]+$/.test(city)) {
        if (!isNaN(aqi)) {
            aqiData[city]=aqi;
        } else {
            alert('空气质量指数输入的不是数字');
        }
    } else {
        alert('城市名称输入的不是中文');
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    var _innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for (item in aqiData) {
        console.log(item);
        _innerHTML += '<tr><td>' + item + '</td><td>' + aqiData[item] + '</td><td><button>删除</button></td></tr>';
    }
    table.innerHTML = _innerHTML;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(node) {
    var key = node.parentNode.parentNode.firstChild.innerHTML;
    delete aqiData[key];

    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById('aqi-table');

    table.addEventListener('click', function(e) {
        console.log('冒泡');
        delBtnHandle(e.target);
    }, false);
    table.addEventListener('click', function(e) {
        console.log(e.target);
    }, true);

    renderAqiList();

}

