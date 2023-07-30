<template>
  <div class="table-responsive">
    <button class="btn btn-secondary float-end mb-2" v-if="!hasEditableRow" @click="addRow">Add Row</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Indebted</th>
          <th>Creditor</th>
          <th>Files</th>
          <th>Notes</th>
          <th>Transacted With</th>
          <th>Added By</th>
          <th>Date/Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.id }}</span>
            <input v-else v-model="row.id" autofocus />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.type }}</span>
            <input v-else v-model="row.type" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.indebted }}</span>
            <input v-else v-model="row.indebted" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.creditor }}</span>
            <input v-else v-model="row.creditor" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.files }}</span>
            <input v-else v-model="row.files" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.notes }}</span>
            <input v-else v-model="row.notes" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.transactedWith }}</span>
            <input v-else v-model="row.transactedWith" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.addedBy }}</span>
            <input v-else v-model="row.addedBy" />
          </td>
          <td :class="{ editable: row.editable }">
            <span v-if="!row.editable">{{ row.dateTime }}</span>
            <input v-else v-model="row.dateTime" />
          </td>
          <td>
            <template v-if="isNewRow || row.editable">
              <button class="cell-button" @click="handleEdit(index)">
                {{ row.editable ? 'Save' : 'Edit' }}
              </button>
              <button v-if="row.editable" class="cell-button" @click="cancelEdit(index)">Cancel</button>
              <button v-if="!row.editable" class="cell-button" @click="removeRow(index)">Remove</button>
            </template>
            <template v-else>
              <button class="cell-button" @click="handleEdit(index)">Edit</button>
              <button class="cell-button" @click="removeRow(index)">Remove</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tableData = ref([
  { id: 'Id', type: 'Type', indebted: 'Indebted', creditor: 'Creditor', files: 'Files', notes: 'Notes', transactedWith: 'Transacted With', addedBy: 'AddedBy', dateTime: 'Date/Time', editable: false },
]);

const addRow = () => {
  tableData.value.push({ id: '', type: '', indebted: '', creditor: '', files: '', notes: '', transactedWith: '', addedBy: '', dateTime: '', editable: true });
  isNewRow.value = true;
};

const removeRow = (index) => {
  if (!isNewRow.value) {
    tableData.value.splice(index, 1);
  } else {
    window.alert('Complete new row.')
  }
};

const handleEdit = (index) => {
  const row = tableData.value[index];

  if (row.editable) {
    // Save changes and switch to non-editable mode
    row.editable = false;
    isNewRow.value = false;
    // Perform any save action if needed
  } else {
    // Switch to editable mode
    if (isNewRow.value) {
      window.alert("Complete new row.")
    } else {
      row.editable = true;
      // Focus the input field when entering edit mode
      const editInput = $refs.editInput[index];
      if (editInput) {
        editInput.focus();
      }
    }
  }
};

const cancelEdit = (index) => {
  const row = tableData.value[index];
  if (isNewRow.value) {
    // If it's a newly added row, remove it from the tableData
    tableData.value.splice(index, 1);
    isNewRow.value = false;
  } else {
    // Discard changes and switch back to non-editable mode
    row.editable = false;
  }
};

const editLabel = computed(() => {
  return tableData.value.some((row) => row.editable) ? 'Save' : 'Edit';
});

// Computed property to check if any row is in editable mode
const hasEditableRow = computed(() => {
  return tableData.value.some((row) => row.editable);
});

// Data property to track whether a new row is being added
const isNewRow = ref(false);
</script>

<style>
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

/* Set a fixed width for the first column to prevent it from being too wide on small screens */
th:first-child,
td:first-child {
  min-width: 100px;
}

.editable input {
  width: 100%;
}

button {
  margin-right: 5px;
}
</style>
