import * as THREE from 'three';

import CommonVector2 from 'common/Math/CommonVector2';
import CommonColor from 'common/Math/CommonColor';

/**
 * @param {Vector2} threeVector
 * @return {CommonVector2}
 */
export function threeToCommonVector(threeVector) {
  return new CommonVector2(threeVector.x, threeVector.y);
}

/**
 * @param {CommonVector2} commonVector
 * @return {Vector2}
 */
export function threeFromCommonVector(commonVector) {
  return new THREE.Vector2(commonVector.x, commonVector.y);
}

/**
 * @return {CommonColor}
 */
export function threeToCommonColor(threeColor) {
  return new CommonColor([threeColor.r * 255, threeColor.g * 255, threeColor.b * 255]);
}

/**
 * @param {CommonColor} commonColor
 */
export function threeFromCommonColor(commonColor) {
  return new THREE.Color(commonColor.r / 255, commonColor.g / 255, commonColor.b / 255);
}
