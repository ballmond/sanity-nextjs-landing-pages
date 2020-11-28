import PropTypes from 'prop-types';
import PostPreview from '../PostPreview';
import styles from './Post.module.css';

export default function Post(props) {
  return (
    <div className={styles.root}>
      <PostPreview
        key={props.slug}
        className={styles.article}
        title={props.title}
        date={props.publishedAt}
        slug={props.slug}
        coverImage={props.coverImage}
      >
        {props.title}
      </PostPreview>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  publishedAt: PropTypes.string,
  slug: PropTypes.string,
};
