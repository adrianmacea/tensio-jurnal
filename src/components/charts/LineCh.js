import { ResponsiveLine } from '@nivo/line';

import styles from './Charts.module.css';
import Card from '../UI/Card';
import ChartLabel from './ChartLabel';
import {
  C_LIGHT,
  THEME_4_NIVO,
  C_GRAY_1
} from '../../helpers/global-constants';

const LineCh = (props) => {
  const { data, tickValues, labelText, isWindowWidth } = props;

  const PointSymbol = (e) => {
    return (
      <>
        {isWindowWidth && (
          <>
            <circle
              fill={C_LIGHT}
              r="7"
              strokeWidth="2"
              stroke={e.datum.color}
            />
            <circle cx="0" cy="0" r="4" fill={e.datum.color} />
          </>
        )}
        {!isWindowWidth && (
          <circle
            cx="0"
            cy="0"
            r="4.5"
            fill={e.datum.color}
            strokeWidth="2"
            stroke={C_GRAY_1}
          />
        )}
      </>
    );
  };

  const margin = isWindowWidth
    ? { top: 16, right: 12, bottom: 28, left: 28 }
    : { top: 8, right: 6, bottom: 28, left: 28 };

  return (
    <Card
      className={`${styles['ch-card']} ${
        isWindowWidth ? styles['short-ch-card'] : styles['shortest-ch-card']
      }`}
    >
      <ChartLabel labelText={labelText} />
      <ResponsiveLine
        theme={THEME_4_NIVO}
        colors={{ datum: 'color' }}
        data={data}
        indexBy="date"
        margin={margin}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: false, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 0,
          tickValues: []
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 4,
          tickPadding: 5,
          tickValues: tickValues
        }}
        gridYValues={tickValues}
        gridXValues={[]}
        pointLabelYOffset={-12}
        useMesh={true}
        pointSymbol={PointSymbol}
        curve="monotoneX"
      />
    </Card>
  );
};

export default LineCh;
