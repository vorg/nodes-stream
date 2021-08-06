module.exports = (node, graph) => {
  const geomIn = node.in("geom");
  const geomOut = node.out("instancedGeom");
  const random = require("pex-random")
  const countIn = node.in('count', 50, { precision: 0 })
  const seedIn = node.in('seed', 0, { precision: 0 })

  const update = (geom) => {
    if (!geom) return;

    const newGeom = {
      ...geom,
      offsets: { data: [], divisor: 1 },
    };

    random.seed(seedIn.value)

    for (var i = 0; i < countIn.value; i++) {
      const pos = random.vec3(5)
      // const pos = [
      //   Math.random() * 5 - 2.5,
      //   Math.random() * 5 - 2.5,
      //   Math.random() * 5 - 2.5,
      // ];
      newGeom.offsets.data.push(pos);
    }

    newGeom.instances = newGeom.offsets.data.length;

    geomOut.setValue(newGeom);
  };

  geomIn.onChange = update
  countIn.onChange = update
  seedIn.onChange = update
};
