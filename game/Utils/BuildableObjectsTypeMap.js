const typeMap = new Map();

export default class BuildableObjectsTypeMap {
  static registerType(type, objectClass) {
    typeMap.set(type, objectClass);
  }

  static getObjectClass(type) {
    return typeMap.get(type);
  }
}
