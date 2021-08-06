module.exports = (node, graph) => {
  const lightHelperOut = node.out("area light out", {});

  const renderer = graph.renderer;

  const lightHelperCmp = renderer.lightHelper();
  lightHelperOut.setValue(lightHelperCmp);

  node.onReady = () => {
    lightHelperOut.setValue(lightHelperCmp);
  };
};
