module.exports = (node, graph) => {
  const createCube = require("primitive-cube");

  const geometryIn = node.in("geometry", null);

  const componentOut = node.out("component", null);

  const renderer = graph.renderer;

  let geometryCmp = renderer.geometry(createCube());
  componentOut.setValue(geometryCmp);

  let oldGeometry = null;

  geometryIn.onChange = () => {
    const geometry = geometryIn.value || createCube();
    // if whole geometry object changed is better to recreate whole component
    // as we might have completely different set of attributes e.g. instancedOffset
    if (geometry !== oldGeometry) {
      oldGeometry = geometry;
      // TODO: dispose old geometry component
      // geometryCmp = renderer.geometry(geometry);
      geometryCmp.set(geometry)

      componentOut.setValue(geometryCmp);
    } else {
      // otherwise simply update geometry component attributes and props
      geometryCmp.set(geometry);
    }
  };
};
