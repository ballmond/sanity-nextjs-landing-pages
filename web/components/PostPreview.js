import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import client from '../client';
import styles from './PostPreview.module.css';
import DateFormatter from './dateFormatter';
import CoverImage from './CoverImage';

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }) {
  const builder = imageUrlBuilder(client);

  return (
    <div>
      {coverImage ? (
        <span className="">
          <CoverImage
            slug={slug}
            title={title}
            src={builder.image(coverImage).width(50).height(50)}
          />
        </span>
      ) : (
        <></>
      )}
      <h3 className="">
        <Link href={`/posts/${slug}`}>
          <a className="">{title}</a>
        </Link>
      </h3>
      <div className="">
        <span>
          Posted {` `}
          <DateFormatter dateString={date} />
        </span>
      </div>
    </div>
  );
}
