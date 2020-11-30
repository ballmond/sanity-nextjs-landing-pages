import { getSiteDetails, getPageData, getRoutes, getPosts } from '../../lib/api';
import imageUrlBuilder from '@sanity/image-url';
import { NextSeo } from 'next-seo';
import client from '../../client';
import Layout from '../../components/Layout';
import RenderSections from '../../components/RenderSections';

export default function LandingPage({ page, site, slug }) {
  const builder = imageUrlBuilder(client);

  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    config = {},
  } = page;

  const openGraphImages = openGraphImage
    ? [
        {
          url: builder.image(openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          // Facebook recommended size
          url: builder.image(openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          // Square 1:1
          url: builder.image(openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: title,
        },
      ]
    : [];

  return (
    <Layout
      config={{
        title,
        titleTemplate: `${config.title} | %s`,
        description,
        ...site,
      }}
    >
      <NextSeo
        config={{
          title,
          titleTemplate: `${config.title} | %s`,
          description,
          canonical: config.url && `${config.url}/${slug}`,
          openGraph: {
            images: openGraphImages,
          },
          noindex: disallowRobots,
        }}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { slug = '/' } = params;
  const { data } = await getPageData(`${slug}`);
  const site = await getSiteDetails();
  const props = {
    props: {
      ...data,
      ...site.data,
    },
  };

  return props;
}

export async function getStaticPaths() {
  const { data } = await getRoutes();
  const props = {
    paths: data.map((route) => {
      return {
        params: {
          slug: route.slug.current,
        },
      };
    }),
    fallback: false,
  };

  return props;
}
