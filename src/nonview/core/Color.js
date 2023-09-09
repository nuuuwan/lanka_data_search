import COLOR_TO_TEXT_LIST from "./COLOR_TO_TEXT_LIST.js";

import RandomX from "../utils/RandomX.js";
export const COLORS_SL = ["#080", "#f80", "#800"];

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

  static getColor(i, n) {
    if (i < 3) {
      const colors = n === 1 ? RandomX.shuffle(COLORS_SL) : COLORS_SL;
      return colors[i];
    }
    const hue = ((i - 3) * 240) / (n - 1 - 3);
    return `hsla(${hue}, 100%, 50%, 0.5)`;
  }
}
