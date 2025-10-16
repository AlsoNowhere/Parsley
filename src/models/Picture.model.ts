export class Picture {
  fileName: string;
  folder: string;
  fullLocation: string;
  tags: Array<string>;

  constructor(fileName: string, folder: string, tags: Array<string>) {
    this.fileName = fileName;
    this.folder = folder;
    this.fullLocation = this.folder + "\\" + this.fileName;
    this.tags = tags;
  }
}
