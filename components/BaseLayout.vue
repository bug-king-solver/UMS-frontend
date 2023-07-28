<script setup>
import { computed, onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";

// Component properties
defineProps({
  sidebarWithMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();

// Render main classes based on store options
const classContainer = computed(() => {
  return {
    "sidebar-r": store.layout.sidebar && !store.settings.sidebarLeft,
    "sidebar-mini": store.layout.sidebar && store.settings.sidebarMini,
    "sidebar-o": store.layout.sidebar && store.settings.sidebarVisibleDesktop,
    "sidebar-o-xs": store.layout.sidebar && store.settings.sidebarVisibleMobile,
    "sidebar-dark":
      store.layout.sidebar &&
      store.settings.sidebarDark &&
      !store.settings.darkMode,
    "side-overlay-o":
      store.layout.sideOverlay && store.settings.sideOverlayVisible,
    "side-overlay-hover":
      store.layout.sideOverlay && store.settings.sideOverlayHoverable,
    "enable-page-overlay":
      store.layout.sideOverlay && store.settings.pageOverlay,
    "page-header-fixed": store.layout.header && store.settings.headerFixed,
    "page-header-dark":
      store.layout.header &&
      store.settings.headerDark &&
      !store.settings.darkMode,
    "main-content-boxed": store.settings.mainContent === "boxed",
    "main-content-narrow": store.settings.mainContent === "narrow",
    "rtl-support": store.settings.rtlSupport,
    "side-trans-enabled": store.settings.sideTransitions,
    "side-scroll": true,
    "sidebar-dark page-header-dark dark-mode": store.settings.darkMode,
  };
});

// Remove side transitions on window resizing
onMounted(() => {
  let winResize = false;

  window.addEventListener("resize", () => {
    clearTimeout(winResize);

    store.setSideTransitions({ transitions: false });

    winResize = setTimeout(() => {
      store.setSideTransitions({ transitions: true });
    }, 500);
  });

});
</script>

<template>
  <div id="page-container" :class="classContainer">
    <!-- Page Loader -->
    <div id="page-loader" :class="{ show: store.settings.pageLoader }"></div>

    <!-- Page Overlay -->
    <div
      id="page-overlay"
      v-if="store.layout.sideOverlay && store.settings.pageOverlay"
      @click="store.sideOverlay({ mode: 'close' })"
    ></div>
    <!-- END Page Overlay -->

    <!-- Sidebar -->
    <BaseSidebar
      v-if="store.layout.sidebar"
      :with-mini-nav="sidebarWithMiniNav"
    >
      <template #header>
        <slot name="sidebar-header"></slot>
      </template>

      <template #header-extra>
        <slot name="sidebar-header-extra"></slot>
      </template>

      <template #content>
        <slot name="sidebar-content"></slot>
      </template>

      <slot name="sidebar"></slot>
    </BaseSidebar>
    <!-- END Sidebar -->

    <slot></slot>
  </div>
</template>
