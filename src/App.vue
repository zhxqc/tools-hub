<template>
  <el-config-provider size="large">
    <el-container class="layout">
      <el-aside width="220px" class="layout__aside">
        <h2 class="layout__logo">文本工具箱</h2>
        <el-menu :default-active="activePath" router>
          <el-menu-item index="/txt-to-excel">TXT 转 Excel</el-menu-item>
          <el-menu-item index="/excel-to-txt">Excel 转 TXT</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout__header">{{ pageTitle }}</el-header>
        <el-main class="layout__main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
const route = useRoute();
const activePath = computed(() => route.path);
const pageTitle = computed(() =>
  route.path.includes('excel-to-txt') ? 'Excel 转 TXT' : 'TXT 转 Excel'
);
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;

  &__aside {
    border-right: 1px solid #ebeef5;
    padding: 12px;
  }

  &__logo {
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #409eff;
  }

  &__header {
    border-bottom: 1px solid #ebeef5;
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-weight: 600;
  }

  &__main {
    padding: 16px;
  }
}
</style>
