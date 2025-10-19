import fs from "node:fs/promises";
import path from "node:path";
import { Debounce } from "./Debounce";

export class FileHandler<T> {
  private path: string;
  private writeDebounce = new Debounce(this._write.bind(this), 1000);

  constructor(path: string) {
    this.path = path;
  }

  private async _write(data: T) {
    await fs.mkdir(path.dirname(this.path), { recursive: true });
    return fs.writeFile(this.path, JSON.stringify(data), "utf-8");
  }

  public async exists(): Promise<boolean> {
    try {
      await fs.access(this.path);
      return true;
    } catch {
      return false;
    }
  }

  public async read(): Promise<T> {
    const result = await fs.readFile(this.path, "utf-8");
    return JSON.parse(result) as T;
  }

  public write(data: T, skipTimeout: boolean = false) {
    if (skipTimeout) {
      return this._write(data);
    }
    return this.writeDebounce.call(data);
  }

  public delete() {
    return fs.rm(this.path);
  }
}
