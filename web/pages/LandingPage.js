import { getSiteDetails, getFrontPage, getPosts } from '../lib/api';
import imageUrlBuilder from '@sanity/image-url';
import { NextSeo } from 'next-seo';
import client from '../client';
import Layout from '../components/Layout';
import RenderSections from '../components/RenderSections';
import styles from './LandingPage.module.css';
import PostPreview from '../components/PostPreview';

export default function LandingPage({ page, site, events, sermons, slug }) {
  const builder = imageUrlBuilder(client);
  const {
    title = 'Missing title',
    description,
    disallowRobots,
    openGraphImage,
    config = {},
    hero,
    text,
    info,
    cta,
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
      <div>
        <span>{hero && <RenderSections sections={hero} />}</span>
      </div>
      <div>
        <span>{text && <RenderSections sections={text} />}</span>
      </div>
      <div>{cta && <RenderSections sections={cta} />}</div>
      {/*
      <div>
        <h1>Upcoming Events</h1>
        {events && <RenderSections sections={events} />}
      </div>
      <div>
        <h1>Sermon Audio</h1>
        {sermons && <RenderSections sections={sermons} />}
      </div>
      <div>{info && <RenderSections sections={info} />}</div>
      */}
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
            <h4 key={e.slug}>{e.title}</h4>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const slug = 'LandingPage';
  const { data } = await getFrontPage();
  const { data: events } = await getPosts('Event', 5);
  const { data: sermons } = await getPosts('Sermon', 5);

  const site = await getSiteDetails();
  const props = {
    props: {
      events,
      sermons,
      ...data,
      ...site.data,
    },
  };

  return props;
}
