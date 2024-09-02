import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AppMessageStatus } from '@/app/types/app.type'

export const useMessageStore = defineStore('message', () => {
  // STATE
  const displayMessage = ref<boolean>(false)
  const messageText = ref<string>('')
  const messageStatus = ref<AppMessageStatus>('default')

  // ACTIONS

  // MUTATIONS
  const setDisplayMessage = (show: boolean): void => {
    displayMessage.value = show
  }

  const setMessageText = (message: string): void => {
    messageText.value = message
  }

  const setMessageStatus = (status: AppMessageStatus): void => {
    messageStatus.value = status
  }

  // GETTERS
  const displayMessageValue = computed<boolean>(() => displayMessage.value)

  const messageTextValue = computed<string>(() => messageText.value)

  const messageStatusValue = computed<AppMessageStatus>(() => messageStatus.value)

  return {
    setDisplayMessage,
    setMessageText,
    setMessageStatus,
    displayMessageValue,
    messageTextValue,
    messageStatusValue
  }
})
