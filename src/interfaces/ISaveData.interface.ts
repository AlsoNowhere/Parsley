import { DirInfo } from "../models/DirInfo.model";

export interface ISaveData {
  allDirs: Record<string, DirInfo>;
  defaultFolder?: string;
}
