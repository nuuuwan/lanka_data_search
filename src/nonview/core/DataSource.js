export default class DataSource {
  constructor(id, name, subSource, url, twitterHandle) {
    this.id = id;
    this.name = name;
    this.subSource = subSource;
    this.url = url;
    this.twitterHandle = twitterHandle;
  }
}
