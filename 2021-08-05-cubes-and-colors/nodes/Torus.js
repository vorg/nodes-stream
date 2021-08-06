module.exports = function(node, graph) {
  const createTorus = require("primitive-torus");

  const RIn = node.in("R", 1.0);
  const rIn = node.in("r", 0.25);
  const majorSegmentsIn = node.in("majorSegments", 32, { precision: 0, min: 4, max: 128 });
  const minorSegmentsIn = node.in("minorSegments", 64, { precision: 0, min: 4, max: 64 })
  
  const geometryOut = node.out("geometry");

  function update() {
    const majorRadius = RIn.value
    const minorRadius = rIn.value
    const majorSegments = majorSegmentsIn.value
    const minorSegments = minorSegmentsIn.value
    var geom = createTorus({
      majorRadius,
      minorRadius,
      majorSegments,
      minorSegments
    })
    geom.uvs.forEach((uv) => {
      uv[0] *= 2
      uv[1] *= 1
    })
    geometryOut.setValue(geom);
  }

  RIn.onChange = update;
  rIn.onChange = update;
  majorSegmentsIn.onChange = update;
  minorSegmentsIn.onChange = update;
};


