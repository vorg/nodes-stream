module.exports = function (node, graph) {
  const sunPosition = node.in("sunPosition", [1, 1, 1]);
  // if set to 1, blurs texture for background rendering, not reflections
  const blackgroundBlur = node.in("blackgroundBlur", true);
  const textureIn = node.in("texture", null);
  const backgroundTextureIn = node.in("background texture", null);

  const skyboxOut = node.out("skybox out", {});
  const setReflectionProbeOut = node.out("connect to reflection probe");

  const renderer = graph.renderer;

  let isProbDirty = true;

  const ports = [sunPosition, blackgroundBlur];

  const initialState = ports.reduce(
    (previousValue, port) => {
      previousValue[port.name] = port.value;
      return previousValue;
    },
    {
      texture: textureIn.value ? textureIn.value : null, // used for reflections instad of sky
      backgroundTexture: backgroundTextureIn.value
        ? backgroundTextureIn.value
        : null, // used for background rendering, not reflections,
    }
  );

  const skyboxCmp = renderer.skybox(initialState);
  skyboxOut.setValue(skyboxCmp);

  node.onReady = () => {
    skyboxOut.setValue(skyboxCmp);
  };

  ports.forEach((port) => {
    port.onChange = () => {
      skyboxCmp.set({
        [port.name]: port.value,
      });
    };
  });

  function checkReflectionProbe() {
    isProbDirty = !isProbDirty;
    setReflectionProbeOut.setValue(isProbDirty);
  }

  sunPosition.onChange = () => {
    skyboxCmp.set({ sunPosition: sunPosition.value })
    isProbDirty = false
    checkReflectionProbe()
  }

  textureIn.onChange = () => {
    skyboxCmp.set({
      texture: textureIn.value,
    });
    checkReflectionProbe();
  };

  backgroundTextureIn.onChange = () => {
    skyboxCmp.set({
      backgroundTexture: backgroundTextureIn.value,
    });
    checkReflectionProbe();
  };
};
