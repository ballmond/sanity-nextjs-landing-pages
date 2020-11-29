import Link from 'next/link';

export default function CoverImage({ title, src, slug }) {
  const image = <img src={src} alt={`Cover Image for ${title}`} />;

  return (
    <div>
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
