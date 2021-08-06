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

    random.seed(1)

    for (let i = 0; i < centers.length; i++) {
      const hue = random.float()
      //const pallete = palettes[random.int(0, palettes.length)]
      const pallete = random.element(palettes)
      const colors = pallete.colors.map(fromHex)      
      //const center = [random.float(-10, 10), 6, random.float(-10, 10)]
      const center = centers[i]
      cube.positions.forEach((pos) => {        
        
        const newPos = vec3.add(vec3.copy(pos), center);
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
        // const color = [1, 1, 1, Math.random()]
        let color = random.element(colors)
        color = colors[Math.floor(colors.length * noise)]

        g.positions.push(newPos);
        g.colors.push(color);
        g.scales.push([s, s, s]);
      });

      // g.positions.push([center[0], 0, center[2]])
      // g.scales.push([6, 0.1, 6])
      // g.colors.push([0.7, 0.7, 0.7, 1])

    }

    geomOut.setValue(g);
  }

  update();

  freqIn.onChange = update
};
