import * as echarts from 'echarts';
import { Unit } from './types/unit.d';

type EChartsOption = echarts.EChartsOption;

export const initChart = (domID: string): echarts.ECharts => {
  const chartDom = document.getElementById(domID);
  return echarts.init(chartDom);
};

export const unitToRawData = (item: Unit): (number | string)[] => [
  item.open,
  item.close,
  item.lowest,
  item.highest,
  item.comments
];

// item for []echarts.OptionDataItem which is not exported
export const optionParamsToUnit = (name: string, item: any): Unit => ({
  date: name,
  open: parseFloat(`${item[0]}`),
  close: parseFloat(`${item[1]}`),
  lowest: parseFloat(`${item[2]}`),
  highest: parseFloat(`${item[3]}`),
  comments: `${item[5]}`
});

export const buildOption = (rawData: Unit[]): EChartsOption => {
  const dates = rawData.map((item: Unit) => item.date);
  const data = rawData.map((item: Unit) => unitToRawData(item));
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
        type: 'cross',
        lineStyle: {
          color: '#376df4',
          width: 2,
          opacity: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: '#8392A5' } }
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: '#8392A5' } },
      splitLine: { show: false }
    },
    grid: {
      bottom: 80
    },
    dataZoom: [
      {
        textStyle: {
          color: '#8392A5'
        },
        dataBackground: {
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        rangeMode: ['value', 'percent'],
        brushSelect: true
      }
    ],
    series: [
      {
        type: 'candlestick',
        name: 'Day',
        data,
        itemStyle: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B'
        }
      }
    ]
  };
};
