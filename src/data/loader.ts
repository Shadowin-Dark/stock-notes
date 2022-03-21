import { Unit } from '../lib/types/unit.d';
import {
  data2010,
  data2011,
  data2012,
  data2013,
  data2014,
  data2015,
  data2016,
  data2017,
  data2018,
  data2019,
  data2020,
  data2021,
  data2022
} from './index';

const load = (data: Unit[], rawData: (number | string)[][]) => {
  rawData.forEach(d => {
    data.push({
      date: `${d[0]}`,
      open: parseFloat(`${d[1]}`),
      close: parseFloat(`${d[4]}`),
      lowest: parseFloat(`${d[2]}`),
      highest: parseFloat(`${d[3]}`),
      comments: `${d[5]}`
    });
  });
};

export const loadData = (id: string): Unit[] => {
  const data: Unit[] = [];
  if (id === 'A') {
    load(data, data2010);
    load(data, data2011);
    load(data, data2012);
    load(data, data2013);
    load(data, data2014);
    load(data, data2015);
    load(data, data2016);
    load(data, data2017);
    load(data, data2018);
    load(data, data2019);
    load(data, data2020);
    load(data, data2021);
    load(data, data2022);
  }
  return data;
};
