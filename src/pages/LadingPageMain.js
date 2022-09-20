import styles from './LandingPageMain.module.css';
import Card from '../components/UI/Card';
import Line from '../components/UI/Line';

const LadingPageMain = () => {
  return (
    <div className={styles['lp-main--container']}>
      <Card className="bg-primary">
        <h3 className="regular c-light">
          TesnsioJurnal este o aplicație web pentru monitorizarea tensiunii
          arteriale.
        </h3>
        <Line closer={true} />
        <p className="thin c-light">Aplicația este în curs de dezvoltare.</p>
      </Card>
      <Card>
        <h3 className={`c-alert`}>Autentifică-te pentru a testa aplicația.</h3>
        <p className={`${styles['lp-main--margin-top']}`}>
          Creează un cont nou,
        </p>
        <p>sau poți să te autentifici cu datele:</p>
        <p>
          <span className="thin">mail: </span>test@test.ro 
          <span className="thin"> / pass: </span>12345678
        </p>
        <Line />
        <ul className="to-do-list">
          <li className="bold c-primary">Funcționalități implementate</li>
          <li className="thin">- Înregistrarea valorilor tensiunii arteriale</li>
          <li className="thin">
            - Filtrarea și vizualizarea datelor în diferite formate
            (diagrame, istoric, calendar)
          </li>
          <li className="thin">- Evaluarea frecvenței înregistrărilor pentru luna curentă</li>
          <li className="thin">- Profil utilizator</li>
        </ul>
        <Line closer={true} />
        <ul className="to-do-list">
          <li className="bold c-primary">Funcționalități în dezvoltare</li>
          <li className="thin">- Import / export date</li>
          <li className="thin">- Creare raport pentru medic</li>
          <li className="thin">- Înregistrare istoric medicație</li>
          <li className="thin">- Informații utile despre tensiunea arterială</li>
        </ul>
        <Line />
      </Card>
    </div>
  );
};

export default LadingPageMain;
