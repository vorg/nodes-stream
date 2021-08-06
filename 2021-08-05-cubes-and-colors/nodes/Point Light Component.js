module.exports = (node, graph) => {
  const colorIn = node.in("color in", [1, 1, 1], { type: "color" });
  const intensityIn = node.in("intensity in", 1, { min: 0, max: 10 });
  const castShadowsIn = node.in("cast shadows", false);
  const pointLightOut = node.out("point light out", {});

  const renderer = graph.renderer;

  const pointLightCmp = renderer.pointLight({
    color: colorIn.value,
    intensity: intensityIn.value,
    castShadows: false,
  });
  pointLightOut.setValue(pointLightCmp);

  node.onReady = () => {
    pointLightOut.setValue(pointLightCmp);
  };

  colorIn.onChange = () => {
    pointLightCmp.set({
      color: colorIn.value,
    });
  };
  intensityIn.onChange = () => {
    pointLightCmp.set({
      intensity: intensityIn.value,
    });
  };
  castShadowsIn.onChange = () => {
    pointLightCmp.set({
      castShadows: castShadowsIn.value,
    });
  };
};
