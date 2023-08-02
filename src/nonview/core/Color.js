import COLOR_TO_TEXT_LIST from "./COLOR_TO_TEXT_LIST.js";
export default class Color {
  static forText(text) {
    for (const [color, keyList] of Object.entries(COLOR_TO_TEXT_LIST)) {
      for (const key of keyList) {
        if (text.toLowerCase().includes(key)) {
          return color;
        }
      }
    }
    return null;
  }
}
