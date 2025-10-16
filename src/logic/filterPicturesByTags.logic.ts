import { Picture } from "../models/Picture.model";

export const filterPicturesByTags = (pictures: Array<Picture>, tags: Array<string>) => {
  if (tags.length === 0) return pictures;

  // const output: Array<Picture> = [];

  // for (let picture of pictures) {
  //   for (let tag of picture.tags) {
  //     if (tags.includes(tag)) {
  //       output.push(picture);
  //       break;
  //     }
  //   }
  // }

  const output: Array<Picture> = [...pictures];

  for (let picture of pictures) {
    for (let tag of tags) {
      if (!picture.tags.includes(tag)) {
        const index = output.indexOf(picture);

        output.splice(index, 1);

        break;
      }
    }
  }

  return output;
};
