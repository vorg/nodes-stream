module.exports = function(node, graph) {
  const createSphere = require("primitive-sphere");

  const rIn = node.in("r", 0.5);
  const segmentsIn = node.in("segments", 16, { precision: 0, min: 8, max: 64 });

  const geometryOut = node.out("geometry");

  function update() {
    const r = rIn.value
    const segments = segmentsIn.value
    var geom = createSphere(r, { segments: segments })
    geometryOut.setValue(geom);
  }

  rIn.onChange = update;
  segmentsIn.onChange = update;
};

