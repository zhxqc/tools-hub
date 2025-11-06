import { ref } from 'vue';
import * as XLSX from 'xlsx';
import type { ExcelRow } from '@/types';
import { showSuccess, showWarning, showError } from '@/utils/message';

export function useExcelParser() {
  const rows = ref<ExcelRow[]>([]);
  const titleHeaders = ref<string[]>([]);

  /**
   * 解析 Excel 文件
   */
  async function parseExcelFile(file: File) {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // 获取表头
      const headerRow = XLSX.utils.sheet_to_json<any>(worksheet, {
        header: 1,
        defval: '',
      })[0] as any[];
      const headers: string[] = headerRow || [];

      // 确定列数
      const totalCols = headers.length;
      if (totalCols < 11) {
        showWarning(
          `Excel 文件应包含至少11列（10个标题列 + 1个正文列），当前检测到 ${totalCols} 列`
        );
      }

      // 提取标题列（前10列或除最后一列外的所有列）
      const titleColsCount = Math.min(10, totalCols - 1);
      titleHeaders.value = [];
      for (let i = 0; i < titleColsCount; i++) {
        titleHeaders.value.push(headers[i] || `标题${i + 1}`);
      }

      // 解析数据行
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

      const mappedRows: ExcelRow[] = jsonData
        .map((row: any) => {
          const excelRow: ExcelRow = {
            title1: '',
            title2: '',
            title3: '',
            title4: '',
            title5: '',
            title6: '',
            title7: '',
            title8: '',
            title9: '',
            title10: '',
            content: '',
            selectedTitleIndex: null,
          };

          // 填充标题列
          for (let i = 0; i < titleColsCount; i++) {
            const header = headers[i];
            const value = row[header] ?? '';
            const key = `title${i + 1}` as keyof ExcelRow;
            (excelRow[key] as string) = String(value);
          }

          // 填充正文列（最后一列）
          const contentHeader = headers[totalCols - 1] || headers[headers.length - 1];
          excelRow.content = String(row[contentHeader] ?? '');

          return excelRow;
        })
        .filter((row: ExcelRow) => {
          // 过滤空行
          const hasTitle = Array.from(
            { length: titleColsCount },
            (_, i) => row[`title${i + 1}` as keyof ExcelRow] as string
          ).some((title) => title && title.trim());
          return hasTitle || (row.content && row.content.trim());
        });

      rows.value = mappedRows;

      if (rows.value.length === 0) {
        showWarning('未在 Excel 中解析到有效数据');
      } else {
        showSuccess(`已加载 ${rows.value.length} 行数据，请为每行选择导出标题`);
      }
    } catch (err) {
      console.error(err);
      showError('读取 Excel 失败');
      throw err;
    }
  }

  /**
   * 删除指定行
   */
  function deleteRow(index: number) {
    rows.value.splice(index, 1);
    showSuccess('已删除该行数据');
  }

  /**
   * 清空数据
   */
  function clear() {
    rows.value = [];
    titleHeaders.value = [];
  }

  return {
    rows,
    titleHeaders,
    parseExcelFile,
    deleteRow,
    clear,
  };
}
