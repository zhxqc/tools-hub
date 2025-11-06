# Tools-Hub

<div align="center">

一个基于 Vue 3 的轻量级文本工具集，支持 TXT 与 Excel 互转

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)](package.json)
[![GitHub](https://img.shields.io/badge/github-zhxqc%2Ftools--hub-blue.svg)](https://github.com/zhxqc/tools-hub)

</div>

## ✨ 功能特性

### 📝 TXT 转 Excel
- 批量读取文件夹中的所有 `.txt` 文件
- 自动提取文件名作为标题
- 内容自动截取（最多 30 万字符）
- 一键导出为 Excel 文件（.xlsx）
- 支持 File System Access API 和传统文件选择

### 📊 Excel 转 TXT
- 读取 Excel 文件（支持 .xlsx、.xls 格式）
- 支持 10 个标题列 + 1 个正文列
- 可视化编辑表格数据
- 灵活选择导出标题
- 批量打包下载为 ZIP 文件

## 🛠 技术栈

- **框架**: Vue 3.5 + TypeScript
- **构建工具**: Vite 7
- **UI 库**: Element Plus 2.8
- **路由**: Vue Router 4
- **Excel 处理**: xlsx
- **文件打包**: JSZip + FileSaver
- **代码规范**: ESLint + Prettier
- **样式**: SCSS

## 🚀 快速开始

### 依赖要求

- Node.js >= 18.0.0
- pnpm (推荐) / npm / yarn

### 安装依赖

```bash
# 推荐使用 pnpm
pnpm install

# 或使用 npm
npm install
```

### 运行开发环境

```bash
pnpm dev
```

浏览器将自动打开 `http://localhost:3000`

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 📖 使用说明

### TXT 转 Excel

1. 点击「选择文件夹」按钮
2. 在弹出的对话框中选择包含 `.txt` 文件的文件夹
3. 程序自动读取所有 TXT 文件并在表格中展示
4. 点击「导出 Excel」按钮，生成 `.xlsx` 文件

> **提示**: 文件内容超过 30 万字符将被自动截断

### Excel 转 TXT

1. 点击「选择 Excel 文件」按钮
2. 选择包含 10 个标题列和 1 个正文列的 Excel 文件
3. 在表格中编辑数据（如需要）
4. 为每行数据选择一个导出标题
5. 点击「打包下载 TXT」按钮，生成 ZIP 压缩包

> **提示**: 确保每行都选择了标题且正文不为空

## 🌐 浏览器兼容性

- ✅ Chrome / Edge (推荐) - 支持 File System Access API
- ✅ Firefox - 使用传统文件选择
- ✅ Safari - 使用传统文件选择

> **注意**: File System Access API 提供更好的用户体验，但仅在 Chromium 内核浏览器中支持。其他浏览器会自动降级到传统文件选择方式。

## 📁 项目结构

```
tools-hub/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 可复用组件
│   ├── composables/      # Vue 组合式函数
│   │   ├── useFileReader.ts      # 文件读取逻辑
│   │   ├── useExcelParser.ts     # Excel 解析逻辑
│   │   └── useExcelExporter.ts   # Excel 导出逻辑
│   ├── router/           # 路由配置
│   ├── styles/           # 全局样式
│   │   ├── _variables.scss       # SCSS 变量
│   │   └── index.scss            # 全局样式
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   │   ├── file.ts               # 文件处理工具
│   │   └── message.ts            # 消息提示封装
│   ├── views/            # 页面组件
│   │   ├── TxtToExcel.vue
│   │   └── ExcelToTxt.vue
│   ├── App.vue           # 根组件
│   └── main.ts           # 应用入口
├── docs/                 # 项目文档
├── dist/                 # 构建产物
├── .vscode/              # VSCode 配置
├── LICENSE               # MIT 许可证
└── README.md             # 项目说明
```

## 💻 开发指南

### 代码规范

```bash
# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm lint:fix

# Prettier 格式化
pnpm format
```

### 推荐 VSCode 插件

- Vue - Official
- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code

### 技术亮点

- **职责分离**: 采用 Composables 模式，业务逻辑与视图层分离
- **类型安全**: 完整的 TypeScript 类型定义
- **自动导入**: Vue API 和 Element Plus 组件自动导入
- **代码质量**: ESLint + Prettier 保证代码风格一致
- **构建优化**: 第三方库单独打包，优化加载性能

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 提交信息规范

使用语义化的中文提交信息：

- `feat: 新功能`
- `fix: 修复问题`
- `docs: 文档更新`
- `style: 代码格式调整`
- `refactor: 代码重构`
- `perf: 性能优化`
- `test: 测试相关`
- `chore: 构建/工具链相关`

## 📄 License

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**[⬆ 回到顶部](#tools-hub)**

Made with ❤️ by [zhxqc](https://github.com/zhxqc)

</div>
