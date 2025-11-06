import { ElMessage, ElMessageBox } from 'element-plus';
import type { MessageOptions } from 'element-plus';

/**
 * 成功消息
 */
export function showSuccess(message: string, options?: Partial<MessageOptions>) {
  ElMessage.success({ message, ...options });
}

/**
 * 错误消息
 */
export function showError(message: string, options?: Partial<MessageOptions>) {
  ElMessage.error({ message, ...options });
}

/**
 * 警告消息
 */
export function showWarning(message: string, options?: Partial<MessageOptions>) {
  ElMessage.warning({ message, ...options });
}

/**
 * 提示消息
 */
export function showInfo(message: string, options?: Partial<MessageOptions>) {
  ElMessage.info({ message, ...options });
}

/**
 * 确认对话框
 */
export function showConfirm(message: string, title = '提示') {
  return ElMessageBox.confirm(message, title, {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  });
}

/**
 * 错误弹窗
 */
export function showErrorDialog(message: string, title = '错误') {
  return ElMessageBox.alert(message, title, {
    type: 'error',
    confirmButtonText: '确定',
  });
}
