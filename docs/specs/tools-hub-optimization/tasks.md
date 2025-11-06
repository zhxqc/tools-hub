# 任务列表：Tools-Hub 项目优化

## 任务概述

本任务列表将设计文档转换为可执行的编码步骤，每个任务都是独立的、可测试的、增量式的。所有任务专注于代码编写、修改和测试。

---

## 任务清单

### 阶段 1：基础配置和项目结构

- [x] **1.1 更新 package.json 配置**
  - 将项目名称从 `txt-to-excel-vue` 更改为 `tools-hub`
  - 添加缺失的依赖：`element-plus`, `vue-router`, `xlsx`, `jszip`, `file-saver`
  - 添加开发依赖：`@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `eslint-config-prettier`, `eslint-plugin-vue`, `prettier`
  - 添加 Element Plus 自动导入相关依赖：`unplugin-vue-components` 的 resolvers
  - 添加 npm scripts：`lint`, `lint:fix`, `format`
  - 参考需求：2.2.1, 2.2.2, 2.3.3

- [x] **1.2 创建 Git 配置文件**
  - 创建 `.gitignore` 文件，忽略 `node_modules/`, `dist/`, `*.local`, `.DS_Store`, `src/auto-imports.d.ts`, `src/components.d.ts`
  - 创建 `.gitattributes` 文件，设置 `* text=auto eol=lf`
  - 参考需求：3.1.1, 3.1.2

- [x] **1.3 创建 EditorConfig 和 Prettier 配置**
  - 创建 `.editorconfig` 文件，设置 `indent_style=space`, `indent_size=2`, `end_of_line=lf`, `charset=utf-8`
  - 创建 `.prettierrc.json` 文件，配置 `singleQuote: true`, `semi: true`, `printWidth: 100`, `trailingComma: 'es5'`
  - 创建 `.prettierignore` 文件，忽略 `dist/`, `node_modules/`, `*.md`
  - 参考需求：3.1.4, 2.3.2

- [x] **1.4 创建 ESLint 配置**
  - 创建 `.eslintrc.cjs` 文件，配置 Vue 3 + TypeScript 规则
  - 继承 `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:vue/vue3-recommended`, `prettier`
  - 配置 parser 为 `vue-eslint-parser` 和 `@typescript-eslint/parser`
  - 添加自定义规则：关闭 `vue/multi-word-component-names`，设置 `@typescript-eslint/no-explicit-any` 为 warn
  - 创建 `.eslintignore` 文件，忽略 `dist/`, `node_modules/`, `*.d.ts`
  - 参考需求：2.3.1, 2.3.2

- [x] **1.5 更新 Vite 配置**
  - 在 `vite.config.ts` 中添加路径别名：`@` 指向 `src` 目录
  - 配置 `unplugin-auto-import` 插件，自动导入 Vue API 和 Element Plus
  - 配置 `unplugin-vue-components` 插件，自动导入 Element Plus 组件
  - 配置 `build.rollupOptions.output.manualChunks`，分离第三方库（element-plus, xlsx, jszip）
  - 参考需求：2.4.1, 2.4.2, 2.4.3, 2.4.4

- [x] **1.6 更新 TypeScript 配置**
  - 在 `tsconfig.json` 中添加 `paths` 配置：`"@/*": ["src/*"]`
  - 确保 `include` 包含 `src/**/*` 和 `env.d.ts`
  - 添加 `exclude` 排除 `node_modules` 和 `dist`
  - 参考需求：2.4.2

- [x] **1.7 创建 VSCode 配置**
  - 创建 `.vscode/settings.json`，配置保存时自动格式化、ESLint 自动修复
  - 创建 `.vscode/extensions.json`，推荐安装 Vue、ESLint、Prettier 插件
  - 参考需求：2.3.4, 3.1.5

- [x] **1.8 创建目录结构**
  - 创建 `src/components/` 目录（为未来扩展准备）
  - 创建 `src/composables/` 目录
  - 创建 `src/types/` 目录
  - 创建 `src/utils/` 目录
  - 参考需求：2.1.1

---

### 阶段 2：类型定义和工具函数

- [x] **2.1 创建类型定义文件**
  - 创建 `src/types/index.ts` 文件
  - 定义 `TxtRow` 接口（title: string, content: string）
  - 定义 `ExcelRow` 接口（title1-10, content, selectedTitleIndex）
  - 定义 `FileReadOptions` 接口（maxChars, accept）
  - 定义 `FileSystemDirectoryEntry` 接口
  - 参考需求：2.1.3
  - 参考设计：3.1 节

- [x] **2.2 创建文件处理工具函数**
  - 创建 `src/utils/file.ts` 文件
  - 实现 `getTitleFromFilename(filename: string): string` - 从文件名提取标题
  - 实现 `sanitizeFileName(name: string): string` - 清理文件名非法字符
  - 实现 `inferRootDir(paths: string[]): string | null` - 推断根目录
  - 实现 `readFileAsText(file: File): Promise<string>` - 读取文件为文本
  - 为每个函数添加 JSDoc 注释
  - 参考需求：2.1.2, 3.3.3
  - 参考设计：3.2.1 节

- [x] **2.3 创建消息提示工具函数**
  - 创建 `src/utils/message.ts` 文件
  - 实现 `showSuccess(message: string)` - 成功提示
  - 实现 `showError(message: string)` - 错误提示
  - 实现 `showWarning(message: string)` - 警告提示
  - 实现 `showInfo(message: string)` - 信息提示
  - 实现 `showErrorDialog(message: string, title?: string)` - 错误对话框
  - 封装 Element Plus 的 `ElMessage` 和 `ElMessageBox`
  - 参考需求：3.3.5
  - 参考设计：3.2.2 节

---

### 阶段 3：核心业务逻辑 Composables

- [x] **3.1 创建文件读取 Composable**
  - 创建 `src/composables/useFileReader.ts` 文件
  - 实现 `useFileReader(options?: FileReadOptions)` 函数
  - 返回响应式状态：`loading`, `rows`, `selectedFolderName`, `selectedFolderPath`
  - 实现 `readFromFileInput(fileList: FileList | null)` - 通过 input 读取文件
  - 实现 `readFromDirectoryPicker()` - 通过 File System Access API 读取目录
  - 实现 `walkDirectory()` 私有函数 - 递归遍历目录
  - 实现 `clear()` - 清空数据
  - 集成 `@/utils/file` 和 `@/utils/message`
  - 添加完整的 JSDoc 注释
  - 参考需求：2.1.2, 3.3.1, 3.3.2
  - 参考设计：3.3.1 节

- [x] **3.2 创建 Excel 解析 Composable**
  - 创建 `src/composables/useExcelParser.ts` 文件
  - 实现 `useExcelParser()` 函数
  - 返回响应式状态：`rows`, `titleHeaders`
  - 实现 `parseExcelFile(file: File)` - 解析 Excel 文件
  - 使用 `XLSX.read()` 和 `XLSX.utils.sheet_to_json()` 解析数据
  - 实现 `deleteRow(index: number)` - 删除指定行
  - 实现 `clear()` - 清空数据
  - 集成 `@/utils/message`
  - 添加完整的 JSDoc 注释
  - 参考需求：2.1.2, 3.3.2
  - 参考设计：3.3.2 节

- [x] **3.3 创建 Excel 导出 Composable**
  - 创建 `src/composables/useExcelExporter.ts` 文件
  - 实现 `useExcelExporter()` 函数
  - 实现 `exportTxtToExcel(rows: TxtRow[], filename?: string)` - 导出 TXT 为 Excel
  - 使用 `XLSX.utils.json_to_sheet()` 和 `XLSX.writeFile()` 生成 Excel
  - 实现 `exportExcelToTxt(rows: ExcelRow[])` - 导出 Excel 为 TXT ZIP
  - 实现数据校验逻辑（检查标题和内容是否为空）
  - 使用 `JSZip` 打包多个 TXT 文件
  - 使用 `file-saver` 的 `saveAs()` 下载文件
  - 集成 `@/utils/file` 和 `@/utils/message`
  - 添加完整的 JSDoc 注释
  - 参考需求：2.1.2, 3.3.2
  - 参考设计：3.3.3 节

---

### 阶段 4：重构 Vue 组件

- [x] **4.1 重构 TxtToExcel.vue 组件**
  - 从组件中移除所有业务逻辑函数（文件读取、导出等）
  - 引入 `useFileReader` composable 替代本地状态和逻辑
  - 引入 `useExcelExporter` composable 处理导出
  - 使用 `@/types` 中的类型定义替代组件内部类型
  - 保持模板和样式不变，仅重构 script 部分
  - 确保功能与重构前完全一致
  - 移除未使用的导入（如直接导入的 `ElMessage`，使用 composable 中封装的方法）
  - 参考需求：2.1.2, 3.3.1, 3.3.2, 3.3.3
  - 参考设计：3.3.1, 3.3.3 节

- [x] **4.2 重构 ExcelToTxt.vue 组件**
  - 从组件中移除所有业务逻辑函数（Excel 解析、导出等）
  - 引入 `useExcelParser` composable 替代本地状态和逻辑
  - 引入 `useExcelExporter` composable 处理导出
  - 使用 `@/types` 中的类型定义替代组件内部类型
  - 保持模板和样式不变，仅重构 script 部分
  - 确保功能与重构前完全一致
  - 移除未使用的导入
  - 参考需求：2.1.2, 3.3.1, 3.3.2
  - 参考设计：3.3.2, 3.3.3 节

- [x] **4.3 优化 App.vue 组件**
  - 移除直接从 `element-plus` 导入的组件（利用自动导入）
  - 移除直接从 `vue` 和 `vue-router` 导入的 API（利用自动导入）
  - 确保自动导入后功能正常
  - 参考需求：2.4.4

- [x] **4.4 更新 main.ts 入口文件**
  - 确保正确导入 `element-plus/dist/index.css`
  - 确保正确导入 `@/styles/index.scss`
  - 验证路由和 Element Plus 插件正确注册
  - 参考需求：2.2.1

---

### 阶段 5：样式优化

- [x] **5.1 完善 SCSS 变量文件**
  - 检查 `src/styles/_variables.scss` 文件
  - 添加常用颜色变量（如主题色、文本色、边框色）
  - 添加间距变量（已有 `$app-space` 和 `$app-space-lg`）
  - 添加字体大小变量
  - 确保变量命名符合 BEM 规范
  - 参考需求：3.4.1, 3.4.4

- [x] **5.2 优化全局样式**
  - 检查 `src/styles/index.scss` 文件
  - 确保正确引入 `_variables.scss`
  - 确保全局样式使用变量而非硬编码值
  - 验证样式不与 Element Plus 冲突
  - 参考需求：3.4.3

- [x] **5.3 清理未使用的样式文件**
  - 删除 `src/style.css` 文件（已有 SCSS 替代）
  - 确保删除后应用样式正常
  - 参考需求：2.1.1

---

### 阶段 6：文档和 License

- [x] **6.1 创建 MIT License 文件**
  - 创建 `LICENSE` 文件
  - 使用标准 MIT License 模板
  - 设置 Copyright 年份为 2024，持有者为 `bons`
  - 参考需求：3.1.3

- [x] **6.2 完善 README.md 文档**
  - 添加项目标题和简介
  - 添加徽章（License、Node 版本、Package 版本）
  - 添加功能特性列表（TXT 转 Excel、Excel 转 TXT）
  - 添加技术栈说明
  - 添加快速开始章节（依赖安装、运行、构建）
  - 添加使用说明章节（每个功能的详细步骤）
  - 添加浏览器兼容性说明（支持现代 Chromium 浏览器）
  - 添加项目结构说明
  - 添加开发指南（npm scripts、代码规范）
  - 添加贡献指南
  - 添加 License 信息
  - 移除旧的单一功能描述
  - 参考需求：3.2.1, 3.2.2, 3.2.3

---

### 阶段 7：代码质量检查和修复

- [x] **7.1 运行 ESLint 并修复所有错误**
  - 执行 `pnpm lint` 检查所有文件
  - 修复所有 ESLint 报告的错误
  - 执行 `pnpm lint:fix` 自动修复可修复的问题
  - 手动修复无法自动修复的问题
  - 确保所有文件通过 ESLint 检查
  - 参考需求：2.3.3

- [x] **7.2 运行 Prettier 格式化代码**
  - 执行 `pnpm format` 格式化所有代码
  - 确保所有文件格式一致
  - 验证格式化后代码可正常运行
  - 参考需求：2.3.2, 2.3.3

- [x] **7.3 运行 TypeScript 类型检查**
  - 执行 `pnpm exec vue-tsc --noEmit` 进行类型检查
  - 修复所有类型错误
  - 确保类型定义完整且正确
  - 验证自动导入的类型定义文件已生成
  - 参考需求：2.4.4

---

### 阶段 8：构建测试和功能验证

- [x] **8.1 测试开发环境启动**
  - 执行 `pnpm install` 安装所有依赖
  - 执行 `pnpm dev` 启动开发服务器
  - 验证应用能够正常启动
  - 验证控制台无错误信息
  - 验证路径别名 `@/` 正常工作
  - 验证自动导入正常工作
  - 参考需求：2.2.2

- [x] **8.2 测试生产构建**
  - 执行 `pnpm build` 构建生产版本
  - 验证构建成功，无错误和警告
  - 检查 `dist/` 目录生成正确
  - 验证 chunk 分割正确（element-plus、xlsx、jszip 独立打包）
  - 检查构建产物大小合理
  - 执行 `pnpm preview` 预览生产版本
  - 验证生产版本功能正常
  - 参考需求：2.4.3

- [x] **8.3 功能回归测试：TXT 转 Excel**
  - 测试选择文件夹功能（File System Access API）
  - 测试文件读取功能（读取多个 TXT 文件）
  - 测试内容截断功能（超过 30 万字符）
  - 测试表格展示功能
  - 测试导出 Excel 功能
  - 测试清空功能
  - 验证所有功能与重构前一致
  - 参考需求：5 节约束条件

- [x] **8.4 功能回归测试：Excel 转 TXT**
  - 测试选择 Excel 文件功能
  - 测试 Excel 解析功能（10 个标题列 + 1 个正文列）
  - 测试数据展示和编辑功能
  - 测试标题选择功能
  - 测试删除行功能
  - 测试导出 ZIP 功能
  - 测试数据校验功能（空标题、空内容提示）
  - 验证所有功能与重构前一致
  - 参考需求：5 节约束条件

- [x] **8.5 边界条件测试**
  - 测试空文件夹处理
  - 测试空 Excel 文件处理
  - 测试大文件处理（内容超长）
  - 测试特殊字符文件名处理
  - 测试文件名包含非法字符的清理
  - 测试用户取消操作的处理
  - 验证所有边界条件都有合理的错误提示
  - 参考设计：6.1 错误分类表

---

### 阶段 9：Git 仓库初始化和发布

- [ ] **9.1 初始化 Git 仓库**
  - 检查是否已有 `.git` 目录，如无则执行 `git init`
  - 验证 `.gitignore` 正确配置
  - 执行 `git add .` 添加所有文件
  - 验证自动生成的文件已被忽略（`auto-imports.d.ts`, `components.d.ts`）
  - 参考需求：4.1.1, 4.1.2

- [ ] **9.2 创建首次提交**
  - 执行 `git commit -m "feat: 项目结构优化和依赖完善"`
  - 验证提交成功
  - 验证提交包含所有应该提交的文件
  - 参考需求：4.1.3

- [ ] **9.3 配置 GitHub 远程仓库**
  - 提示用户在 GitHub bons 组织下创建 `tools-hub` 仓库
  - 执行 `git remote add origin https://github.com/bons/tools-hub.git`
  - 执行 `git branch -M main`
  - 参考需求：4.2.1, 4.2.4, 4.2.5

