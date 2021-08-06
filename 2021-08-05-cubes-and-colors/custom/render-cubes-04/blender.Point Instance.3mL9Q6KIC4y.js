module.exports = (node, graph) => {
  const geometryIn = node.in('geometry')
  const objectIn = node.in('object')
  const geomOut = node.out('geom')

  function update() {
    const geometry = geometryIn.value
    const object = objectIn.value

    if (!geometry || !object) return

    const g = {
      ...object,
      offsets: { data: geometry.positions, divisor: 1 },
      scales: { data: geometry.scales, divisor: 1 },
      colors: { data: geometry.colors, divisor: 1 },
      instances: geometry.positions.length
    }

    console.log('g', g)

    geomOut.setValue(g)
  }

  geometryIn.onChange = update
  objectIn.onChange = update
};