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

const postQuery = groq`
*[_type == "post" && slug.current == 'sunday-school'][0]
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
  }
  `;

const postsQuery = groq`
*[_type == 'post'] | order(publishedAt desc){
  title,
  'key': _rev,
  'slug': slug.current,
  body,
  'categories': categories[]->.title,
  'author': author->.name,
  publishedAt
}
  `;

const routesQuery = groq`
  *[_type == "route"] {
    ...,
    disallowRobot,
    includeInSitemap,
    page->{
      _id,
      title,
      _createdAt,
      _updatedAt
  }}
`;

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
  // const { routes } = await client.fetch(pathsQuery);

  // const props = {
  //   paths: routes.map((route) => {
  //     return {
  //       params: {
  //         slug: route.slug.current,
  //       },
  //     };
  //   }),
  //   fallback: false,
  // };

  // return props;
  const res = await client.fetch(routesQuery);
  const data = {
    data: res,
  };

  return data;
}

export async function getPost(slug) {
  const res = await client.fetch(postQuery, { slug });
  const data = {
    data: res,
  };

  return data;
}

export async function getPosts() {
  const res = await client.fetch(postsQuery);
  const data = {
    data: res,
  };

  return data;
}
