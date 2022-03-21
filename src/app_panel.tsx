import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

import { loadData } from './data/loader';
import { initChart, buildOption } from './lib/chart';

import styles from './styles.modules.css';

export const AppPanel = React.memo(() => {
  const [panel, setPanel] = useState<'A' | 'B'>(null);
  const [myChart, setMyChart] = useState<echarts.ECharts>(null);

  useEffect(() => {
    setMyChart(initChart('panel'));
  }, []);

  useEffect(() => {
    if (panel === 'A') {
      myChart.setOption(buildOption(loadData('A')));
    } else if (panel === 'B') {
      myChart.setOption(buildOption(loadData('B')));
    }
  }, [panel]);

  return (
    <div>
      <button
        type="button"
        className={panel === 'A' ? styles.titleSelected : styles.title}
        onClick={() => {
          setPanel('A');
        }}
      >
        A
      </button>
      <button
        type="button"
        className={panel === 'B' ? styles.titleSelected : styles.title}
        onClick={() => {
          setPanel('B');
        }}
      >
        B
      </button>
      <div className={styles.mainBody} id="panel" />
    </div>
  );
});
