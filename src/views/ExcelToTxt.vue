<template>
  <div class="excel2txt">
    <h1>Excel 转 TXT</h1>

    <div class="excel2txt__actions">
      <el-upload
        action=""
        :auto-upload="false"
        :show-file-list="false"
        accept=".xlsx,.xls"
        :on-change="onExcelSelected"
      >
        <el-button type="primary" size="large">选择 Excel 文件</el-button>
      </el-upload>
      <el-button
        size="large"
        type="success"
        :disabled="rows.length === 0"
        @click="downloadAllAsZip"
      >
        打包下载 TXT
      </el-button>
      <el-button size="large" :disabled="rows.length === 0" @click="onClear">清空</el-button>
    </div>

    <el-alert
      v-if="rows.length === 0"
      title="请选择包含10个标题列和1个正文内容列的 Excel 文件"
      type="info"
      :closable="false"
      show-icon
      class="excel2txt__alert"
    />

    <div v-if="rows.length > 0" class="excel2txt__table-wrapper">
      <el-table :data="rows" style="width: 100%" border stripe max-height="600">
        <!-- 标题列（动态生成） -->
        <el-table-column
          v-for="(header, index) in titleHeaders"
          :key="`title-${index}`"
          :prop="`title${index + 1}`"
          :label="header"
          width="180"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-input v-model="row[`title${index + 1}`]" size="small" placeholder="请输入标题" />
          </template>
        </el-table-column>

        <!-- 正文内容列 -->
        <el-table-column prop="content" label="正文内容" min-width="300">
          <template #default="{ row }">
            <el-input
              v-model="row.content"
              type="textarea"
              :rows="3"
              placeholder="请输入正文内容"
            />
          </template>
        </el-table-column>

        <!-- 选择标题列 -->
        <el-table-column label="选择标题" width="180" fixed="right">
          <template #default="{ row }">
            <el-select
              v-model="row.selectedTitleIndex"
              placeholder="请选择标题"
              size="small"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="(header, index) in titleHeaders"
                :key="index"
                :label="header"
                :value="index"
              />
            </el-select>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ _row, $index }">
            <el-button link type="danger" size="small" @click="deleteRow($index)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExcelParser } from '@/composables/useExcelParser';
import { useExcelExporter } from '@/composables/useExcelExporter';

// 使用 Excel 解析 composable
const { rows, titleHeaders, parseExcelFile, deleteRow, clear } = useExcelParser();

// 使用导出 composable
const { exportExcelToTxt } = useExcelExporter();

function onClear() {
  clear();
}

async function downloadAllAsZip() {
  await exportExcelToTxt(rows.value);
}

async function onExcelSelected(file: any) {
  const f: File = file.raw as File;
  await parseExcelFile(f);
}
</script>

<style scoped lang="scss">
.excel2txt {
  &__actions {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
  }

  &__alert {
    margin-bottom: 16px;
  }

  &__table-wrapper {
    margin-top: 16px;
  }
}

/* 表格样式优化 */
:deep(.el-table) {
  .el-input,
  .el-textarea {
    width: 100%;
  }

  .el-textarea__inner {
    resize: vertical;
  }
}
</style>
