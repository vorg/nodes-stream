module.exports = (node, graph) => {
  const { loadText } = require("pex-io");
  const parseObj = require("geom-parse-obj");
  const computeNormals = require("geom-normals");

  const url = node.in("url", "", { type: "asset", filter: /\.obj/ });
  const geometryOut = node.out("geometry", null);

  url.onChange = function () {
    loadText(url.value, (err, str) => {
      if (err) node.err = "" + err;

      var g = parseObj(str);
      if (!g.normals) g.normals = computeNormals(g.positions, g.cells);
      if (!g.uvs) g.uvs = g.positions.map(() => [0, 0]);
      var flatCells = [];
      for (var i = 0; i < g.cells.length; i++) {
        flatCells.push(g.cells[i][0]);
        flatCells.push(g.cells[i][1]);
        flatCells.push(g.cells[i][2]);
      }

      g.cells = {
        data: new Uint32Array(flatCells),
        type: graph.ctx.DataType.Uint32,
      };

      //let geom = renderer.geometry(g)
      //console.log('geom',geom)
      geometryOut.setValue(g);
    });
  };
};
