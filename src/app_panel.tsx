import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import moment from 'moment';

import { Unit } from './lib/types/unit.d';
import { loadData } from './data/loader';
import { initChart, buildOption, optionParamsToUnit } from './lib/chart';

import styles from './styles.modules.css';

const setDefaultRange = (chart: echarts.ECharts, rangeUnit: 'ALL' | 'YEAR' | 'MONTH' | 'WEEK') => {
  const option = chart.getOption();
  const dataSet = option.xAxis[0].data;
  const lastMomentValue = moment(dataSet[dataSet.length - 1], 'YYYY/M/D');
  let startMomentValue = moment(dataSet[0], 'YYYY/M/D');
  if (rangeUnit === 'YEAR') {
    startMomentValue = lastMomentValue.add(-1, 'year');
  } else if (rangeUnit === 'MONTH') {
    startMomentValue = lastMomentValue.add(-1, 'month');
  } else if (rangeUnit === 'WEEK') {
    startMomentValue = lastMomentValue.add(-7, 'day');
  }
  if (startMomentValue.isoWeekday() === 7) {
    startMomentValue = lastMomentValue.add(1, 'day');
  } else if (startMomentValue.isoWeekday() === 6) {
    startMomentValue = lastMomentValue.add(-1, 'day');
  }

  const getStartIndex = (): number => {
    const startValue = startMomentValue.format('YYYY/M/D');
    for (let i = 0; i < dataSet.length; i++) {
      if (dataSet[i] === startValue) {
        return i;
      }
    }
    return 0;
  };

  option.dataZoom[0].startValue = getStartIndex();
  chart.clear();
  chart.setOption(option);
};

export const AppPanel = React.memo(() => {
  const [panel, setPanel] = useState<[boolean, boolean]>([false, false]);
  const [myChart, setMyChart] = useState<echarts.ECharts>(null);
  const [focused, setFocused] = useState<Unit>(null);

  useEffect(() => {
    const chart = initChart('panel');
    chart.on('click', params => {
      setFocused(optionParamsToUnit(params.name, params.data));
    });
    setMyChart(chart);
  }, []);

  useEffect(() => {
    if (panel[0] && panel[1]) {
      myChart.clear();
      myChart.setOption(buildOption([loadData('A'), loadData('B')]));
    } else if (panel[0]) {
      myChart.clear();
      myChart.setOption(buildOption([loadData('A')]));
    } else if (panel[1]) {
      myChart.clear();
      myChart.setOption(buildOption([loadData('B')]));
    }
  }, [panel[0], panel[1]]);

  return (
    <div>
      <button
        type="button"
        className={panel[0] ? styles.titleSelected : styles.title}
        onClick={() => {
          setPanel([!panel[0], panel[1]]);
        }}
      >
        上证指数[000001]
      </button>
      <button
        type="button"
        className={panel[1] ? styles.titleSelected : styles.title}
        onClick={() => {
          setPanel([panel[0], !panel[1]]);
        }}
      >
        深证成指[399001]
      </button>
      <button
        type="button"
        className={styles.dateRange}
        onClick={() => {
          setDefaultRange(myChart, 'ALL');
        }}
      >
        All Data
      </button>
      <button
        type="button"
        className={styles.dateRange}
        onClick={() => {
          setDefaultRange(myChart, 'YEAR');
        }}
      >
        Last Year
      </button>
      <button
        type="button"
        className={styles.dateRange}
        onClick={() => {
          setDefaultRange(myChart, 'MONTH');
        }}
      >
        Last Month
      </button>
      <button
        type="button"
        className={styles.dateRange}
        onClick={() => {
          setDefaultRange(myChart, 'WEEK');
        }}
      >
        Last Week
      </button>
      <div className={styles.mainBody} id="panel" />
      {focused && focused.comments !== 'undefined' && <div>{focused.comments}</div>}
    </div>
  );
});
