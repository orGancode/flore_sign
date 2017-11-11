module.exports = {
  /*
    hash name: {
      url: api url
    },
  */
  'welcome': {
    type: 'get',
    url: '/api/course/subject',
  },
  'sign-up': {
    type: 'get',
    url: '/api/course/subject',
  },
  'query': {
    type: 'get',
    url: '/api/course/subject',
  },
  'update-sign': {
    url: [
      {
        type: 'get',
        url: '/api/course/subject'
      },
      {
        type: 'get',
        url: '/api/apply/query',
        query: ['id', 'name', 'course_id', 'phone'],
      }
    ]
  }
}
