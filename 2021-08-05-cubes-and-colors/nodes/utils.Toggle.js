module.exports = (node, graph) => {
  const triggerIn = node.triggerIn('in')
  const triggerOut = node.triggerOut('out')
  const enabledIn = node.in('enabled', true)
  
  triggerIn.onTrigger = (props) => {
    if (enabledIn.value) triggerOut.trigger(props)
  }
}