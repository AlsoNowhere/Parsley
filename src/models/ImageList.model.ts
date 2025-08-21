import { Picture } from "./Picture.model";

export class ImageList {
  dir: string;
  images: Array<Picture>;
  folders: Array<ImageList>;

  constructor(dir: string, images: Array<Picture>, folders: Array<ImageList>) {
    this.dir = dir;
    this.images = images;
    this.folders = folders;
  }
}
