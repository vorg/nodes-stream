module.exports = (node, graph) => {
  const { getHex } = require('pex-color')
  const colorIn = node.in('color', [1, 1, 1, 1], { type: 'color' })
  
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  
  const ctx2d = canvas.getContext('2d')
  ctx2d.fillStyle = '#f1c40f' //yellow
  ctx2d.fillRect(0, 0, canvas.width, canvas.height)
  
  node.commentImage = canvas
  
  const ctx = graph.ctx
  const texture = ctx.texture2D({ data: canvas, encoding: ctx.Encoding.SRGB })
  
  
  colorIn.onChange = () => {
    ctx2d.fillStyle = getHex(colorIn.value)
    ctx2d.fillRect(0, 0, 100, 100)
    ctx.update(texture, { data: canvas })
  }
  
  node.out('texture', texture)
}