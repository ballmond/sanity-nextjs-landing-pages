export default {
  name: 'postType',
  title: 'Post Type',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'Event Type',
    },
  },
}
