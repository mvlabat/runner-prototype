import * as THREE from 'three';

import {
  threeFromCommonColor,
  threeFromCommonVector,
  threeToCommonColor,
  threeToCommonVector,
} from './ThreeConverters';
import CommonVector2 from '../Math/CommonVector2';
import CommonColor from '../Math/CommonColor';

describe('ThreeConverters', () => {
  describe(threeFromCommonVector, () => {
    it('converts', () => {
      const commonVector = new CommonVector2(1, 2);
      const threeVector = threeFromCommonVector(commonVector);
      expect(threeVector).toBeInstanceOf(THREE.Vector2);
      expect(threeVector.x).toEqual(commonVector.x);
      expect(threeVector.y).toEqual(commonVector.y);
    });
  });

  describe(threeToCommonVector, () => {
    it('converts', () => {
      const threeVector = new THREE.Vector2(1, 2);
      const commonVector = threeToCommonVector(threeVector);
      expect(commonVector).toBeInstanceOf(CommonVector2);
      expect(commonVector.x).toEqual(threeVector.x);
      expect(commonVector.y).toEqual(threeVector.y);
    });
  });

  describe(threeFromCommonColor, () => {
    it('converts', () => {
      const commonColor = new CommonColor([255, 0, 255]);
      const threeColor = threeFromCommonColor(commonColor);
      expect(threeColor).toBeInstanceOf(THREE.Color);
      expect(threeColor.r).toBeCloseTo(1);
      expect(threeColor.g).toBeCloseTo(0);
      expect(threeColor.b).toBeCloseTo(1);
    });
  });

  describe(threeToCommonColor, () => {
    it('converts', () => {
      const threeColor = new THREE.Color(1, 0, 1);
      const commonColor = threeToCommonColor(threeColor);
      expect(commonColor).toBeInstanceOf(CommonColor);
      expect(commonColor.r).toBeCloseTo(255);
      expect(commonColor.g).toBeCloseTo(0);
      expect(commonColor.b).toBeCloseTo(255);
    });
  });
});
