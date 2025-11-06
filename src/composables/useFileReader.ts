import { ref } from 'vue';
import type { TxtRow, FileReadOptions } from '@/types';
import { readFileAsText, getTitleFromFilename, inferRootDir } from '@/utils/file';
import { showSuccess, showWarning, showError } from '@/utils/message';

export function useFileReader(options: FileReadOptions = {}) {
  const { maxChars = 300000, accept = '.txt' } = options;

  const loading = ref(false);
  const rows = ref<TxtRow[]>([]);
  const selectedFolderName = ref('');
  const selectedFolderPath = ref('');

  /**
   * 通过 input[type=file] 选择文件
   */
  async function readFromFileInput(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    loading.value = true;
    try {
      const allFiles = Array.from(fileList);
      const relativePaths = allFiles.map((f) => (f as any).webkitRelativePath || f.name);
      const inferredRoot = inferRootDir(relativePaths);
      selectedFolderName.value = inferredRoot || '';
      selectedFolderPath.value = inferredRoot || '';

      const txtFiles = allFiles.filter((f) => f.name.toLowerCase().endsWith(accept));
      if (txtFiles.length === 0) {
        showWarning(`未找到 ${accept} 文件`);
        return;
      }

      const results = await Promise.all(
        txtFiles.map(async (file) => {
          try {
            const text = await readFileAsText(file);
            const title = getTitleFromFilename(file.name);
            const content = text.length > maxChars ? text.slice(0, maxChars) : text;
            return { title, content } as TxtRow;
          } catch (err) {
            console.error('读取失败: ', file.name, err);
            return null;
          }
        })
      );

      rows.value = results.filter((v): v is TxtRow => v !== null);

      if (rows.value.length === 0) {
        showError(`无法读取任何 ${accept} 文件`);
      } else {
        showSuccess(`已读取 ${rows.value.length} 个文件`);
      }
    } finally {
      loading.value = false;
    }
  }

  /**
   * 通过 File System Access API 选择目录
   */
  async function readFromDirectoryPicker() {
    const anyWindow = window as any;
    if (typeof anyWindow.showDirectoryPicker !== 'function') {
      throw new Error('当前浏览器不支持 File System Access API');
    }

    try {
      const dirHandle = await anyWindow.showDirectoryPicker();
      selectedFolderName.value = String(dirHandle?.name || '');
      selectedFolderPath.value = selectedFolderName.value;

      loading.value = true;
      const collected: TxtRow[] = [];

      for await (const [, entry] of (dirHandle as any).entries()) {
        await walkDirectory(entry, collected);
      }

      rows.value = collected;

      if (rows.value.length === 0) {
        showWarning(`所选文件夹内未找到 ${accept} 文件`);
      } else {
        showSuccess(`已读取 ${rows.value.length} 个文件`);
      }
    } catch (err) {
      if ((err as any)?.name !== 'AbortError') {
        console.warn('目录选择失败: ', err);
        throw err;
      }
    } finally {
      loading.value = false;
    }
  }

  /**
   * 递归遍历目录
   */
  async function walkDirectory(entry: any, output: TxtRow[]) {
    if (!entry) return;

    if (entry.kind === 'file') {
      const file = await entry.getFile();
      const name: string = String(file?.name || '');
      if (!name.toLowerCase().endsWith(accept)) return;

      const text = await file.text();
      const title = getTitleFromFilename(name);
      const content = text.length > maxChars ? text.slice(0, maxChars) : text;
      output.push({ title, content });
      return;
    }

    if (entry.kind === 'directory') {
      for await (const [, child] of entry.entries()) {
        await walkDirectory(child, output);
      }
    }
  }

  /**
   * 清空数据
   */
  function clear() {
    rows.value = [];
    selectedFolderName.value = '';
    selectedFolderPath.value = '';
  }

  return {
    loading,
    rows,
    selectedFolderName,
    selectedFolderPath,
    readFromFileInput,
    readFromDirectoryPicker,
    clear,
  };
}
