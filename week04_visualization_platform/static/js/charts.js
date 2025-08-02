fetch('/api/douban_top10')
  .then(response => response.json())
  .then(data => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '豆瓣电影 Top10 评分',
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: data.titles
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'bar',
        data: data.scores,
        itemStyle: {
          color: '#3398DB'
        }
      }]
    };
    myChart.setOption(option);
  });
