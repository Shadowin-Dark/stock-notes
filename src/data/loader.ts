import { Unit } from '../lib/types/unit.d';
import { data000001 } from './000001';
import { data399001 } from './399001';

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
    load(data, data000001);
  } else if (id === 'B') {
    load(data, data399001);
  }
  return data;
};
