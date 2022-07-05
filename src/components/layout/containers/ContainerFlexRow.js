import styles from './ContainerFlex.module.css';

const ContainerFlexRow = (props) => {
  return (
    <div className={styles['container-flex-row']}>{props.children}</div>
  );
};

export default ContainerFlexRow;
