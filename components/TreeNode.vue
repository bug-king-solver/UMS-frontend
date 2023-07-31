<template>
  <div class="tree-node" :class="{ 'has-children': hasChildren }">
    <span @click="toggleNode">
      <i v-if="hasChildren && isExpanded" class="fas fa-folder-open"></i>
      <i v-else-if="hasChildren" class="fas fa-folder"></i>
      <i v-else class="fa fa-file-alt"></i>
      {{ node.name }}
    </span>
    <i v-if="hasChildren && !isExpanded" class="fas fa-plus" @click="onPlusIconClick"></i>
    <div v-if="hasChildren && isExpanded" class="children-container">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" @click="handleAction(child)" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { node } = defineProps(['node']);

const isExpanded = ref(false);
const hasChildren = ref(!!node.children);

const toggleNode = () => {
  isExpanded.value = !isExpanded.value;
};

const handleAction = (child) => {
  if (!child.children) {
    window.alert("Modal");
  }
};

const onPlusIconClick = () => {
  // Custom action for the Plus icon
  // You can perform any specific action here
  console.log("Plus icon clicked for category:", node.name);
  // For example, you can show a specific modal or perform an action on the node
};
</script>

<style>
.tree-node {
  margin-left: 20px;
  cursor: pointer;
}

.has-children::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 0;
  width: 20px;
  border-left: 1px dotted #ccc;
}

.children-container {
  position: relative;
}

.children-container::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 9px;
  width: 1px;
  height: 100%;
  border-left: 1px dotted #ccc;
}

/* Styles for the Plus icon */
.fa-plus {
  margin-left: 5px;
  cursor: pointer;
}
</style>
