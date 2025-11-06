import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { TxtRow, ExcelRow } from '@/types';
import { sanitizeFileName } from '@/utils/file';
import { showSuccess, showErrorDialog } from '@/utils/message';

export function useExcelExporter() {
  /**
   * 导出 TXT 数据为 Excel
   */
  function exportTxtToExcel(rows: TxtRow[], filename = 'export') {
    if (rows.length === 0) return;

    const data = rows.map((row) => ({
      标题: row.title,
      内容: row.content,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TXT');

    const date = new Date().toISOString().slice(0, 10);
    const outputFilename = `${filename || `txt_export_${date}`}.xlsx`;
    XLSX.writeFile(workbook, outputFilename);
  }

  /**
   * 导出 Excel 数据为 TXT ZIP 包
   */
  async function exportExcelToTxt(rows: ExcelRow[]) {
    if (rows.length === 0) return;

    // 数据校验
    const errors: string[] = [];
    rows.forEach((row, index) => {
      if (row.selectedTitleIndex === null || row.selectedTitleIndex === undefined) {
        errors.push(`第 ${index + 1} 条数据未选择标题`);
      } else {
        const selectedTitle = row[`title${row.selectedTitleIndex + 1}` as keyof ExcelRow] as string;
        if (!selectedTitle || !selectedTitle.trim()) {
          errors.push(`第 ${index + 1} 条数据选择的标题为空`);
        }
      }
      if (!row.content || !row.content.trim()) {
        errors.push(`第 ${index + 1} 条数据正文内容为空`);
      }
    });

    if (errors.length > 0) {
      await showErrorDialog(
        `数据格式校验失败，请修正以下问题：\n\n${errors.join('\n')}`,
        '导出失败'
      );
      return;
    }

    // 打包为 ZIP
    try {
      const zip = new JSZip();
      rows.forEach((row, i) => {
        const selectedTitle = row[
          `title${row.selectedTitleIndex! + 1}` as keyof ExcelRow
        ] as string;
        const filename = sanitizeFileName(selectedTitle || `row_${i + 1}`);
        zip.file(`${filename}.txt`, row.content ?? '');
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, 'txt_files.zip');
      showSuccess(`成功导出 ${rows.length} 个文件`);
    } catch (err) {
      console.error(err);
      await showErrorDialog('导出失败，请重试');
      throw err;
    }
  }

  return {
    exportTxtToExcel,
    exportExcelToTxt,
  };
}
