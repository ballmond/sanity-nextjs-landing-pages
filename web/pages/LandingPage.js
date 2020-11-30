import { getSiteDetails, getFrontPage, getPosts } from '../lib/api';
import imageUrlBuilder from '@sanity/image-url';
import { NextSeo } from 'next-seo';
import client from '../client';
import Layout from '../components/Layout';
import RenderSections from '../components/RenderSections';
import styles from '../styles/LandingPage.module.css';
import PostPreview from '../components/PostPreview';
import { TextSection } from '../components/sections';
import SimpleBlockContent from '../components/SimpleBlockContent';

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
      <div className={styles.root}>
        <section className={styles.article}>
          <div className={styles.label}>{text[0].label}</div>
          <h2 className={styles.heading}>{text[0].heading}</h2>
          {text && <SimpleBlockContent blocks={text[0].text} />}
        </section>
      </div>
      <div className={styles.root}>
        <section className={styles.article}>
          <div className={styles.label}>{info[0].label}</div>
          <h2 className={styles.heading}>{info[0].heading}</h2>
          {text && <SimpleBlockContent blocks={info[0].text} />}
          <span>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.768009049789!2d-75.25916498342954!3d40.1474510798939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6bc9a2818dc7d%3A0xd504d1564cd27c54!2sGrace%20Baptist%20Church-Blue%20Bell!5e0!3m2!1sen!2sus!4v1606690073851!5m2!1sen!2sus"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </span>
        </section>
      </div>
      <div>{cta && <RenderSections sections={cta} />}</div>
      <div className={styles.root}>
        <div className={styles.content}>
          <span className={styles.title}>Upcoming Events</span>
          {events.map((e) => (
            <PostPreview {...e} key={e.slug} />
          ))}
        </div>
      </div>
      <div className={styles.root}>
        <div className={styles.content}>
          <span className={styles.title}>Sermon Audio</span>
          {sermons.map((e) => (
            <PostPreview {...e} key={e.slug} />
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
