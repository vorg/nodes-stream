module.exports = (node, graph) => {
  const skyboxIn = node.in("skybox in here", null);
  const reflectionProbeOut = node.out("reflection probe out", {});

  const renderer = graph.renderer;

  const reflectionProbeCmp = renderer.reflectionProbe();
  reflectionProbeOut.setValue(reflectionProbeCmp);

  node.onReady = () => {
    reflectionProbeOut.setValue(reflectionProbeCmp);
  };

  skyboxIn.onChange = () => {
    reflectionProbeCmp.set({ dirty: true });
  };
};
