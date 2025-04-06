import * as THREE from "three";

export const createAxisLabel = (
  text: string,
  position: THREE.Vector3,
  scene: THREE.Scene,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#000000";
    context.font = "32px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(4, 2, 1);
    scene.add(sprite);
  }
};

export const addNumericLabel = (
  value: number,
  position: THREE.Vector3,
  scene: THREE.Scene,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = "#000000";
    context.font = "24px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(value.toString(), 64, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    sprite.scale.set(2, 1, 1);
    scene.add(sprite);
  }
};

export const createGrid = () => {
  const gridSize = 30;
  const gridGeometry = new THREE.BufferGeometry();
  const gridMaterial = new THREE.LineBasicMaterial({ color: "#C8C8C9" });

  const vertices = [];

  // Create vertical lines (parallel to z-axis)
  for (let i = 0; i <= gridSize; i++) {
    vertices.push(i, 0, -gridSize / 2);
    vertices.push(i, 0, gridSize / 2);
  }

  // Create horizontal lines (parallel to x-axis)
  for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
    vertices.push(0, 0, i);
    vertices.push(gridSize, 0, i);
  }

  gridGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  return new THREE.LineSegments(gridGeometry, gridMaterial);
};
