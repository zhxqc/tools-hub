<template>
  <div class="txt2excel">
    <h1>TXT 转 Excel</h1>

    <div class="txt2excel__actions">
      <el-button type="primary" size="large" :loading="loading" @click="onPickDirectory"
        >选择文件夹</el-button
      >
      <input
        ref="dirInputRef"
        type="file"
        webkitdirectory
        directory
        multiple
        accept=".txt"
        class="hidden-input"
        @change="onFilesSelected"
      />

      <el-button size="large" :disabled="rows.length === 0 || loading" @click="onClear"
        >清空</el-button
      >
      <el-button
        size="large"
        type="success"
        :disabled="rows.length === 0 || loading"
        @click="onExport"
        >导出 Excel</el-button
      >
    </div>

    <div v-if="selectedFolderPathDisplay" class="txt2excel__folder">
      已选择文件夹：<strong>{{ selectedFolderPathDisplay }}</strong>
    </div>

    <el-alert
      v-if="rows.length === 0"
      title="请选择包含 .txt 文件的文件夹（内容最多截取 300000 字）"
      type="info"
      :closable="false"
      show-icon
      class="txt2excel__alert"
    />

    <el-table v-if="rows.length > 0" :data="rows" style="width: 100%" border>
      <el-table-column prop="title" label="标题" width="260" show-overflow-tooltip />
      <el-table-column prop="content" label="内容">
        <template #default="{ row }">
          <div class="txt2excel__content">{{ row.content }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFileReader } from '@/composables/useFileReader';
import { useExcelExporter } from '@/composables/useExcelExporter';

const dirInputRef = ref<HTMLInputElement | null>(null);

// 使用文件读取 composable
const {
  loading,
  rows,
  selectedFolderName,
  selectedFolderPath,
  readFromFileInput,
  readFromDirectoryPicker,
  clear,
} = useFileReader({ maxChars: 300000, accept: '.txt' });

// 使用导出 composable
const { exportTxtToExcel } = useExcelExporter();

// 文件夹路径显示
const selectedFolderPathDisplay = selectedFolderPath;

function onPickDirectory() {
  const anyWindow = window as any;
  if (typeof anyWindow.showDirectoryPicker === 'function') {
    readFromDirectoryPicker();
  } else {
    dirInputRef.value?.click();
  }
}

async function onFilesSelected(e: Event) {
  const input = e.target as HTMLInputElement;
  const fileList = input.files;
  await readFromFileInput(fileList);
  // 清空 input，允许重复选择同一文件夹
  if (dirInputRef.value) dirInputRef.value.value = '';
}

function onClear() {
  clear();
}

function onExport() {
  if (rows.value.length === 0) return;
  const filename = selectedFolderName.value || undefined;
  exportTxtToExcel(rows.value, filename);
}
</script>

<style scoped lang="scss">
.txt2excel {
  &__actions {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
  }

  &__alert {
    margin-bottom: 16px;
  }

  &__folder {
    margin-bottom: 12px;
    color: #606266;
  }

  &__content {
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.hidden-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
