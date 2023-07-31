<template>
  <div class="tree-node" :class="{ 'has-children': hasChildren }">
    <span @click="toggleNode">
      <i v-if="hasChildren && isExpanded" class="fas fa-folder-open"></i>
      <i v-else-if="hasChildren" class="fas fa-folder"></i>
      <i v-else class="fa fa-file-alt"></i>
      {{ node.name }}
    </span>
    <a data-bs-toggle="modal" data-bs-target="#modal-block-normal">
      <i v-if="hasChildren && !isExpanded" class="fas fa-plus"></i>
    </a>
    <div v-if="hasChildren && isExpanded" class="children-container">
      <TreeNode v-for="child in node.children" :key="child.id" :node="child" @click="handleAction(child)" />
    </div>
    <!-- Modal for adding new sub-categories or accounts -->
    <div
      class="modal"
      id="modal-block-normal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-block-normal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <BaseBlock title="Add new category or account" transparent class="mb-0">
            <template #options>
              <button
                type="button"
                class="btn-block-option"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </template>

            <template #content>
              <div class="block-content fs-sm">
                <p>
                  Dropdowns
                </p>
              </div>
              <div class="block-content block-content-full text-end bg-body">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary me-1"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  data-bs-dismiss="modal"
                >
                  Perfect
                </button>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { node } = defineProps(['node']);

const isExpanded = ref(false);
const hasChildren = ref(!!node.children);
const showingModal = ref(false);
const selectedType = ref('category');
const nameEnglish = ref('');
const nameArabic = ref('');
const nameKurdish = ref('');

const toggleNode = () => {
  isExpanded.value = !isExpanded.value;
};

const handleAction = (child) => {
  if (!child.children) {
    window.alert("Modal");
  }
};

const onPlusIconClick = () => {
  showingModal.value = true;
};

const hideModal = () => {
  showingModal.value = false;
  resetForm();
};

const resetForm = () => {
  selectedType.value = 'category';
  nameEnglish.value = '';
  nameArabic.value = '';
  nameKurdish.value = '';
};

const addItem = () => {
  const newItem = {
    type: selectedType.value,
    name: {
      english: nameEnglish.value,
      arabic: nameArabic.value,
      kurdish: nameKurdish.value,
    },
    children: selectedType.value === 'category' ? [] : undefined,
    id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
  };

  node.children = node.children || [];
  node.children.push(newItem);

  hideModal();
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
