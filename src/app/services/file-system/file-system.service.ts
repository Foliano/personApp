import { Injectable } from '@angular/core';
import {
  Plugins,
  FilesystemDirectory,
  FileWriteOptions,
  FileReadOptions,
  FileReadResult,
  FileAppendOptions,
  FileDeleteOptions,
  MkdirOptions,
  MkdirResult,
  FileAppendResult,
  FileWriteResult,
  RmdirOptions,
  RmdirResult,
  CopyOptions,
  CopyResult,
  StatResult,
  ReaddirResult,
  StatOptions,
  RenameOptions,
  RenameResult
} from '@capacitor/core';

const { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  public async fileWrite(
    fileWriteOptions: FileWriteOptions
  ): Promise<FileWriteResult> {
    try {
      return await Filesystem.writeFile(fileWriteOptions);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  public async fileRead(
    fileReadOptions: FileReadOptions
  ): Promise<FileReadResult> {
    return await Filesystem.readFile(fileReadOptions);
  }

  public async fileAppend(
    fileAppendOptions: FileAppendOptions
  ): Promise<FileAppendResult> {
    return await Filesystem.appendFile(fileAppendOptions);
  }

  public async fileDelete(fileDeleteOptions: FileDeleteOptions): Promise<void> {
    await Filesystem.deleteFile(fileDeleteOptions);
  }

  public async mkdir(mkdirOptions: MkdirOptions): Promise<MkdirResult> {
    try {
      return await Filesystem.mkdir(mkdirOptions);
    } catch (e) {
      console.error('Unable to make directory', e);
    }
  }

  public async rmdir(rmdirOptions: RmdirOptions): Promise<RmdirResult> {
    try {
      return await Filesystem.rmdir(rmdirOptions);
    } catch (e) {
      console.error('Unable to remove directory', e);
    }
  }

  public async readdir(): Promise<ReaddirResult> {
    try {
      return await Filesystem.readdir({
        path: 'secrets',
        directory: FilesystemDirectory.Documents
      });
    } catch (e) {
      console.error('Unable to read dir', e);
    }
  }

  public async stat(statOptions: StatOptions): Promise<StatResult> {
    try {
      return await Filesystem.stat(statOptions);
    } catch (e) {
      console.error('Unable to stat file', e);
    }
  }

  public async readFilePath(
    readFilePathOptions: FileReadOptions
  ): Promise<FileReadResult> {
    try {
      return await Filesystem.readFile(readFilePathOptions);
    } catch (e) {
      console.error('Unable to stat file', e);
    }
  }

  public async rename(renameOptions: RenameOptions): Promise<RenameResult> {
    try {
      return await Filesystem.rename(renameOptions);
    } catch (e) {
      console.error('Unable to rename file', e);
    }
  }

  public async copy(copyOptions: CopyOptions): Promise<CopyResult> {
    try {
      return await Filesystem.copy(copyOptions);
    } catch (e) {
      console.error('Unable to copy file', e);
    }
  }
}
