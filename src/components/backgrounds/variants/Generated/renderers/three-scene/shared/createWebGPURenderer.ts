import { WebGPURenderer } from "three/webgpu";

export const createWebGPURenderer = async (
  props: ConstructorParameters<typeof WebGPURenderer>[0],
) => {
  const renderer = new WebGPURenderer(props);
  await renderer.init();
  return renderer;
};
