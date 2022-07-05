import styles from './Charts.module.css';

const ChartLabel = (props) => {
  const { labelText, description } = props;

  return (
    <div className={styles['chart-label--container']}>
      <h5 className={styles['chart-label--name']}>{labelText}</h5>
      {description && <p className={styles['chart-label--description']}>{description}</p>}
    </div>
  );
};

export default ChartLabel;
