export default class StringX {
  static camelToNormal(s) {
    return s.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }
}
