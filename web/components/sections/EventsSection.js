import PropTypes from 'prop-types';
import PostPreview from '../PostPreview';
import styles from './EventsSection.module.css';

export default function EventsSection(props) {
  const { numberOfEvents, categories, posts } = props;

  return (
    <div className={styles.root}>
      <h1>Upcoming Events</h1>
      {posts.map((post) => (
        <PostPreview title={post.title} date={post.publishedAt} slug={post.slug}>
          {post.title}
        </PostPreview>
      ))}
    </div>
  );
  //   return (
  //     <>
  //       <h1>lol</h1>
  //       <h2>{`${numberOfEvents}`}</h2>
  //       <h2>{JSON.stringify(posts, null, 2)}</h2>
  //     </>
  //   );
}

EventsSection.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.object),
};
