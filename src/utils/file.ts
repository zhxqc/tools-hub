/**
 * 从文件名中提取标题（去除扩展名）
 * @param filename - 文件名
 * @returns 不含扩展名的标题
 */
export function getTitleFromFilename(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex > 0 ? filename.slice(0, lastDotIndex) : filename;
}

/**
 * 清理文件名，移除非法字符
 * @param name - 原始文件名
 * @returns 清理后的文件名
 */
export function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|\n\r\t]/g, '_').trim() || 'untitled';
}

/**
 * 从相对路径推断根目录名称
 * @param paths - 相对路径数组
 * @returns 根目录名称或 null
 */
export function inferRootDir(paths: string[]): string | null {
  const firstSegments = paths
    .map((p) => (p.includes('/') ? p.split('/')[0] : ''))
    .filter((seg) => seg);

  if (firstSegments.length === 0) return null;

  const candidate = firstSegments[0];
  const allSame = firstSegments.every((s) => s === candidate);
  return allSame ? candidate : null;
}

/**
 * 读取文件内容为文本
 * @param file - File 对象
 * @returns Promise<string>
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('读取文件失败'));
    reader.readAsText(file);
  });
}
