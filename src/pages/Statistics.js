import HyperColorsSummary from '../components/elements/HyperColorsSummary';
import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import ContainerFlexRow from '../components/layout/containers/ContainerFlexRow';
import Card from '../components/UI/Card';
import LoadingAndError from '../components/elements/LoadingAndError';
import FilterReadings from '../components/elements/FilterReadings';
import ScatterCh from '../components/charts/ScatterCh';
import BarCh from '../components/charts/BarCh';
import PieCh from '../components/charts/PieCh';
import LineCh from '../components/charts/LineCh';
import MinMaxCh from '../components/charts/MinMaxCh';
import useFilteredReadings from '../hooks/use-filtered-readings';
import useQueryReadings from '../hooks/http-req/use-query-readings';
import { usePanelsContext } from '../store/panels-context';
import {
  L_SIS,
  L_DIA,
  L_TA,
  L_PULSE,
  L_PULSE_PRESSURE
} from '../helpers/global-constants';

const Statistics = () => {
  const { readings, isError, isLoading, refetch } = useQueryReadings();
  const {
    totalSelected,
    formatedData,
    minMaxValues,
    minMaxColors,
    tickValues,
    timeRange,
    criteria,
    changeDaysHandler,
    changeHoursHandler,
    changeArmHandler
  } = useFilteredReadings(readings);
  const { windowWidth } = usePanelsContext();
  const isWindowWidth = windowWidth > 687;

  const isData = !!totalSelected;
  const isMoreThan5 = isData && totalSelected >= 5;

  const {
    scatterData,
    barData,
    pieData,
    lineSisData,
    lineDiaData,
    linePulseData,
    linePulsePressureData,
    lineMedianPressureData
  } = formatedData;
  const {
    sisValues,
    diaValues,
    pulseValues,
    pulsePressureValues,
    medianPressureValues
  } = tickValues;

  return (
    <>
      <HyperColorsSummary />
      <LoadingAndError
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
      {!isLoading && !isError && (
        <>
          <FilterReadings
            criteria={criteria}
            onChangeDays={changeDaysHandler}
            onChangeHours={changeHoursHandler}
            onChangeArm={changeArmHandler}
            totalSelected={totalSelected}
            timeRange={timeRange}
            threshold={5}
          />
          {!isMoreThan5 && (
            <ContainerFlexRow>
              <Card>
                {!isData && (
                  <p>
                    Nu există înregistrări pentru această combinație de
                    criterii.
                  </p>
                )}
                <p>
                  Este nevoie de{' '}
                  <span className="bold">minimum 5 înregistrări</span> pentru
                  evaluarea statistică.
                </p>
              </Card>
            </ContainerFlexRow>
          )}
          {isMoreThan5 && (
            <ContainerFlexColumn>
              <ScatterCh
                data={scatterData}
                xTickValues={diaValues}
                yTickValues={sisValues}
                labelText={`Valori ${L_TA}`}
                isWindowWidth={isWindowWidth}
              />
              <BarCh
                data={barData}
                labelText={`Citiri T. Art. (cuantificare)`}
                isWindowWidth={isWindowWidth}
              />
              <PieCh
                data={pieData}
                labelText={`Citiri T. Art. (procente)`}
                isWindowWidth={isWindowWidth}
              />
              <LineCh
                data={lineSisData}
                tickValues={sisValues}
                labelText={`Valori ${L_SIS}`}
                isWindowWidth={isWindowWidth}
              />
              <LineCh
                data={lineDiaData}
                tickValues={diaValues}
                labelText={`Valori ${L_DIA}`}
                isWindowWidth={isWindowWidth}
              />
              <LineCh
                data={linePulseData}
                tickValues={pulseValues}
                labelText={`Valori ${L_PULSE}`}
                isWindowWidth={isWindowWidth}
              />
              <LineCh
                data={linePulsePressureData}
                tickValues={pulsePressureValues}
                labelText={`Valori ${L_PULSE_PRESSURE}`}
                isWindowWidth={isWindowWidth}
              />
              <LineCh
                data={lineMedianPressureData}
                tickValues={medianPressureValues}
                labelText={`Valori presiune art. medie`}
                isWindowWidth={isWindowWidth}
              />
              <MinMaxCh
                minMaxValues={minMaxValues}
                minMaxColors={minMaxColors}
                labelText="Valori minime / maxime"
                isWindowWidth={isWindowWidth}
              />
            </ContainerFlexColumn>
          )}
        </>
      )}
    </>
  );
};

export default Statistics;
