<template>
    <div>
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
              <button @click="handleEdit(index)">
                {{ row.editable ? 'Save' : 'Edit' }}
              </button>
              <button @click="removeRow(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addRow">Add Row</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const tableData = ref([
    {
      id: 'ID',
      type: 'Type',
      indebted: 'Indebted',
      creditor: 'Creditor',
      files: 'Files',
      notes: 'Notes',
      transactedWith: 'Transacted With',
      addedBy: 'AddedBy',
      dateTime: 'Date/Time',
      editable: false,
    },
  ]);
  
  const addRow = () => {
    tableData.value.push({
      id: '',
      type: '',
      indebted: '',
      creditor: '',
      files: '',
      notes: '',
      transactedWith: '',
      addedBy: '',
      dateTime: '',
      editable: true,
    });
  };
  
  const removeRow = (index) => {
    tableData.value.splice(index, 1);
  };
  
  const handleEdit = (index) => {
    const row = tableData.value[index];
  
    if (row.editable) {
      // Save changes and switch to non-editable mode
      row.editable = false;
      // Perform any save action if needed
    } else {
      // Switch to editable mode
      row.editable = true;
      // Focus the input field when entering edit mode
      const editInput = $refs.editInput[index];
      if (editInput) {
        editInput.focus();
      }
    }
  };
  
  const editLabel = computed(() => {
    return tableData.value.some((row) => row.editable) ? 'Save' : 'Edit';
  });
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  .editable input {
    width: 100%;
  }
  
  button {
    margin-right: 5px;
  }
  </style>
  