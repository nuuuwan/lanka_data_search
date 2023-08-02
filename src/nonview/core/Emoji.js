import EMOJI_TO_TEXT_LIST from "./EMOJI_TO_TEXT_LIST.js";
export default class Emoji {
  constructor(text) {
    this.text = text;
  }

  get emojis() {
    const haystack = this.text.toLowerCase();

    return Object.entries(EMOJI_TO_TEXT_LIST).reduce(function (
      s,
      [emoji, textList]
    ) {
      for (const text of textList) {
        if (haystack.includes(text.toLowerCase())) {
          return `${emoji}${s}`;
        }
      }
      return s;
    },
    "");
  }
}
