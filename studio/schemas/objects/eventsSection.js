export default {
  type: 'object',
  name: 'eventsSection',
  title: 'Dynamic Events Section',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'numberOfEvents',
      type: 'number',
      title: 'No. of Events',
    },
  ],
  preview: {
    select: {
      heading: 'label',
    },
    prepare({ heading }) {
      return {
        title: `${heading}`,
        subtitle: 'Events Section',
      }
    },
  },
}
