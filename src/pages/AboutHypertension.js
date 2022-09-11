import styles from './AboutHypertension.module.css';
import ContainerFlexColumn from '../components/layout/containers/ContainerFlexColumn';
import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import { usePanelsContext } from '../store/panels-context';
import {
  L_OPTIM,
  L_NORMAL,
  L_INALT,
  L_GRAD_1,
  L_GRAD_2,
  L_GRAD_3,
  SIS_VALUES,
  DIA_VALUES,
  S_HIPO,
  S_OPTIM,
  S_NORMAL,
  S_INALT,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_SIS_IZOLATA
} from '../helpers/global-constants';

const HtColorGrid = (props) => {
  const { tip, color, sisVal, diaVal, and } = props;
  const { mainVisibleWidth } = usePanelsContext();

  const condition = and ? 'și' : 'sau';

  const isMain275 = mainVisibleWidth > 273;

  const isMain419 = mainVisibleWidth > 418;
  const gridDirection = isMain419
    ? 'color-grid--container-col'
    : 'color-grid--container-row';

  const isMain747 = mainVisibleWidth > 902;
  const sisText = isMain747 ? 'Sistolică:' : 'Sis:';
  const diaText = isMain747 ? 'Diastolică:' : 'Dia:';

  console.log(`main: ${mainVisibleWidth}`);

  return (
    <div
      className={`${styles['color-grid--container']} ${styles[gridDirection]} bg${color}`}
    >
      <p className={styles['color-grid--type']}>{tip}</p>
      {isMain275 && (
        <div className={styles['color-grid--details']}>
          <p className={styles['color-grid--sis']}>{sisText}</p>
          <p className={styles['color-grid--sis-val']}>{sisVal}</p>
          <p className={styles['color-grid--cond']}>{condition}</p>
          <p className={styles['color-grid--dia']}>{diaText}</p>
          <p className={styles['color-grid--dia-val']}>{diaVal}</p>
        </div>
      )}
    </div>
  );
};

const AboutHypertension = () => {
  return (
    <>
      <ContainerFlexColumn>
        <Card>
          <PageHeader title="Tip tensiune arterială" />
          <HtColorGrid
            tip="Hipotensiune"
            color={S_HIPO}
            sisVal={`< ${SIS_VALUES[0]}`}
            diaVal={`< ${DIA_VALUES[0]}`}
            and={true}
          />
          <HtColorGrid
            tip={L_OPTIM}
            color={S_OPTIM}
            sisVal={`${SIS_VALUES[0]}-${SIS_VALUES[1]}`}
            diaVal={`${DIA_VALUES[0]}-${DIA_VALUES[1]}`}
          />
          <HtColorGrid
            tip={L_NORMAL}
            color={S_NORMAL}
            sisVal={`${SIS_VALUES[1]}-${SIS_VALUES[2]}`}
            diaVal={`${DIA_VALUES[1]}-${DIA_VALUES[2]}`}
          />
          <HtColorGrid
            tip={L_INALT}
            color={S_INALT}
            sisVal={`${SIS_VALUES[2]}-${SIS_VALUES[3]}`}
            diaVal={`${DIA_VALUES[2]}-${DIA_VALUES[3]}`}
          />
          <HtColorGrid
            tip={`Ht. ${L_GRAD_1}`}
            color={S_GRAD_1}
            sisVal={`${SIS_VALUES[3]}-${SIS_VALUES[4]}`}
            diaVal={`${DIA_VALUES[3]}-${DIA_VALUES[4]}`}
          />
          <HtColorGrid
            tip={`Ht. ${L_GRAD_2}`}
            color={S_GRAD_2}
            sisVal={`${SIS_VALUES[4]}-${SIS_VALUES[5]}`}
            diaVal={`${DIA_VALUES[4]}-${DIA_VALUES[5]}`}
          />
          <HtColorGrid
            tip={`Ht. ${L_GRAD_3}`}
            color={S_GRAD_3}
            sisVal={`> ${SIS_VALUES[5]}`}
            diaVal={`> ${DIA_VALUES[5]}`}
          />
          <HtColorGrid
            tip="Sis. izolată"
            color={S_SIS_IZOLATA}
            sisVal={`> ${SIS_VALUES[3]}`}
            diaVal={`< ${DIA_VALUES[3]}`}
            and={true}
          />
        </Card>
        <Card>
          <PageHeader title="Despre hipertensiunea arterială" />
          <h3 className="c-primary">Work in progress...</h3>
          <ul className="to-do-list">
            <li>- definiție</li>
            <li>- cauze</li>
            <li>- recomandări caz urgență</li>
            <li>- recomandări stil de viață</li>
            <li>- etc</li>
          </ul>
        </Card>
      </ContainerFlexColumn>
    </>
  );
};

export default AboutHypertension;
