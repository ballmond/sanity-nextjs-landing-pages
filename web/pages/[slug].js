import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { NextSeo } from 'next-seo';
import client from '../client';
import Layout from '../components/Layout';
import RenderSections from '../components/RenderSections';

export default function LandingPage({ page, slug }) {
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
    // <Layout config={config}>
    //   <NextSeo
    //     config={{
    //       title,
    //       titleTemplate: `${config.title} | %s`,
    //       description,
    //       canonical: config.url && `${config.url}/${slug}`,
    //       openGraph: {
    //         images: openGraphImages,
    //       },
    //       noindex: disallowRobots,
    //     }}
    //   />
    //   {content && <RenderSections sections={content} />}
    // </Layout>
    <Layout config={config}>
      <h1>lol</h1>
      <h2>:sigh:</h2>
    </Layout>
  );
}

const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page-> {
    ...,
    content[] {
      ...,
      cta {
        ...,
        route->
      },
      ctas[] {
        ...,
        route->
      }
    }
  }
}
`;

export async function getStaticProps({ params }) {
  const { slug = '' } = params;
  const res = await client.fetch(pageQuery, { slug }).then((res) => ({ ...res, slug }));

  const props = {
    props: {
      ...res,
      slug,
    },
  };

  return props;
}

const queryPaths = groq`{
    "routes": *[_type == "route"] {
      ...,
      disallowRobot,
      includeInSitemap,
      page->{
        _id,
        title,
        _createdAt,
        _updatedAt
    }}
  }
  `;

export async function getStaticPaths() {
  const { routes } = await client.fetch(queryPaths);

  const props = {
    paths: routes.map((route) => {
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
