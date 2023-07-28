<template>
  <!-- TODO: integrate it with backend -->
  <ThePincodeOverlay v-if="securityStore.currentSession == null"></ThePincodeOverlay>
  <BaseLayout @mousemove="securityStore.startNewSession()">
    <div v-show="securityStore.currentSession !== null">
      <slot></slot>
    </div>
  </BaseLayout>
</template>
<script setup>
import { useTemplateStore } from "@/stores/template";
import { useSecurityStore } from "@/stores/security";

const templateStore = useTemplateStore();
templateStore.setLayout({ sidebar: true });

const securityStore = useSecurityStore();
onMounted(() => {
  securityStore.startNewSession();
})
</script>