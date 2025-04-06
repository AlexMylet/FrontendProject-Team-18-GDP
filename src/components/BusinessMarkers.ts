import * as THREE from "three";
import { Position } from "../types/business";

export const addBusinessMarkers = (
  positions: Position[],
  scene: THREE.Scene,
) => {
  positions.forEach((pos) => {
    const geometry = new THREE.SphereGeometry(0.4);
    const material = new THREE.MeshPhongMaterial({
      color: "#F97316",
      emissive: "#F97316",
      emissiveIntensity: 0.2,
    });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(
      pos.sales / 100,
      pos.grossProfit / 100,
      pos.netProfit / 100,
    );

    scene.add(sphere);

    // Add year label
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = "24px Arial";
      context.fillStyle = "#000000";
      context.fillText(pos.year, 0, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const labelMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(labelMaterial);
      sprite.position.set(
        sphere.position.x + 0.5,
        sphere.position.y + 0.5,
        sphere.position.z,
      );
      sprite.scale.set(1.5, 0.75, 1);
      scene.add(sprite);
    }
  });
};
