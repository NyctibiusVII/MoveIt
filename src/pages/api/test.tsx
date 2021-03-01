export default (req, res) => {
    res.statusCode = 200
    res.json({
        userName: 'NyctibiusVII',
        name: 'Matheus Vidigal',
        idade: '19',
        hobby: 'Programar'
    })
  }