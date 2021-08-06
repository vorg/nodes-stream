module.exports = (node, graph) => {
  const createCube = require("primitive-cube");
  const { vec3 } = require("pex-math");
  const random = require("pex-random");

  const geomOut = node.out("geom");

  function update() {
    const cube = createCube(3, 3, 3, 3, 3, 3);

    const g = {
      positions: [],
      scales: [],
      colors: [],
    };

    const centers = [
      [0, 0, 0],
      [6, 0, 6],
      [-6, 0, -6],
    ];
    for (let i = 0; i < 3; i++) {
      cube.positions.forEach((pos) => {
        const newPos = vec3.add(vec3.copy(pos), centers[i]);
        const s = random.float(0.15, 0.8);
        const color = [
          Math.random(),
          0,// Math.random(),
          0,// Math.random(),
          Math.random(),
        ];
        g.positions.push(newPos);
        g.colors.push(color);
        g.scales.push([s, s, s]);
      });
    }

    geomOut.setValue(g);
  }

  update();
};
