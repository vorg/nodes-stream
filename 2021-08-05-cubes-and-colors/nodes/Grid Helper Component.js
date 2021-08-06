module.exports = (node, graph) => {
  const gridHelperOut = node.out("grid helper out", {});
  const colorIn = node.in("color in", [1, 1, 1, 1], { type: "color" });

  const renderer = graph.renderer;

  const gridHelperCmp = renderer.gridHelper({
    color: colorIn.value,
    size: 5,
  });
  gridHelperOut.setValue(gridHelperCmp);

  node.onReady = () => {
    gridHelperOut.setValue(gridHelperCmp);
  };

  colorIn.onChange = () => {
    gridHelperCmp.set({
      color: colorIn.value,
    });
  };
};
