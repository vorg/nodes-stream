module.exports = (node, graph) => {
  const createCube = require("primitive-cube");
  const { vec3, utils: { map } } = require("pex-math");
  const random = require("pex-random");
  const freqIn = node.in('freq', 1)
  const { fromHSL, fromHex } = require('pex-color')
  const chromotome = require('chromotome')

  const palettes = chromotome.getAll()



  const geomOut = node.out("geom");

  function update() {
    const cube = createCube(3, 12, 3, 8, 24, 8);

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
      //const pallete = palettes[random.int(0, palettes.length)]
      const pallete = random.element(palettes)
      const colors = pallete.colors.map(fromHex)      

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

        //const color = fromHSL(cubeHue, 0.6, lightness)
        const color = [1, 1, 1, Math.random()]

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
