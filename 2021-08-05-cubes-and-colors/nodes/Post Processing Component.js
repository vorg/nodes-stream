module.exports = (node, graph) => {
  const postProcessingOut = node.out("post processing out", {});

  const fxaa = node.in("fxaa", true);

  const fog = node.in("fog", true);
  const fogColor = node.in("fogColor", [0.5, 0.5, 0.5], { type: "color" });
  const fogStart = node.in("fogStart", 5, { min: 0, max: 100 });
  const fogDensity = node.in("fogDensity", 0.15, { min: 0, max: 10 });

  const ssao = node.in("ssao", true);
  const ssaoIntensity = node.in("ssaoIntensity", 10, { min: 0, max: 100 });
  const ssaoRadius = node.in("ssaoRadius", 5, { min: 0, max: 30 });
  const ssaoBias = node.in("ssaoBias", 0.01, { min: 0, max: 1 });
  const ssaoBlurRadius = node.in("ssaoBlurRadius", 2, { min: 0, max: 5 });
  const ssaoBlurSharpness = node.in("ssaoBlurSharpness", 2, {
    min: 0,
    max: 20,
  });

  const dof = node.in("dof", false);
  const dofFocusDistance = node.in("dofFocusDistance", 10, {
    min: 0,
    max: 100,
  });

  const bloom = node.in("bloom", true);
  const bloomIntensity = node.in("bloomIntensity", 5, { min: 0, max: 100 });
  const bloomThreshold = node.in("bloomThreshold", -1, { min: -1, max: 2 });
  const bloomRadius = node.in("bloomRadius", 0.4, { min: 0, max: 10 });

  const renderer = graph.renderer;

  const ports = [
    fxaa,

    fog,
    fogColor,
    fogStart,
    fogDensity,

    ssao,
    ssaoIntensity,
    ssaoRadius,
    ssaoBias,
    ssaoBlurRadius,
    ssaoBlurSharpness,

    dof,
    dofFocusDistance,

    bloom,
    bloomIntensity,
    bloomThreshold,
    bloomRadius,
  ];

  const initialState = ports.reduce((previousValue, port) => {
    previousValue[port.name] = port.value;
    return previousValue;
  }, {});

  const postProcessingCmp = renderer.postProcessing(initialState);
  postProcessingOut.setValue(postProcessingCmp);

  node.onReady = () => {
    postProcessingOut.setValue(postProcessingCmp);
  };

  ports.forEach((port) => {
    port.onChange = () => {
      postProcessingCmp.set({
        [port.name]: port.value,
      });
    };
  });
};
