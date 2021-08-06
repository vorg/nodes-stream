module.exports = (node, graph) => {
  const {
    quat,
    utils: { toRadians },
  } = require("pex-math");

  const triggerIn = node.triggerIn("in");
  const triggerOut = node.triggerOut("out");

  const tagsIn = node.in('tags', '', { connectable: false })
  const component1 = node.in("component 1", null);
  const component2 = node.in("component 2", null);
  const component3 = node.in("component 3", null);
  const component4 = node.in("component 4", null);
  const component5 = node.in("component 5", null);

  const transformPositionIn = node.in("position", [0, 0, 0]);
  const transformRotationIn = node.in("rotation", [0, 0, 0]);
  const transformScaleIn = node.in("scale", [1, 1, 1]);

  const renderer = graph.renderer;

  const entity = renderer.entity();
  const componentPorts = [
    component1,
    component2,
    component3,
    component4,
    component5,
  ];

  const rotationEuler = [0, 0, 0];
  const rotationQuat = [0, 0, 0, 1];

  function upateComponents() {
    const newComponents = componentPorts.map((p) => p.value).filter((v) => !!v);
    // Iterate over components and remove those that are no longer connected
    // unless it's built-in transform. We iterate in reverse order to avoid skipping
    // items as removing component modifies entity.components array
    for (let i = entity.components.length - 1; i >= 0; --i) {
      const component = entity.components[i];
      if (
        !newComponents.includes(component) &&
        component.type !== "Transform"
      ) {
        entity.removeComponent(component);
      }
    }
    // Iterate trough connected components and add those thare not added yet
    for (let i = 0; i < newComponents.length; i++) {
      const newComponent = newComponents[i];
      if (!entity.components.includes(newComponent)) {
        entity.addComponent(newComponent);
      }
    }
  }

  component1.onChange = upateComponents;
  component2.onChange = upateComponents;
  component3.onChange = upateComponents;
  component4.onChange = upateComponents;
  component5.onChange = upateComponents;

  triggerIn.onTrigger = (props) => {
    const ent = [entity];
    props.parentEntity.push(ent);

    const newProps = Object.assign({}, props, {
      parentEntity: ent,
    });

    triggerOut.trigger(newProps);
  };

  node.onDestroy = () => {
    //TODO: dispose entity
  };

  transformPositionIn.onChange = () => {
    entity.transform.set({
      position: transformPositionIn.value,
    });
  };

  transformRotationIn.onChange = () => {
    rotationEuler[0] = toRadians(transformRotationIn.value[0]);
    rotationEuler[1] = toRadians(transformRotationIn.value[1]);
    rotationEuler[2] = toRadians(transformRotationIn.value[2]);
    quat.fromEuler(rotationQuat, rotationEuler);

    entity.transform.set({
      rotation: rotationQuat,
    });
  };

  transformScaleIn.onChange = () => {
    entity.transform.set({
      scale: transformScaleIn.value,
    });
  };

  tagsIn.onChange = (tags) => {
    entity.tags = tags.trim().split(',')
    if (!entity.tags[0]) entity.tags = []     
  }
};
