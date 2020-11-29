import '../styles/shared.module.css';
import '../styles/layout.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
