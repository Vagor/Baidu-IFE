/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var itemHeight = [];
  var _innerHTML = new String();
  for(item in chartData[pageState.nowGraTime]) {
    itemHeight.push(chartData[pageState.nowGraTime][item]);
    _innerHTML += '<div class="'+pageState.nowGraTime+'" style="height:'+chartData[pageState.nowGraTime][item]+'px;"></div>';
  }
  var aqiChart = document.querySelector('.aqi-chart-wrap');
  aqiChart.innerHTML = _innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(node) {
  // 确定是否选项发生了变化
  if (node.checked && node.value != pageState.nowGraTime) {
    // 设置对应数据
    pageState.nowGraTime = node.value;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
    console.log(pageState.nowGraTime);
  }
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  citySelect = document.querySelector('#city-select');
  if (citySelect.value != pageState.nowSelectCity) {
    console.log('citySelectChange');
    // 设置对应数据
    pageState.nowSelectCity = citySelect.value;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime = document.querySelector('#form-gra-time');
  graTime.addEventListener('click', function(event) {
    graTimeChange(event.target);
  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var _innerHTML = new String();
  var index = 0;
  for (item in aqiSourceData) {
    _innerHTML += '<option value="' + index + '">' + item + '</option>';
    index++;
  }
  citySelect = document.querySelector('#city-select');
  citySelect.innerHTML = _innerHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change', function() {
    citySelectChange();
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var aqiSourceDataKeys = Object.getOwnPropertyNames(aqiSourceData);
  var citySelect = document.querySelector('#city-select');
  var dataCity = aqiSourceData[aqiSourceDataKeys[citySelect.value]];
  var dataCityKeys = Object.getOwnPropertyNames(dataCity);
  // 处理每周数据，并存入weekData

  var weekAddContainer = new Number();
  var weekData = {};
  for (var i = 0; i < dataCityKeys.length; i++) {
    weekAddContainer += dataCity[dataCityKeys[i]];
    if (i % 7 == 0 && i != 0) {
      var key = 'week' + Math.floor(i / 7);
      weekData[key] = weekAddContainer / 7;
      weekAddContainer = 0;
    }
  }
  // 处理每周数据，并存入monthData
  var monthAddContainer = new Number();
  var monthData = {};
  for (var i = 0; i < dataCityKeys.length; i++) {
    monthAddContainer += dataCity[dataCityKeys[i]];
    if (i % 28 == 0 && i != 0) {
      var key = 'month' + Math.floor(i / 28);
      monthData[key] = monthAddContainer / 28;
      monthAddContainer = 0;
    }
  }
  // 处理好的数据存到 chartData 中
  chartData['day'] = dataCity;
  chartData['week'] = weekData;
  chartData['month'] = monthData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
