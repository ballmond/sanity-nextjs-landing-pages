export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5fbe7a336a8de2008b081e33',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-q484gio7',
                  apiId: 'e313868a-4f9a-4cd3-a380-dbb477e7289c'
                },
                {
                  buildHookId: '5fbe7a335744a5008e1cc7b4',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-mdf11erd',
                  apiId: 'a248f585-0169-4252-8f11-0cf298f1d572'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ballmond/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-mdf11erd.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
