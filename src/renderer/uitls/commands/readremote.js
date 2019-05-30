import request from 'request'

export function readremote (token, records, callback) {
  var metas = []

  records.forEach(record => {
    request.get('http://123.206.107.58:8000/download/' + record.key + '?token=' + token, (err, res, body) => {
      console.log(body)
      if (err) {
        console.error(err)
        return
      }

      var r = JSON.parse(body)
      if (r.status !== 'ok') {
        return
      }

      var meta = null

      if (r.content.startsWith('ENCRYPTED')) {
        meta = {
          path: 'brdweb://notes/' + record.key,
          date: r.date,
          title: '文档已加密',
          tags: [],
          delta: {
            ops: [
              { insert: '文档已加密' }
            ]
          }
        }
      } else {
        var data = JSON.parse(r.content)
        data.content = JSON.parse(data.content)

        meta = {
          path: 'brdweb://notes/' + record.key,
          date: r.date,
          title: data.title,
          tags: data.tags,
          delta: data.content
        }
      }

      metas.push(meta)
    })
  })

  if (typeof callback === 'function') {
    callback(metas)
  }
}

export default readremote
