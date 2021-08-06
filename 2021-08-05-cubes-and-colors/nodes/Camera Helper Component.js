module.exports = (node, graph) => {
  const cameraHelperOut = node.out("camera helper out", {});
  const colorIn = node.in("color in", [1, 1, 1, 1], { type: "color" });

  const renderer = graph.renderer;

  const cameraHelperCmp = renderer.cameraHelper({
    color: colorIn.value,
  });
  cameraHelperOut.setValue(cameraHelperCmp);

  node.onReady = () => {
    cameraHelperOut.setValue(cameraHelperCmp);
  };

  colorIn.onChange = () => {
    cameraHelperCmp.set({
      color: colorIn.value,
    });
  };
};
