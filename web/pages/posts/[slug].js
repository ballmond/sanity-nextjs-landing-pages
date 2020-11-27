import { getSiteDetails, getPost } from '../../lib/api';
import Layout from '../../components/Layout';

export default function Posts({ posts, site }) {
  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    config = {},
  } = posts;

  return (
    <Layout
      config={{
        title,
        titleTemplate: `${config.title} | %s`,
        description,
        ...site,
      }}
    >
      <>
        <article className="">
          <h1>{title}</h1>
        </article>
      </>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slug = '/' } = params;
  const { data } = await getPost(slug);
  const site = await getSiteDetails();
  const props = {
    props: { posts: data, ...site.data },
  };

  return props;
}

export async function getStaticPaths() {
  //   return getRoutes();
  return {
    paths: [
      {
        params: {
          slug: 'sunday-school',
        },
      },
    ],
    fallback: false,
  };
}
