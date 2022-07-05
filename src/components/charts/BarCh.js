import { ResponsiveBar } from '@nivo/bar';

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
  L_HIPO,
  L_OPTIM,
  L_NORMAL,
  L_INALT,
  L_GRAD_1,
  L_GRAD_2,
  L_GRAD_3,
  L_SIS_IZOLATA,
  THEME_4_NIVO
} from '../../helpers/global-constants';

const BarCh = (props) => {
  const { data, labelText, isWindowWidth } = props;

  const margin = isWindowWidth
    ? { top: 16, right: 12, bottom: 36, left: 28 }
    : { top: 4, right: 12, bottom: 26, left: 28 };

  return (
    <Card
      className={`${styles['ch-card']} ${
        isWindowWidth ? styles['short-ch-card'] : styles['shortest-ch-card']
      }`}
    >
      <ChartLabel labelText={labelText} />
      <ResponsiveBar
        theme={THEME_4_NIVO}
        colors={[
          C_HIPO,
          C_OPTIM,
          C_NORMAL,
          C_INALT,
          C_GRAD_1,
          C_GRAD_2,
          C_GRAD_3,
          C_SIS_IZOLATA
        ]}
        data={data}
        keys={[
          L_HIPO,
          L_OPTIM,
          L_NORMAL,
          L_INALT,
          L_GRAD_1,
          L_GRAD_2,
          L_GRAD_3,
          L_SIS_IZOLATA
        ]}
        indexBy="id"
        margin={margin}
        padding={0.2}
        labelTextColor={{
          from: { C_GRAY_5 }
        }}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickValues: isWindowWidth ? undefined : []
        }}
        axisLeft={{
          tickSize: 4,
          tickPadding: 5,
          format: (e) => Math.floor(e) === e && e
        }}
        // layout="horizontal" enableGridY={false} enableGridX={true}
      />
    </Card>
  );
};

export default BarCh;
