<!-- PasswordModal.vue -->
<template>
  <a-modal
    v-model:visible="isPwdModalVisible"
    title="请输入管理员密码"
    @ok="confirm"
    @cancel="cancel"
  >
    <a-input v-model="adminPwd" placeholder="管理员密码" type="password" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, defineEmits, defineProps } from 'vue';

  const props = defineProps({
    isVisible: Boolean,
  });

  const emit = defineEmits(['confirm', 'cancel']);

  const adminPwd = ref('');
  const isPwdModalVisible = ref(props.isVisible);

  function confirm() {
    if (adminPwd.value) {
      emit('confirm', adminPwd.value);
      adminPwd.value = '';
      isPwdModalVisible.value = false;
    } else {
      alert('请输入密码');
    }
  }

  function cancel() {
    emit('cancel');
    adminPwd.value = '';
    isPwdModalVisible.value = false;
  }
</script>
