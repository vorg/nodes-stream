module.exports = function(node, graph) {
  const createRoundedCube = require("primitive-rounded-cube");

  const sxIn = node.in("sx", 1);
  const syIn = node.in("sy", 1);
  const szIn = node.in("sz", 1);
  const nxIn = node.in("nx", 20, { precision: 0 });
  const nyIn = node.in("ny", 20, { precision: 0 });
  const nzIn = node.in("nz", 20, { precision: 0 });
  const rIn = node.in("r", 0.2);
  
  const geometryOut = node.out("geometry");

  function update() {
    var cube = createRoundedCube(
      sxIn.value,
      syIn.value,
      szIn.value,
      nxIn.value,
      nyIn.value,
      nzIn.value,
      rIn.value
    );
    geometryOut.setValue(cube);
  }

  update()

  sxIn.onChange = update;
  syIn.onChange = update;
  szIn.onChange = update;
  nxIn.onChange = update;
  nyIn.onChange = update;
  nzIn.onChange = update;
  rIn.onChange = update;
};

