export default (req, res) => {
    res.statusCode = 200
    res.json({
        username : 'NyctibiusVII',
        name     : 'Matheus Vidigal',
        idade    : '19',
        hobby    : 'Programar'
    })
  }