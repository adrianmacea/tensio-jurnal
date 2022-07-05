import { ResponsivePie } from '@nivo/pie';

import styles from './Charts.module.css';
import Card from '../UI/Card';
import ChartLabel from './ChartLabel';
import {
  C_GRAY_5,
  C_HIPO,
  C_OPTIM,
  C_NORMAL,
  C_INALT,
  C_GRAD_1,
  C_GRAD_2,
  C_GRAD_3,
  C_SIS_IZOLATA,
  THEME_4_NIVO
} from '../../helpers/global-constants';

const PieCh = (props) => {
  const { data, labelText, isWindowWidth } = props;

  const margin = isWindowWidth
    ? { top: 34, right: 0, bottom: 34, left: 0 }
    : { top: 0, right: 0, bottom: 26, left: 0 };

  const colors = [];

  if (data[0].value > 0) colors.push(C_HIPO);
  if (data[1].value > 0) colors.push(C_OPTIM);
  if (data[2].value > 0) colors.push(C_NORMAL);
  if (data[3].value > 0) colors.push(C_INALT);
  if (data[4].value > 0) colors.push(C_GRAD_1);
  if (data[5].value > 0) colors.push(C_GRAD_2);
  if (data[6].value > 0) colors.push(C_GRAD_3);
  if (data[7].value > 0) colors.push(C_SIS_IZOLATA);

  const trimmedData = data.filter((element) => element.value > 0);

  return (
    <Card
      className={`${styles['ch-card']} ${
        isWindowWidth ? styles['tall-ch-card'] : styles['short-ch-card']
      }`}
    >
      <ChartLabel labelText={labelText} />
      <ResponsivePie
        theme={THEME_4_NIVO}
        colors={colors}
        data={trimmedData}
        margin={margin}
        innerRadius={0.4}
        padAngle={1}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={C_GRAY_5}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: { C_GRAY_5 }
        }}
        arcLabel={(v) => `${v.value} %`}
        enableArcLinkLabels={isWindowWidth}
      />
    </Card>
  );
};

export default PieCh;
