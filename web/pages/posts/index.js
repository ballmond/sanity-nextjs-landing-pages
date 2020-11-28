import { getSiteDetails, getPageData, getRoutes, getPosts } from '../../lib/api';
import Layout from '../../components/Layout';
import PostPreview from '../../components/PostPreview';

export default function Posts({ events, sermons, site }) {
  return (
    <>
      <h1>Upcoming Events</h1>
      {events.map((post) => (
        <PostPreview title={post.title} date={post.publishedAt} slug={post.slug}>
          {post.title}
        </PostPreview>
      ))}
      <h1>Sermon Audio</h1>
      {sermons.map((post) => (
        <PostPreview title={post.title} date={post.publishedAt} slug={post.slug}>
          {post.title}
        </PostPreview>
      ))}
    </>
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
