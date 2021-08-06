module.exports = (node, graph) => {
  node.comment = "Enables pex-context debug \nmode for one frame";
  const triggerIn = node.triggerIn("in");
  const triggerOut = node.triggerOut("out");
  
  let debugNextFrame = false;
  const debug = node.in("debug", () => {
    debugNextFrame = true;
  });

  triggerIn.onTrigger = (props) => {
    const ctx = graph.ctx;
    if (debugNextFrame) ctx.debug(true);
    triggerOut.trigger(props);
    if (debugNextFrame) {
      ctx.debug(false);
      debugNextFrame = false;
    }
  };
};
