import groq from 'groq';
import client from '../client';

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

export async function getSiteDetails() {
  const res = await client.fetch(siteConfigQuery).then((res) => ({ ...res }));

  const data = {
    data: { ...res },
  };

  return data;
}

export async function getPageData(slug) {
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

  const res = await client.fetch(pageQuery, { slug }).then((res) => ({ ...res, slug }));

  const data = {
    data: { ...res },
  };

  return data;
}

export async function getRoutes() {
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
  }} | [slug.current != 'LandingPage']
`;

  const res = await client.fetch(routesQuery);
  const data = {
    data: res,
  };

  return data;
}

export async function getPost(slug) {
  const postQuery = groq`
  *[_type == "post" && slug.current == '${slug}'][0]
  `;
  const res = await client.fetch(postQuery, { slug });
  const data = {
    data: res,
  };

  return data;
}

export async function getPosts(postType, limit = 0) {
  const limitStr = limit > 0 ? `[0...${limit}]` : '';
  const typeStr = postType ? ` | [type == '${postType}']` : ``;
  const query = groq`
*[_type == 'post'] | order(publishedAt desc){
  title,
  'key': slug.current,
  'slug': slug.current,
  body,
  "type": postType->label,
  'tags': tags[]->.label,
  'author': author->.name,
  publishedAt,
  _type,
  "coverImage": mainImage
} ${typeStr} ${limitStr}
`;

  const res = await client.fetch(query);
  const data = {
    data: res,
  };

  return data;
}

export async function getFrontPage(slug = 'Frontpage') {
  const query = groq`
*[_type == 'page' && title=='${slug}'][0]{
  "page":{
  "hero": content | [_type == 'hero'] {...},
  "cta": content | [_type == 'ctaSection'] {..., ctas[]{..., route->}},
  "text": content | [_type == 'textSection'] | [slug.current == 'welcome'] {...},
  "info": content | [_type == 'textSection'] | [slug.current == 'info'] {...}
	}
}  
`;

  const res = await client.fetch(query);
  const data = {
    data: res,
  };

  return data;
}
