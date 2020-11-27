import { getSiteDetails, getPageData, getRoutes, getPosts } from '../../lib/api';
import Layout from '../../components/Layout';
import PostPreview from '../../components/PostPreview';

export default function Posts({ posts, site }) {
  return (
    <>
      {posts.map((post) => (
        <PostPreview title={post.title} date={post.publishedAt} slug={post.slug}>
          {post.title}
        </PostPreview>
      ))}
    </>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await getPosts();
  const site = await getSiteDetails();

  const props = {
    props: {
      posts: data.map((post) => {
        return {
          ...post,
        };
      }),
      ...site.data,
    },
  };
  return props;
}
