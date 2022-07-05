import styles from './PageHeader.module.css';
import Line from './Line';

const PageHeader = (props) => {
  const pageTitle = props.title;
  const errorStyles = props.errorStyles ? styles['error--title'] : '';
  const titleColor = props.titleColor ? props.titleColor : '';  
  const shortLine = props.shortLine ? props.shortLine : false;

  return (
    <>
      <h1 className={`${styles['page-title']} ${errorStyles} ${titleColor}`}>{pageTitle}</h1>
      {!props.hideLine && <Line shortLine={shortLine}/>}
    </>
  );
};

export default PageHeader;
