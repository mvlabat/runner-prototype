import Paper from '../Paper';

function CommonPath(segments) {
  return new CommonPathNative(segments);
}

CommonPath.Circle = function CommonCircle(position, radius) {
  return new CommonPathNative(new Paper.Path.Circle(position, radius));
};

CommonPath.Rectangle = function CommonRectangle(from, to) {
  return new CommonPathNative(new Paper.Path.Rectangle(from, to));
};

function CommonPathNative(nativePath) {
  this.constructor = CommonPath;
  this.nativePath = nativePath;
}

export default CommonPath;
