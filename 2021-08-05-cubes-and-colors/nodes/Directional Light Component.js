module.exports = (node, graph) => {
  const colorIn = node.in("color in", [1, 1, 1], { type: "color" });
  const intensityIn = node.in("intensity in", 1, { min: 0, max: 10 });
  const castShadowsIn = node.in("cast shadows", true);
  const directionalLightOut = node.out("directional light out", {});

  const renderer = graph.renderer;

  const directionalLightCmp = renderer.directionalLight({
    color: colorIn.value,
    intensity: intensityIn.value,
    castShadows: true,
  });
  directionalLightOut.setValue(directionalLightCmp);

  node.onReady = () => {
    directionalLightOut.setValue(directionalLightCmp);
  };

  colorIn.onChange = () => {
    directionalLightCmp.set({
      color: colorIn.value,
    });
  };
  intensityIn.onChange = () => {
    directionalLightCmp.set({
      intensity: intensityIn.value,
    });
  };
  castShadowsIn.onChange = () => {
    directionalLightCmp.set({
      castShadows: castShadowsIn.value,
    });
  };
};
