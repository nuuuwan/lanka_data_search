export default class DataSource {
  constructor(id, name, subSource, url, remoteBaseDir, twitterHandle) {
    this.id = id;
    this.name = name;
    this.subSource = subSource;
    this.url = url;
    this.remoteBaseDir = remoteBaseDir;
    this.twitterHandle = twitterHandle;
  }
}
