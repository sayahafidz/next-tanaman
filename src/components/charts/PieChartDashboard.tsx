import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type DataChart = {
  nameData: string;
  downloadJsonData: any | null;
  builderJsonData: any | null;
};

const EChartsComponent: React.FC<DataChart> = ({ nameData, downloadJsonData, builderJsonData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!builderJsonData || !downloadJsonData) {
      return;
    }

    const builderJson = {
      all: builderJsonData.all,
      charts: builderJsonData.charts,
    };

    const downloadJson = downloadJsonData;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.08;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);

    const colors = [
      "#1a1a1a",
      "#FAC858",
      "#8EC872",
      "#ffff66",
      "#EE6667"
    ];

    const option = {
      tooltip: {},
      title: [
        {
          text: nameData,
          subtext: 'Total ' + Object.keys(downloadJson).reduce(function (all, key) {
            return all + downloadJson[key];
          }, 0),
          left: '50%',
          textAlign: 'center'
        }
      ],
      series: [
        {
          type: 'pie',
          radius: [0, '50%'],
          center: ['50%', '50%'],
          data: Object.keys(downloadJson).map(function (key, index) {
            return {
              itemStyle: {
                color: colors[index % colors.length]
              },
              name: key,
              value: downloadJson[key]
            };
          })
        }
      ]
    };

    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [nameData, downloadJsonData, builderJsonData]);

  return (
    <div
      ref={chartRef}
      className='w-full h-96 bg-white dark:bg-navy-900 dark:text-white rounded-lg shadow-lg pt-5'
      style={{
        width: '100%',
        height: '400px',
        margin: 'auto',
        float: 'right'
      }}
    ></div>
  );
};

export default EChartsComponent;
