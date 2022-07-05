import styles from './LandingPageMain.module.css';
import Card from '../components/UI/Card';
import Line from '../components/UI/Line';

const LadingPageMain = () => {
  return (
    <div className={styles['lp-main--container']}>
      <Card className="bg-primary">
        <h3 className="regular c-light">TesnsioJurnal este o aplicație web pentru monitorizarea tensiunii arteriale.</h3>
        <Line closer={true} />
        <p className="thin c-light">Aplicația este în curs de dezvoltare.</p>
      </Card>
      <Card>
        <h3 className={`c-alert`}>Autentifică-te pentru a testa aplicația.</h3>
        <Line />
        <ul className="to-do-list">
          <li className="bold c-primary">Funcționalități implementate</li>
          <li>- Înregistrarea valorilor tensiunii arteriale</li>
          <li>
            - Filtrarea și vizualizarea datelor înregistrate în diferite formate
            (diagrame, istoric, calendar)
          </li>
          <li>- Evaluarea frecvenței înregistrărilor pentru luna curentă</li>
          <li>- Profil utilizator</li>
        </ul>
        <Line closer={true} />
        <ul className="to-do-list">
          <li className="bold c-primary">Funcționalități în dezvoltare</li>
          <li>- Import / export date</li>
          <li>- Creare raport pentru medic</li>
          <li>- Înregistrare istoric medicație</li>
          <li>- Informații utile despre tensiunea arterială</li>
        </ul>
        <Line />
      </Card>
    </div>
  );
};

export default LadingPageMain;
