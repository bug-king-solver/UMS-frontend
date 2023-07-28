<template>
    <tbody class="js-table-sections-header table-active" :class="{ 'show': isSectionOpen }"><tr @click="toggleSectionStatus"><slot name="header"></slot></tr></tbody>
    <tbody class="font-sm" :class="{ 'show': isSectionOpen }"><slot name="body"></slot></tbody>
</template>
<script setup>
const isSectionOpen = ref(false);

const toggleSectionStatus = () => {

    isSectionOpen.value = !isSectionOpen.value;

}
</script>