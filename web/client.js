const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'uceh32hl',
  dataset: 'production',
  token: '', // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
});

module.exports = client;

// import sanityClient from '@sanity/client';
// export default function () {
//   return sanityClient({
//     projectId: 'uceh32hl',
//     dataset: 'production',
//     token: '', // or leave blank to be anonymous user
//     useCdn: false, // `false` if you want to ensure fresh data
//   });
// }
