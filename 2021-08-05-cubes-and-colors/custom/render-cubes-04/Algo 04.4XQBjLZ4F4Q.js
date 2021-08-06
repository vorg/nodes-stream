module.exports = (node, graph) => {
  const createCube = require("primitive-cube");
  const { vec3, utils: { map } } = require("pex-math");
  const random = require("pex-random");
  const freqIn = node.in('freq', 1)
  const { fromHSL } = require('pex-color')

  const geomOut = node.out("geom");

  function update() {
    const cube = createCube(2, 12, 2, 8, 24, 8);

    const freq = freqIn.value

    const g = {
      positions: [],
      scales: [],
      colors: [],
    };

    const centers = [
      [0, 6, 0],
      [6, 6, 6],
      [-6, 6, -6],
    ];

    for (let i = 0; i < 3; i++) {
      const hue = random.float()

      cube.positions.forEach((pos) => {
        const newPos = vec3.add(vec3.copy(pos), centers[i]);
        let s = 0.5;//random.float(0.1, 0.5);
        let noise = random.noise3(newPos[0] * freq, newPos[1] * freq, newPos[2] * freq)
        noise = noise * 0.5 + 0.5
        

        s = 0.6 * noise

        // const color = [
        //   Math.random(),
        //   Math.random(),
        //   Math.random(),
        //   Math.random(),
        // ];

        const cubeHue = hue + noise * 0.4
        const lightness = map(newPos[1], 0, 12, 0, 0.5)

        const color = fromHSL(cubeHue, 0.6, lightness)

        g.positions.push(newPos);
        g.colors.push(color);
        g.scales.push([s, s, s]);
      });
    }

    geomOut.setValue(g);
  }

  update();

  freqIn.onChange = update
};
