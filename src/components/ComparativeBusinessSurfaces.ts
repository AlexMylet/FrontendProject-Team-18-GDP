import * as THREE from "three";
import { ComparativeBusiness } from "../types/business";

export const addComparativeBusinessSurfaces = (
  comparativeBusinesses: ComparativeBusiness[],
  scene: THREE.Scene,
) => {
  // Scene setup with black background
  scene.background = new THREE.Color("#000000");

  // Define common dimensions
  const width = 4.0;
  const height = 3.0;
  const depth = 3.0;

  // Create extended sales axis line and label
  const axisGeometry = new THREE.BufferGeometry();
  const axisVertices = new Float32Array([
    0,
    0,
    0, // Start point
    25,
    0,
    0, // End point - extended further
  ]);
  axisGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(axisVertices, 3),
  );
  const axisMaterial = new THREE.LineBasicMaterial({ color: "#DAA520" });
  const axisLine = new THREE.Line(axisGeometry, axisMaterial);
  scene.add(axisLine);

  // Add "Sales" label at the end of the axis
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    canvas.width = 256;
    canvas.height = 64;
    context.fillStyle = "#F97316";
    context.font = "bold 40px Arial";
    context.textAlign = "left";
    context.fillText("Sales", 0, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(26, 0, 0); // Position at end of axis
    sprite.scale.set(3, 0.75, 1);
    scene.add(sprite);
  }

  comparativeBusinesses.forEach((business, index) => {
    const position = business.positions[0];

    if (index === 0) {
      // Create diagonal triangular volume for hypergrowth area
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        // Base triangle
        0,
        0,
        0, // Origin
        7.5,
        0,
        3.75, // Point along diagonal on base
        3.75,
        0,
        7.5, // Point along diagonal on base

        // Top triangle (offset diagonally)
        0,
        7.5,
        0, // Top point at origin
        7.5,
        7.5,
        3.75, // Top point along diagonal
        3.75,
        7.5,
        7.5, // Top point along diagonal
      ]);

      const indices = new Uint16Array([
        // Base triangle
        0, 1, 2,
        // Top triangle
        3, 4, 5,
        // Side faces
        0, 1, 4, 0, 4, 3, 1, 2, 5, 1, 5, 4, 0, 2, 5, 0, 5, 3,
      ]);

      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      geometry.setIndex(new THREE.BufferAttribute(indices, 1));
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhongMaterial({
        color: "#DAA520", // Gold color
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });

      const volume = new THREE.Mesh(geometry, material);
      volume.position.set(0, 0, 0);
      scene.add(volume);
    } else {
      // Create box geometry for steady state area
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshPhongMaterial({
        color: "#FEC6A1", // Light orange
        transparent: true,
        opacity: 0.6,
      });

      const box = new THREE.Mesh(geometry, material);
      box.position.set(
        position.sales / 100,
        position.netProfit / 100 + 5, // Elevated position for steady state
        position.grossProfit / 100,
      );

      scene.add(box);
    }

    // Add text label for business name
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      canvas.width = 512;
      canvas.height = 128;
      context.fillStyle = "#F97316";
      context.font = "bold 40px Arial";
      context.textAlign = "center";
      context.fillText(business.name, 256, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);

      // Position the label
      const xPos = index === 0 ? 7 : position.sales / 100;
      const yPos = index === 0 ? 8 : position.netProfit / 100 + height / 2 + 6;
      const zPos = index === 0 ? 7 : position.grossProfit / 100;

      sprite.position.set(xPos, yPos, zPos);
      sprite.scale.set(5, 1.25, 1);
      scene.add(sprite);
    }
  });
};
