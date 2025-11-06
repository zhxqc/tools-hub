# 需求文档：Tools-Hub 项目优化

## 1. 项目概述

Tools-Hub 是一个基于 Vue 3 + TypeScript + Element Plus 的文本工具集应用，当前提供两个核心功能：
- **TXT 转 Excel**：批量读取 TXT 文件并导出为 Excel
- **Excel 转 TXT**：解析 Excel 文件并批量导出为 TXT 文件

本次优化目标是全面提升项目的代码质量、可维护性和开源规范性，并发布到 GitHub bons 组织下，使其成为一个规范的开源项目。

---

## 2. 功能性需求

### 2.1 项目结构重构

**用户故事**：作为项目维护者，我希望项目具有清晰合理的目录结构，以便于后续扩展和维护。

**验收标准**：
1. **WHEN** 项目结构被重新组织时，**THEN** 应包含以下标准目录：
   - `src/components/` - 存放可复用的 Vue 组件
   - `src/composables/` - 存放 Vue 组合式函数（hooks）
   - `src/types/` - 存放 TypeScript 类型定义
   - `src/utils/` - 存放工具函数
   - `src/router/` - 存放路由配置（已有）
   - `src/styles/` - 存放全局样式（已有）
   - `src/views/` - 存放页面组件（已有）

2. **WHEN** 业务逻辑被抽离时，**THEN** 应将文件读取、Excel 处理等逻辑从 Vue 组件中分离到 `composables` 或 `utils` 中

3. **WHEN** 类型定义存在时，**THEN** 应统一管理在 `src/types/` 目录下，而不是分散在各个组件文件中

### 2.2 依赖配置完善

**用户故事**：作为开发者，我希望项目依赖完整且版本明确，以便于快速安装和运行项目。

**验收标准**：
1. **WHEN** 查看 `package.json` 时，**THEN** 应包含所有实际使用的依赖：
   - `element-plus` - UI 组件库
   - `vue-router` - 路由管理
   - `xlsx` - Excel 文件处理
   - `jszip` - ZIP 文件生成
   - `file-saver` - 文件下载

2. **WHEN** 配置自动导入时，**THEN** 应正确配置 `unplugin-auto-import` 和 `unplugin-vue-components` 插件

3. **WHEN** 项目名称被更新时，**THEN** `package.json` 中的 `name` 字段应从 `txt-to-excel-vue` 更改为 `tools-hub`

4. **WHEN** 查看版本号时，**THEN** 应保持为 `0.1.0`

### 2.3 代码质量工具配置

**用户故事**：作为开发者，我希望项目具有代码规范检查工具，以保证代码质量一致性。

**验收标准**：
1. **WHEN** 配置 ESLint 时，**THEN** 应使用适合 Vue 3 + TypeScript 的规则集（如 `@vue/eslint-config-typescript`）

2. **WHEN** 配置 Prettier 时，**THEN** 应与 ESLint 集成，避免规则冲突

3. **WHEN** 添加 npm scripts 时，**THEN** 应包含 `lint`、`lint:fix` 和 `format` 命令

4. **WHEN** VSCode 配置存在时，**THEN** 应在 `.vscode/settings.json` 中配置保存时自动格式化

### 2.4 构建配置优化

**用户故事**：作为开发者，我希望项目具有完善的构建配置，提升开发体验和构建效率。

**验收标准**：
1. **WHEN** 配置路径别名时，**THEN** `vite.config.ts` 应添加 `@` 指向 `src` 目录的别名

2. **WHEN** 配置 TypeScript 时，**THEN** `tsconfig.json` 应同步配置 paths 映射

3. **WHEN** 查看构建输出时，**THEN** 应配置合理的 chunk 分割策略，将第三方库单独打包

4. **WHEN** 配置自动导入插件时，**THEN** 应自动生成类型定义文件到 `src/auto-imports.d.ts` 和 `src/components.d.ts`

---

## 3. 非功能性需求

### 3.1 项目配置文件

**用户故事**：作为开源项目维护者，我希望项目具有完整的配置文件，符合开源规范。

**验收标准**：
1. **WHEN** 初始化 Git 仓库时，**THEN** 应包含 `.gitignore` 文件，忽略以下内容：
   - `node_modules/`
   - `dist/`
   - `*.local`
   - `.DS_Store`
   - `src/auto-imports.d.ts`
   - `src/components.d.ts`

2. **WHEN** 添加 Git 属性配置时，**THEN** 应包含 `.gitattributes` 文件，规范化行尾符

3. **WHEN** 添加开源协议时，**THEN** 应包含 MIT License 文件

4. **WHEN** 添加编辑器配置时，**THEN** 应包含 `.editorconfig` 文件，统一代码风格

5. **WHEN** 配置 VSCode 时，**THEN** 应包含 `.vscode/extensions.json` 推荐插件列表

### 3.2 文档完善

**用户故事**：作为项目用户，我希望有详细的文档，快速了解项目功能和使用方法。

