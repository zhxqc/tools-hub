/**
 * TXT 转 Excel 的数据行类型
 */
export interface TxtRow {
  title: string;
  content: string;
}

/**
 * Excel 转 TXT 的数据行类型
 */
export interface ExcelRow {
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
  title6: string;
  title7: string;
  title8: string;
  title9: string;
  title10: string;
  content: string;
  selectedTitleIndex: number | null;
}

/**
 * 文件读取选项
 */
export interface FileReadOptions {
  maxChars?: number;
  accept?: string;
}

/**
 * 文件系统 API 入口类型
 */
export interface FileSystemDirectoryEntry {
  kind: 'file' | 'directory';
  name: string;
  getFile(): Promise<File>;
  entries(): AsyncIterableIterator<[string, FileSystemDirectoryEntry]>;
}
