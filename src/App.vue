<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import HeaderMain from './components/HeaderComponents/HeaderMain.vue'
import FooterMain from './components/FooterComponents/FooterMain.vue'
import AppMessage from './components/App/AppMessage.vue'
import { useMessageStore } from './stores/message'

const messageStore = useMessageStore()

// COMPUTED
const displayAppMessage = computed<boolean>(() => {
  return messageStore.displayMessageValue
})
</script>

<template>
  <HeaderMain />
  <RouterView />
  <FooterMain />
  <AppMessage v-if="displayAppMessage" />
</template>
