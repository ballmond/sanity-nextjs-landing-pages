import PropTypes from 'prop-types';
import styles from './CtaSection.module.css';
import Cta from '../Cta';

export default function CtaSection(props) {
  const { ctas } = props;

  return (
    <div className={styles.root}>
      {ctas && (
        <div className={styles.ctas}>
          {ctas.map((cta) => (
            <Cta {...cta} key={cta._key} />
          ))}
        </div>
      )}
    </div>
  );
}

CtaSection.propTypes = {
  ctas: PropTypes.arrayOf(PropTypes.object),
};
