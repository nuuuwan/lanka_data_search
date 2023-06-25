export default class WWW {
  constructor(url) {
    this.url = url;
  }

  async readJSON() {
    const response = await fetch(this.url);
    const json = await response.json();
    return json;
  }
}
