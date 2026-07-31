import fs from "node:fs/promises";
import path from "node:path";
import { Debounce } from "./Debounce";
import { resolvePath } from "./PathManager";

export class FileHandler<T> {
  private path: string;
  private isValid: (value: unknown) => value is T;
  private writeDebounce = new Debounce(this._write.bind(this), 1000);

  constructor(filePath: string, isValid: (value: unknown) => value is T) {
    this.path = resolvePath(filePath);
    this.isValid = isValid;
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
    const parsed: unknown = JSON.parse(result);
    if (!this.isValid(parsed)) {
      throw new Error(`Invalid JSON data in ${this.path}`);
    }
    return parsed;
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
