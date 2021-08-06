module.exports = (node, graph) => {
  const axisHelperOut = node.out("axis helper out", {});
  const colorIn = node.in("color in", [1, 1, 1, 1], { type: "color" });

  const renderer = graph.renderer;

  const axisHelperCmp = renderer.axisHelper({
    color: colorIn.value,
  });
  axisHelperOut.setValue(axisHelperCmp);

  node.onReady = () => {
    axisHelperOut.setValue(axisHelperCmp);
  };

  colorIn.onChange = () => {
    axisHelperCmp.set({
      color: colorIn.value,
    });
  };
};
