module.exports = (node, graph) => {
  const position = node.in("position", [5, 5, 5]);
  const target = node.in("target", [0, 0, 0]);
  const easing = node.in("easing", 0.1, { min: 0, max: 1 });

  const orbiterOut = node.out("orbiter out", {});

  const renderer = graph.renderer;
  const ctx = graph.ctx;

  const ports = [position, target, easing];

  const initialState = ports.reduce(
    (previousValue, port) => {
      previousValue[port.name] = port.value;
      return previousValue;
    },
    {
      element: ctx.gl.canvas,
      lat: 0,
      lon: Math.PI / 2,
    }
  );

  const orbiterCmp = renderer.orbiter(initialState);
  orbiterOut.setValue(orbiterCmp);

  node.onReady = () => {
    orbiterOut.setValue(orbiterCmp);
  };

  ports.forEach((port) => {
    port.onChange = () => {
      orbiterCmp.set({
        [port.name]: port.value,
      });
    };
  });
};
