import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import client from '../client';
import styles from './PostPreview.module.css';
import DateFormatter from './dateFormatter';
import CoverImage from './CoverImage';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export default function PostPreview({ title, coverImage, publishedAt, excerpt, author, slug }) {
  console.log(slug);
  const builder = imageUrlBuilder(client);

  return (
    <div className={styles.root}>
      {coverImage ? (
        <div className={styles.cover}>
          <CoverImage
            slug={slug}
            title={title}
            // src={builder.image(coverImage).width(50).height(50)}
            src={urlFor(coverImage).width(50).auto('format').url()}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.container}>
        <Link passHref href={`/posts/${slug}`}>
          <a>
            <span className={styles.title}>{title}</span>
          </a>
        </Link>
        <div>
          <span>
            Posted {` `}
            <DateFormatter dateString={publishedAt} />
          </span>
        </div>
      </div>
    </div>
  );
}
