<script setup>
import { ref, watch, onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";

// SimpleBar, for more info and examples you can check out https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-vue
import SimpleBar from "simplebar";

const navigation = [
  {
    name: "Registration",
    subActivePaths: "/registration",
    sub: [
      {
        name: 'View Students',
        to: "registration",
      },
      {
        name: 'Add Students',
        to: "registration-add"
      }
    ]
  },
  {
    name: "HR",
    subActivePaths: "/registration",
    sub: [
      {
        name: 'View Employees',
        to: "hr",
      },
      {
        name: 'Add Employees',
        to: "hr-add-employee"
      },
      {
        name: 'Entrance & Attendance',
        to: 'hr-entrance-and-attendance'
      }
    ]
  },
  {
    name: "Settings",
    subActivePaths: "/settings",
    sub: [
      {
        name: "All",
        to: "settings"
      },
      {
        name: "Colleges & Departments",
        to: "settings-colleges-and-departments"
      }
    ]
  }
];

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();

// Dark Mode preference helper for radios
const radioDarkMode = ref();

// Sets default dark mode preferences for radios
function setDarkModeRadioDefault() {
  if (store.settings.darkModeSystem) {
    radioDarkMode.value = "system";
  } else {
    if (store.settings.darkMode) {
      radioDarkMode.value = "dark";
    } else {
      radioDarkMode.value = "light";
    }
  }
}

// When the user sets dark mode preference through the radios
function onDarkModeRadioChange() {
  if (radioDarkMode.value === "system") {
    store.darkModeSystem({ mode: "on" });
  } else {
    store.darkModeSystem({ mode: "off" });

    if (radioDarkMode.value === "dark") {
      store.darkMode({ mode: "on" });
    } else {
      store.darkMode({ mode: "off" });
    }
  }
}

// Set dark mode preference radios default and watch for changes to store
setDarkModeRadioDefault();
watch(
  () => store.settings.darkModeSystem,
  () => {
    setDarkModeRadioDefault();
  }
);
watch(
  () => store.settings.darkMode,
  () => {
    setDarkModeRadioDefault();
  }
);

// Init SimpleBar (custom scrolling)
onMounted(() => {
  new SimpleBar(document.getElementById("simplebar-sidebar"));
});
</script>

<template>
  <!-- Sidebar -->
  <!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
    If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
  -->
  <nav
    id="sidebar"
    :class="{ 'with-mini-nav': withMiniNav }"
    aria-label="Main Navigation"
  >
    <slot>
      <!-- Sidebar Scrolling -->
      <div id="simplebar-sidebar" class="js-sidebar-scroll">
        <slot name="content">
          <!-- Side Navigation -->
          <div class="content-side">
            <BaseNavigation :nodes="navigation" />
          </div>
          <!-- END Side Navigation -->
        </slot>
      </div>
      <!-- END Sidebar Scrolling -->
    </slot>
  </nav>
  <!-- END Sidebar -->
</template>
