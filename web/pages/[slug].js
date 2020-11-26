import { getSiteDetails, getPageData, getRoutes } from '../lib/api';
import groq from 'groq';
import imageUrlBuilder from '@sanity/image-url';
import { NextSeo } from 'next-seo';
import client from '../client';
import Layout from '../components/Layout';
import RenderSections from '../components/RenderSections';

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

    // const { title, mainNavigation, footerNavigation, footerText, logo, url } = config;
    <Layout
      config={{
        title,
        titleTemplate: `${config.title} | %s`,
        description,
        // canonical: config.url && `${config.url}/${slug}`,
        // openGraph: {
        //   images: openGraphImages,
        // },
        // noindex: disallowRobots,
        ...site,
        // logo: site.logo,
        // url: site.url,
      }}
    >
      {content && <RenderSections sections={content} />}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  getSiteDetails();
  const { slug = '' } = params;
  const { data } = await getPageData(slug);
  const site = await getSiteDetails();
  const props = {
    props: { ...data, ...site.data },
  };
  //   console.log(`propssss: ${JSON.stringify(props, null, 2)}`);
  return props;
}

export async function getStaticPaths() {
  return getRoutes();
}