**验收标准**：
1. **WHEN** 查看 README.md 时，**THEN** 应包含以下章节：
   - 项目简介和 Logo/Banner
   - 功能特性列表（两个核心功能）
   - 技术栈说明
   - 快速开始（安装、运行、构建）
   - 使用说明（每个功能的使用步骤）
   - 浏览器兼容性说明
   - 项目结构说明
   - 开发指南
   - 贡献指南
   - License 信息

2. **WHEN** 添加徽章时，**THEN** README 顶部应包含：
   - License 徽章
   - Node 版本徽章
   - Package 版本徽章

3. **WHEN** 项目信息被更新时，**THEN** 应移除旧的单一功能描述，改为多工具集的描述

### 3.3 代码重构

**用户故事**：作为开发者，我希望代码逻辑清晰、职责分离，便于理解和维护。

**验收标准**：
1. **WHEN** 重构 TxtToExcel.vue 时，**THEN** 应将文件处理逻辑抽离到 `composables/useFileReader.ts`

2. **WHEN** 重构 ExcelToTxt.vue 时，**THEN** 应将 Excel 解析逻辑抽离到 `composables/useExcelParser.ts`

3. **WHEN** 抽离工具函数时，**THEN** 应将通用函数（如 `sanitizeFileName`、`getTitleFromFilename`）移至 `utils/file.ts`

4. **WHEN** 定义类型时，**THEN** 应将 `TxtRow`、`Row` 等类型定义移至 `types/index.ts`

5. **WHEN** 统一错误处理时，**THEN** 应创建 `utils/message.ts` 封装 ElMessage 调用，便于统一管理

### 3.4 样式规范

**用户故事**：作为前端开发者，我希望项目遵循统一的样式规范，提高代码可读性。

**验收标准**：
1. **WHEN** 使用 SCSS 变量时，**THEN** 应充分利用 `_variables.scss` 中定义的变量

2. **WHEN** 编写组件样式时，**THEN** 应使用 BEM 命名规范（已在现有代码中使用）

3. **WHEN** 需要全局样式时，**THEN** 应在 `styles/index.scss` 中统一管理

4. **WHEN** 需要主题色等设计 token 时，**THEN** 应在 `_variables.scss` 中定义并复用

---

## 4. Git 和 GitHub 相关需求

### 4.1 Git 仓库初始化

**用户故事**：作为项目所有者，我希望将项目发布到 GitHub，便于版本管理和协作。

**验收标准**：
1. **WHEN** 初始化 Git 仓库时，**THEN** 应确保 `.git` 目录存在

2. **WHEN** 首次提交时，**THEN** 应包含完整的项目文件（排除 .gitignore 中的内容）

3. **WHEN** 编写提交信息时，**THEN** 应使用语义化的中文提交信息（如：`feat: 添加ESLint配置`）

### 4.2 GitHub 仓库配置

**用户故事**：作为开源项目维护者，我希望 GitHub 仓库配置完善，便于其他人发现和使用。

**验收标准**：
1. **WHEN** 创建 GitHub 仓库时，**THEN** 仓库名应为 `tools-hub`

2. **WHEN** 配置仓库描述时，**THEN** 应设置为："一个基于 Vue 3 的轻量级文本工具集，支持 TXT 与 Excel 互转"

3. **WHEN** 添加 Topics 时，**THEN** 应包含：`vue3`, `typescript`, `element-plus`, `excel`, `txt`, `file-converter`

4. **WHEN** 仓库可见性设置时，**THEN** 应设置为 Public（公开）

5. **WHEN** 推送到远程时，**THEN** 应推送到 `https://github.com/bons/tools-hub.git`

---

## 5. 约束条件

1. **技术栈约束**：必须保持 Vue 3 + TypeScript + Element Plus 技术栈
2. **兼容性约束**：需支持现代 Chromium 内核浏览器（因使用了 File System Access API）
3. **功能完整性约束**：优化过程中不得破坏现有功能
4. **构建工具约束**：继续使用 Vite 作为构建工具
5. **包管理器约束**：优先使用 pnpm（根据项目规则）

---

## 6. 验收总览

项目优化完成后，应满足：
- ✅ 目录结构清晰，代码职责分离
- ✅ 依赖完整，一次性安装无报错
- ✅ 具有 ESLint + Prettier 代码规范
- ✅ 完整的 Git 配置和 License
- ✅ 详尽的 README 文档
- ✅ 成功推送到 GitHub bons/tools-hub 仓库
- ✅ 代码可正常运行，功能无回归

---

## 附录：项目现状评估

### 已完成
- ✅ 基本项目结构和路由
- ✅ 两个核心功能的完整实现
- ✅ 使用 SCSS 和 BEM 命名
- ✅ 基础的 TypeScript 配置

### 待完成
- ❌ 缺少多个依赖声明
- ❌ 缺少代码规范工具
- ❌ 缺少 .gitignore 等配置文件
- ❌ README 信息不完整
- ❌ 代码逻辑未分离，组件过于庞大
- ❌ 未发布到 GitHub

