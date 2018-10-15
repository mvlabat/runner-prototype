import set from 'jest-plugin-set';

import CommonVector2 from './CommonVector2';
import Paper from '../Paper';

describe(CommonVector2, () => {
  set('vector', () => new CommonVector2(1, 2));

  it('defaults to x=0 and y=0', () => {
    const defaultVector = new CommonVector2();
    expect(defaultVector).toMatchObject({ x: 0, y: 0 });
  });

  it('sets values passed via constructor', () => {
    expect(vector).toMatchObject({ x: 1, y: 2 });
  });

  it('allows only numeric values', () => {
    expect(() => {
      vector.x = null;
    }).toThrow('Tried to set CommonVector2::x with not a numeric value: null (object)');
    expect(() => {
      vector.y = '1';
    }).toThrow('Tried to set CommonVector2::y with not a numeric value: 1 (string)');
  });

  it('constructs native paper.js vector', () => {
    expect(vector.nativeVector).toMatchObject({ x: 1, y: 2 });
  });

  it('updates native paper.js vector', () => {
    vector.x += 1;
    vector.y += 1;
    expect(vector.nativeVector).toMatchObject({ x: 2, y: 3 });
  });

  it('updates angle on updating coords', () => {
    const unitVector = new CommonVector2(1, 0);
    expect(unitVector.angle).toBe(0);
    unitVector.set(0, 1);
    expect(unitVector.angle).toBe(90);
  });

  it('updates coords on updating angle', () => {
    const unitVector = new CommonVector2(1, 0);
    unitVector.angle = 90;
    expect(unitVector.x).toBeCloseTo(0, 10);
    expect(unitVector.y).toBeCloseTo(1, 10);
  });

  it("doesn't allow reassigning paper.js vector", () => {
    expect(() => {
      vector.nativeVector = new Paper.Point();
    }).toThrow(TypeError);
  });
});
