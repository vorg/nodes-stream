module.exports = function (node, graph) {
  var ctx = graph.ctx
  
  var url = node.in( 'url', '', { type: 'asset' })
  const tex = ctx.texture2D({
      pixelFormat: ctx.PixelFormat.RGBA32F,
      encoding: ctx.Encoding.Linear,
      flipY: true,
    	wrap : ctx.Wrap.ClampToEdge
    })
  var texture = node.out('texture out')
  
  url.onChange = function () {
    processImg()
  }
  
  function processImg(){
  	var textureImage = new Image()
    textureImage.src = url.value
    textureImage.onerror = function (e) {
      console.log('error', e)
    }
    textureImage.onload = function () {
      ctx.update(tex, {
        data: textureImage.value.data,
        width: textureImage.value.shape[0],
        height: textureImage.value.shape[1],
        mipmap: true,
        min: ctx.Filter.LinearMipmapLinear
      })
      node.commentImage = tex
    }
    texture.setValue(tex)
  }
  processImg();
}