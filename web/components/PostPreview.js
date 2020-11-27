import Link from 'next/link';
import styles from './PostPreview.module.css';
import DateFormatter from './dateFormatter';

export default function PostPreview({ title, coverImage, date, excerpt, author, slug }) {
  return (
    <div>
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
