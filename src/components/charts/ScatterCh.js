import { ResponsiveScatterPlot } from '@nivo/scatterplot';

import styles from './Charts.module.css';
import Card from '../UI/Card';
import ChartLabel from './ChartLabel';
import {
  C_HIPO,
  C_OPTIM,
  C_NORMAL,
  C_INALT,
  C_GRAD_1,
  C_GRAD_2,
  C_GRAD_3,
  C_SIS_IZOLATA,
  L_SIS,
  L_DIA,
  THEME_4_NIVO
} from '../../helpers/global-constants';

const ScatterCh = (props) => {
  const {
    data,
    xTickValues,
    yTickValues,
    labelText,
    isWindowWidth,
    descriptionText
  } = props;

  let tickValuesX = xTickValues;
  let tickValuesY = yTickValues;
  let gridValuesX = xTickValues;
  let gridValuesY = yTickValues;
  let nodeSize = 14;

  if (!isWindowWidth) {
    tickValuesX = undefined;
    tickValuesY = undefined;
    gridValuesX = undefined;
    gridValuesY = undefined;
    nodeSize = 11;
  }

  const margin = {
    top: isWindowWidth ? 16 : 6,
    right: 12,
    bottom: isWindowWidth ? 44 : descriptionText ? 64 : 44,
    left: 28
  };

  const colors = [];

  if (data[0].data.length > 0) colors.push(C_HIPO);
  if (data[1].data.length > 0) colors.push(C_OPTIM);
  if (data[2].data.length > 0) colors.push(C_NORMAL);
  if (data[3].data.length > 0) colors.push(C_INALT);
  if (data[4].data.length > 0) colors.push(C_GRAD_1);
  if (data[5].data.length > 0) colors.push(C_GRAD_2);
  if (data[6].data.length > 0) colors.push(C_GRAD_3);
  if (data[7].data.length > 0) colors.push(C_SIS_IZOLATA);

  const legendDia = isWindowWidth ? `- ${L_DIA} -` : '- DIA. -';
  const legendSis = isWindowWidth ? `- ${L_SIS} -` : '- SIS. -';

  return (
    <Card
      className={`${styles['ch-card']} ${
        isWindowWidth ? styles['tall-ch-card'] : styles['short-ch-card']
      }`}
    >
      <ChartLabel labelText={labelText} description={descriptionText} />
      <ResponsiveScatterPlot
        data={data}
        margin={margin}
        xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        xFormat=">-,.2~f"
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        yFormat=">-,.2~f"
        blendMode="multiply"
        colors={colors}
        colorBy="index"
        theme={THEME_4_NIVO}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 4,
          tickPadding: 5,
          legend: `${legendDia}`,
          legendPosition: 'end',
          legendOffset: -12,
          tickValues: tickValuesX
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 4,
          tickPadding: 5,
          legend: `${legendSis}`,
          legendPosition: 'end',
          legendOffset: 12,
          tickValues: tickValuesY
        }}
        gridXValues={gridValuesX}
        gridYValues={gridValuesY}
        nodeSize={nodeSize}
      />
    </Card>
  );
};

export default ScatterCh;
