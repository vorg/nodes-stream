module.exports = (node, graph) => {
  const createCube = require("primitive-cube");

  const sxIn = node.in("sx", 1);
  const syIn = node.in("sy", 1);
  const szIn = node.in("sz", 1);
  const nxIn = node.in("nx", 1, { precision: 0 });
  const nyIn = node.in("ny", 1, { precision: 0 });
  const nzIn = node.in("nz", 1, { precision: 0 });

  const geometryOut = node.out("geometry");

  function update() {
    var cube = createCube(
      sxIn.value,
      syIn.value,
      szIn.value,
      nxIn.value,
      nyIn.value,
      nzIn.value
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
};
