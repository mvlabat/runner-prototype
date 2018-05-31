import * as THREE from 'three';

/**
 * @param {Vector2} vector
 */
export function vector2Serialize(vector) {
  return {
    x: vector.x,
    y: vector.y,
  };
}

/**
 * @param jsonValue
 * @returns {Vector2}
 */
export function vector2Deserialize(jsonValue) {
  return new THREE.Vector2(jsonValue.x, jsonValue.y);
}

/**
 * @param {Vector2} color
 */
export function colorSerialize(color) {
  return `#${color.getHexString()}`;
}

/**
 * @param jsonValue
 * @returns {Vector2}
 */
export function colorDeserialize(jsonValue) {
  return new THREE.Color(jsonValue);
}