- [ ] **9.4 推送到 GitHub**
  - 执行 `git push -u origin main`
  - 验证推送成功
  - 提醒用户在 GitHub 上设置仓库描述："一个基于 Vue 3 的轻量级文本工具集，支持 TXT 与 Excel 互转"
  - 提醒用户添加 Topics：`vue3`, `typescript`, `element-plus`, `excel`, `txt`, `file-converter`, `vite`
  - 参考需求：4.2.2, 4.2.3

---

## 任务执行说明

### 执行顺序
任务按照阶段顺序依次执行，每个阶段内的任务可以按编号顺序执行。某些任务可以并行执行，但建议遵循编号顺序以降低风险。

### 验证方式
- **配置文件**：检查文件内容是否符合设计文档
- **代码质量**：通过 ESLint、Prettier、TypeScript 检查
- **功能测试**：手动测试所有功能，确保无回归
- **构建测试**：开发和生产构建都应成功且无警告

### 回滚策略
如果某个任务导致功能异常：
1. 使用 Git 回滚到上一个稳定状态
2. 重新审查设计文档和需求
3. 调整实现方式后重新执行

### 完成标准
所有任务的 checkbox 都被勾选，且：
- ✅ 项目可正常启动和构建
- ✅ 所有功能与重构前一致
- ✅ ESLint、Prettier、TypeScript 检查全部通过
- ✅ 代码推送到 GitHub bons/tools-hub 仓库
- ✅ README 和 License 完整

---

## 总结

本任务列表包含 **9 个阶段，共 35 个独立任务**，涵盖：
- ✅ 项目配置（Git、ESLint、Prettier、Vite、TypeScript）
- ✅ 代码重构（类型定义、工具函数、Composables、组件）
- ✅ 样式优化（SCSS 变量和全局样式）
- ✅ 文档完善（README、License）
- ✅ 质量保证（代码检查、格式化、类型检查）
- ✅ 功能验证（开发、构建、功能测试）
- ✅ 版本控制（Git 初始化、GitHub 发布）

每个任务都关联了具体的需求条目，确保所有需求都被实现。

