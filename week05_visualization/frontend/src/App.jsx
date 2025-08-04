import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Layout, Typography, Spin } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 模拟调用后端接口，实际换成你的接口地址
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // 构建echarts配置
  const option = {
    title: {
      text: '电影评分 Top 10',
      left: 'center',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.map(item => item.title),
      axisLabel: {
        rotate: 45,  // 斜45度防止文字挤在一起
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => item.rating),
        itemStyle: {
          color: '#1890ff',
        },
      },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529' }}>
        {/* 这里标题强制横排 */}
        <Title style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }} level={3}>
          数据可视化平台
        </Title>
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff' }}>
        {loading ? (
          <Spin tip="加载中..." size="large" />
        ) : (
          <div style={{ width: '100%', height: 500 }}>
            {/* 关键：echarts容器宽高必须有效 */}
            <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default App;
