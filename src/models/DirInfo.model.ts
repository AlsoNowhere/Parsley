export class DirInfo {
  tags: Record<string, Array<string>>;

  constructor(tags: Record<string, Array<string>> = {}) {
    this.tags = tags;
  }
}
