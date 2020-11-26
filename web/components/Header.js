import styles from './Header.module.css';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import SVG from 'react-inlinesvg';
import HamburgerIcon from './icons/Hamburger';

export default function Header(props) {
  const renderLogo = (logo) => {
    console.log(`logoooo: ${logo}`);
    if (!logo || !logo.asset) {
      return null;
    }

    //   if (logo.asset.extension === 'svg') {
    //     return <SVG src={logo.asset.url} className={styles.logo} />;
    //   }

    //   return <img src={logo.asset.url} alt={logo.title} className={styles.logo} />;
  };

  const { title = 'Missing title', navItems, router, logo } = props;
  // const {showNav} = this.state
  const showNav = true;

  return (
    <div className={styles.root} data-show-nav={showNav}>
      <h1 className={styles.branding}>
        <Link
          href={{
            pathname: '/',
            query: {
              slug: '/',
            },
          }}
          as="/"
        >
          <a title={title}>{renderLogo(logo)}</a>
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          {navItems &&
            navItems.map((item) => {
              const { slug, title, _id } = item;
              const isActive = router.pathname === '/' && router.query.slug === slug.current;
              return (
                <li key={_id} className={styles.navItem}>
                  <Link
                    href={{
                      pathname: '/',
                      query: { slug: slug.current },
                    }}
                    as={`/${slug.current}`}
                  >
                    <a data-is-active={isActive ? 'true' : 'false'}>{title}</a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string,
    }),
    events: PropTypes.any,
  }),
  title: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.shape({
        current: PropTypes.string,
      }).isRequired,
    })
  ),
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
    }),
    logo: PropTypes.string,
  }),
};
