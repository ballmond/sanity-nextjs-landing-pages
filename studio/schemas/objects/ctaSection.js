export default {
  type: 'object',
  name: 'ctaSection',
  title: 'Call To Action Section',
  fields: [
    {
      name: 'ctas',
      type: 'array',
      title: 'Call to actions',
      of: [
        {
          title: 'Call to action',
          type: 'cta',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Call to Action',
        subtitle: 'Call to Action',
      }
    },
  },
}
