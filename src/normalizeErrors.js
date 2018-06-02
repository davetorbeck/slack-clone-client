export default (errors) =>
  errors.reduce((acc, cur) => {
    cur.path in acc ? acc[cur.path].push(cur.message) : (acc[cur.path] = [cur.message])

    return acc
  }, {})
