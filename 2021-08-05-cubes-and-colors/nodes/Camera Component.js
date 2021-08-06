module.exports = (node, graph) => {
  const fitCanvas = node.in("resize viewport to fit canvas", true);
  const viewport = node.in("viewport", [0, 0, 1, 1], { connectable: false });
  const projectionIn = node.in("projection", "perspective", {
    type: "dropdown",
    values: ["perspective", "orthographic"],
  });

  const near = node.in("near", 0.1);
  const far = node.in("far", 100);
  const exposure = node.in("exposure", 1, { min: 0, max: 5 });
  const fov = node.in("fov", Math.PI / 4, {
    min: 0,
    max: (120 / 180) * Math.PI,
  });
  const focalLength = node.in("focalLength", 50, {
    min: 0,
    max: 200,
  });
  const fStop = node.in("fStop", 1.4, {
    min: 1.2,
    max: 256,
    step: 0.1,
    precision: 1,
  });
  const sensorSize = node.in("sensorSize", [36, 24], {
    min: 0,
    max: 100,
  });
  const sensorFit = node.in("sensorFit", "vertical", {
    type: "dropdown",
    values: ["vertical", "horizontal", "fill", "overscan"],
  });

  const cameraOut = node.out("camera out", {});

  const renderer = graph.renderer;
  const ctx = graph.ctx;

  function fitViewToCanvas() {
    if (fitCanvas.value) {
      if (
        ctx &&
        (ctx.gl.drawingBufferWidth.width !== cameraCmp.viewport[2] ||
          ctx.gl.drawingBufferHeight !== cameraCmp.viewport[3])
      ) {
        const v = viewport.value;
        const view = [
          ctx.gl.drawingBufferWidth * v[0],
          ctx.gl.drawingBufferHeight * v[1],
          ctx.gl.drawingBufferWidth * v[2],
          ctx.gl.drawingBufferHeight * v[3],
        ];

        node.comment = view;

        cameraCmp.set({
          viewport: view,
        });

        const viewSize = 5;
        const aspect = ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight;
        cameraCmp.set({
          left: (-0.5 * viewSize * aspect) / 2,
          right: (0.5 * viewSize * aspect) / 2,
          top: (0.5 * viewSize) / 2,
          bottom: (-0.5 * viewSize) / 2,
        });
      }
    }
  }

  const ports = [
    near,
    far,
    exposure,
    fov,
    focalLength,
    fStop,
    sensorSize,
    sensorFit,
  ];

  const initialState = ports.reduce(
    (previousValue, port) => {
      previousValue[port.name] = port.value;
      return previousValue;
    },
    {
      aspect: ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight,
      actualSensorHeight: 24, //mm
    }
  );

  const cameraCmp = renderer.camera(initialState);
  fitViewToCanvas();
  cameraOut.setValue(cameraCmp);

  projectionIn.onChange = (projection) => {
    cameraCmp.set({ projection: projection, zoom: 5 });
    fitViewToCanvas();
  };

  node.onReady = () => {
    fitViewToCanvas();
    cameraOut.setValue(cameraCmp);
  };

  node.onResize = () => {
    fitViewToCanvas();
  };

  viewport.onChange = fitViewToCanvas;

  ports.forEach((port) => {
    port.onChange = () => {
      cameraCmp.set({
        [port.name]: port.value,
      });
    };
  });
};
