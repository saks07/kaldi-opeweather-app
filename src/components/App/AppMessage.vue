<script setup lang="ts">
import type { AppMessageStatus } from '@/app/types/app.type'
import { useMessageStore } from '@/stores/message'
import { computed, onMounted } from 'vue'

const messageStore = useMessageStore()

// CONSTANTS
const MESSAGE_DISPLAY_TIME: number = 2500

// LIFECYCLE METHODS
onMounted(() => {
  setTimeout(() => {
    messageStore.setDisplayMessage(false)
  }, MESSAGE_DISPLAY_TIME)
})

// COMPUTED
const messageText = computed<string>(() => messageStore.messageTextValue)

const messageStatus = computed<AppMessageStatus>(() => messageStore.messageStatusValue)
</script>

<template>
  <div :class="['app-message-container', `app-message-${messageStatus}`]">
    <div class="wrapper">{{ messageText }}</div>
  </div>
</template>

<style scoped>
.app-message-container {
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: var(--app-message-bg-default, #353535);
  color: var(--app-message-color-default, #fff);
  padding: 1.25rem;
  border-radius: 8px;
}

.app-message-error {
  background-color: var(--app-message-bg-error, #ef4444);
  color: var(--app-message-color-default, #fff);
}
</style>
