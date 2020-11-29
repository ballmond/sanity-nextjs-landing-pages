import { getSiteDetails, getPageData, getRoutes, getPosts } from '../../lib/api';
import Layout from '../../components/Layout';
import PostPreview from '../../components/PostPreview';
import styles from '../../styles/LandingPage.module.css';

export default function Posts({ events, sermons, site }) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.title}>Upcoming Events</span>
        {events.map((e) => (
          <PostPreview {...e} key={e.slug} />
        ))}
      </div>
      <div className={styles.content}>
        <span className={styles.title}>Sermon Audio</span>
        {sermons.map((e) => (
          <PostPreview {...e} key={e.slug} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const site = await getSiteDetails();
  const { data: events } = await getPosts('Event', 5);
  const { data: sermons } = await getPosts('Sermon', 5);

  const props = {
    props: {
      events,
      sermons,
      ...site.data,
    },
  };

  return props;
}
