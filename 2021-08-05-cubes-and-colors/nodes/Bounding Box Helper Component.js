module.exports = (node, graph) => {
  const boundingBoxHelperOut = node.out("boundingBox helper out", {});
  const colorIn = node.in("color in", [1, 1, 1, 1], { type: "color" });

  const renderer = graph.renderer;

  const boundingBoxHelperCmp = renderer.boundingBoxHelper({
    color: colorIn.value,
  });
  boundingBoxHelperOut.setValue(boundingBoxHelperCmp);

  node.onReady = () => {
    boundingBoxHelperOut.setValue(boundingBoxHelperCmp);
  };

  colorIn.onChange = () => {
    boundingBoxHelperCmp.set({
      color: colorIn.value,
    });
  };
};
