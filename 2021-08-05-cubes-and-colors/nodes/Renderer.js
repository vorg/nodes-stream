module.exports = (node, graph) => {
  const Renderer = require("pex-renderer");

  const ctx = graph.ctx;
  ctx.gl.getExtension("EXT_shader_texture_lod");
  ctx.gl.getExtension("OES_standard_derivatives");
  ctx.gl.getExtension("WEBGL_draw_buffers");
  ctx.gl.getExtension("OES_texture_float");
  ctx.gl.getExtension("OES_element_index_uint");

  const renderer = new Renderer({
    shadowQuality: 4,
    // rgbm: true,
    ctx,
    pauseOnBlur: false,
  });

  graph.renderer = renderer;

  const triggerIn = node.triggerIn("in");
  const triggerOut = node.triggerOut("out");

  const initialState = {
    transform: {
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
    },
    material: {
      baseColor: [1, 0, 0, 1],
      roughness: 0.5,
      metallic: 0.1,
      primitive: graph.ctx.Primitive.Triangles,
    },
  };

  renderer.root.name = "Root " + Date.now();
  node.error = "";

  function visit(entities, entityList) {
    if (entityList.length) {
      var parent = entityList[0];
      entities.push(parent);
      for (let i = 1; i < entityList.length; i++) {
        var entity = entityList[i];
        if (entity.length) {
          renderer.add(entity[0], parent);
        }
        visit(entities, entity);
      }
    } else {
      entities(entityList);
    }
    return entities;
  }

  const clearCmd = {
    pass: ctx.pass({
      clearColor: [0, 0, 0, 1],
      clearDepth: 1,
    }),
  };

  triggerIn.onTrigger = function (props) {
    if (node.error) return;

    ctx.submit(clearCmd);

    const entity = [renderer.root];
    const newProps = Object.assign({}, props, initialState, {
      parentEntity: entity,
    });
    let entities = [];
    try {
      triggerOut.trigger(newProps);

      entities = visit([], entity);

      renderer.draw();
    } catch (e) {
      node.error = e.message;
      console.log(e);
    }

    node.comment = "Entities: " + entities.length;

    entities.forEach((ent) => {
      renderer.remove(ent);
    });

    // remove top level entities
    //renderer.root.transform.children.forEach((child) => {
    //  renderer.remove(child.entity)
    //})
  };

  node.onDestroy = function () {
    graph.renderer = null;
    // TODO: Release all resources, but actualy if now Context is
    // a separate node we can just keep everything
    //renderer.dispose()
  };
};
