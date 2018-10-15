import set from 'jest-plugin-set';

import CommonColor from './CommonColor';

describe(CommonColor, () => {
  set('rgbArray', () => new Uint8Array([0, 100, 255]));
  set('color', () => new CommonColor(rgbArray));

  it('constructs', () => {
    expect(color).toMatchObject({ r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] });
    expect(color.rgbArray).toEqual(rgbArray);
  });

  it('really copies passed array', () => {
    const rgb = new Uint8Array([1, 2, 3]);
    const newColor = new CommonColor(rgb);
    newColor.r = 0;
    newColor.g = 0;
    newColor.b = 0;
    expect(rgb).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('can generate random color', () => {
    const newColor = CommonColor.random();
    expect(newColor.r).not.toEqual(newColor.g);
    expect(newColor.r).not.toEqual(newColor.b);
  });

  it("doesn't allow reassigning rgbArray", () => {
    expect(() => {
      color.rgbArray = new Uint8Array();
    }).toThrow(TypeError);
  });
});
