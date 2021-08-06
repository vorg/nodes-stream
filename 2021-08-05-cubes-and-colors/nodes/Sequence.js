module.exports = function (node, graph) {
  const triggerIn = node.triggerIn('in')
  const triggerOut = node.triggerOut('out')
  const triggerOut2 = node.triggerOut('out2')
  const triggerOut3 = node.triggerOut('out3')
  const triggerOut4 = node.triggerOut('out4')
  const triggerOut5 = node.triggerOut('out5')
  const triggerOut6 = node.triggerOut('out6')
  const triggerOut7 = node.triggerOut('out7')
  
  triggerIn.onTrigger = (props) => {
    triggerOut.trigger(props)
    triggerOut2.trigger(props)
    triggerOut3.trigger(props)
    triggerOut4.trigger(props)
    triggerOut5.trigger(props)
    triggerOut6.trigger(props)
    triggerOut7.trigger(props)
  }
  
}