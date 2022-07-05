import styles from './ContainerFlex.module.css';

const ContainerFlexColumn = (props) => {
  return (
    <div className={`${styles['container-flex-column']} ${props.className ? props.className : ''}`}>{props.children}</div>
  );
};

export default ContainerFlexColumn;
