import * as echarts from 'echarts';
import { Unit } from './types/unit.d';

type EChartsOption = echarts.EChartsOption;

export const initChart = (domID: string): echarts.ECharts => {
  const chartDom = document.getElementById(domID);
  return echarts.init(chartDom);
};

export const buildOption = (rawData: Unit[]): EChartsOption => {
  const dates = rawData.map((item: Unit) => item.date);
  const data = rawData.map((item: Unit) => [item.open, item.close, item.lowest, item.highest]);
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
        handleIcon:
          'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        dataBackground: {
          areaStyle: {
            color: '#8392A5'
          },
          lineStyle: {
            opacity: 0.8,
            color: '#8392A5'
          }
        },
        brushSelect: true
      },
      {
        type: 'inside'
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
