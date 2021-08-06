module.exports = (node, graph) => {
  const tex = null;

  const baseColor = node.in("baseColor", [1, 1, 1, 1], { type: "color" });
  const emissiveColor = node.in("emissiveColor", [0, 0, 0, 1], {
    type: "color",
  });
  const emissiveIntensity = node.in("emissiveIntensity", 2, {
    min: 0,
    max: 10,
  });
  const metallic = node.in("metallic", 0, { min: 0, max: 1 });
  const roughness = node.in("roughness", 0.5, { min: 0, max: 1 });

  const reflectance = node.in("reflectance", 0.5, { min: 0, max: 1 });

  const castShadows = node.in("castShadows", false);
  const receiveShadows = node.in("receiveShadows", false);
  const unlit = node.in("unlit", false);

  const blend = node.in("blend", false);
  const depthTest = node.in("depthTest", true);
  const depthWrite = node.in("depthWrite", true);
  const cullFace = node.in("cullFace", true);
  const pointSize = node.in("pointSize", 4, { min: 0 });

  const materialOut = node.out("material out", null);

  const renderer = graph.renderer;
  const ctx = graph.ctx;

  const ports = [
    baseColor,
    emissiveColor,
    emissiveIntensity,
    metallic,
    roughness,
    reflectance,
    castShadows,
    receiveShadows,
    unlit,
    blend,
    depthTest,
    depthWrite,
    cullFace,
    pointSize,
  ];

  const initialState = ports.reduce(
    (previousValue, port) => {
      previousValue[port.name] = port.value;
      return previousValue;
    },
    {
      blendSrcRGBFactor: ctx.BlendFactor.SrcAlpha,
      blendSrcAlphaFactor: ctx.BlendFactor.One,
      blendDstRGBFactor: ctx.BlendFactor.OneMinusSrcAlpha,
      blendDstAlphaFactor: ctx.BlendFactor.One,
    }
  );

  const materialCmp = renderer.material(initialState);
  materialOut.setValue(materialCmp);

  node.onReady = () => {
    materialOut.setValue(materialCmp);
  };

  ports.forEach((port) => {
    port.onChange = () => {
      materialCmp.set({
        [port.name]: port.value,
      });
    };
  });
};
