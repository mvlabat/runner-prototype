import * as THREE from 'three';

// eslint-disable-next-line import/prefer-default-export
export function randomColor() {
  return new THREE.Color(Math.round(Math.random() * 0xffffff));
}
