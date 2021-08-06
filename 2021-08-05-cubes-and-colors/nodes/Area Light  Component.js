module.exports = (node, graph) => {
  const colorIn = node.in("color in", [1, 1, 1], { type: "color" });
  const intensityIn = node.in("intensity in", 1, { min: 0, max: 10 });
  const castShadowsIn = node.in("cast shadows", true);
  const areaLightOut = node.out("area light out", {});

  const renderer = graph.renderer;

  const areaLightCmp = renderer.areaLight({
    color: colorIn.value,
    intensity: intensityIn.value,
    castShadows: castShadowsIn.value,
  });
  areaLightOut.setValue(areaLightCmp);

  node.onReady = () => {
    areaLightOut.setValue(areaLightCmp);
  };

  colorIn.onChange = () => {
    areaLightCmp.set({
      color: colorIn.value,
    });
  };

  intensityIn.onChange = () => {
    areaLightCmp.set({
      intensity: intensityIn.value,
    });
  };

  castShadowsIn.onChange = () => {
    areaLightCmp.set({
      castShadows: castShadowsIn.value,
    });
  };
};
