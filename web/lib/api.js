import groq from 'groq';
import client from '../client';

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

const pathsQuery = groq`{
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

const siteConfigQuery = groq`
  {"site": *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  }`;

// export async function getSiteDetails() {
//   const res = await fetch('http://localhost:3000/api/siteDetails')
//     .then((resp) => resp.json()) // Transform the data into json
//     .then(function (data) {
//       const props = {
//         ...data,
//       };
//       console.log(props);
//       return props;
//     });
// }

export async function getSiteDetails() {
  const res = await client.fetch(siteConfigQuery).then((res) => ({ ...res }));

  const data = {
    data: { ...res },
  };

  return data;
}

export async function getPageData(slug) {
  const res = await client.fetch(pageQuery, { slug }).then((res) => ({ ...res, slug }));

  const data = {
    data: { ...res },
  };

  return data;
}

export async function getRoutes() {
  const { routes } = await client.fetch(pathsQuery);

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
