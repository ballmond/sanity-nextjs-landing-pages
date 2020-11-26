import client from '../../../client';
import groq from 'groq';

const siteConfigQuery = groq`
  *[_id == "global-config"] {
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
  `;

export default async function (req, res) {
  const d = await client.fetch(siteConfigQuery);

  const props = {
    data: {
      ...d,
    },
  };

  res.json(props);
}
