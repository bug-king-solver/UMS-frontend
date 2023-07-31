<template>
  <div class="table-responsive">
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <!-- Add more headers for additional fields -->
          <th>Type</th>
          <th>Indebted</th>
          <th>Creditor</th>
          <th>Files</th>
          <th>Notes</th>
          <th>Transacted With</th>
          <th>Added By</th>
          <th>Date/Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData" :key="row.id">
          <td>
            <template v-if="!row.id">
              <input v-model="row.id" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.id }}</span>
            </template>
          </td>
          <td>
            <template v-if="!row.id">
              <input v-model="row.type" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.type }}</span>
            </template>
          </td>
          <td>
            <input
              v-if="!row.id"
              v-model="row.indebted"
              type="text"
              class="input-field"
              :disabled="row.creditor !== ''"
            >
            <span v-else>{{ row.indebted }}</span>
          </td>
          <td>
            <input
              v-if="!row.id"
              v-model="row.creditor"
              type="text"
              class="input-field"
              :disabled="row.indebted !== ''"
            >
            <span v-else>{{ row.creditor }}</span>
          </td>
          <td>
            <template v-if="!row.id">
              <input type="file" class="input-field" @change="handleFileUpload($event, row)">
            </template>
            <template v-else>
              <span>{{ row.files }}</span>
            </template>
          </td>
          <td>
            <template v-if="!row.id">
              <input v-model="row.notes" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.notes }}</span>
            </template>
          </td>
          <td>
            <template v-if="!row.id">
              <input v-model="row.transactedWith" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.transactedWith }}</span>
            </template>
          </td>
          <td>
            <template v-if="!row.id">
              <input v-model="row.addedBy" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.addedBy }}</span>
            </template>
          </td>
          <td>
            <template v-if="!row.id">
              <input v-model="row.dateTime" type="text" class="input-field">
            </template>
            <template v-else>
              <span>{{ row.dateTime }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const tableData = ref([
  // The first row is empty
  { 
    id: '', 
    type: '',
    indebted: '',
    creditor: '',
    files: '', // Store the file name here
    notes: '',
    transactedWith: '',
    addedBy: '',
    dateTime: '',
  },
  // Sample data for other rows
  { 
    id: '1', 
    type: 'Type1',
    indebted: 'No',
    creditor: 'Company A',
    files: 'sample_file.txt',
    notes: 'Lorem ipsum',
    transactedWith: 'Company B',
    addedBy: 'Admin',
    dateTime: '2023-07-27 10:30',
  },
  // Add more sample rows here
]);

// Watch for changes in the "Indebted" and "Creditor" fields and ensure only one is filled
watch(() => {
  const firstRow = tableData.value[0];

  if (firstRow.indebted !== '' && firstRow.creditor !== '') {
    // If both fields are filled, clear the last one that was typed
    if (firstRow.lastChanged === 'ind') {
      firstRow.creditor = '';
    } else if (firstRow.lastChanged === 'cred') {
      firstRow.indebted = '';
    }
  }
});

// Helper function to track which field was changed last
function updateLastChanged(field) {
  const firstRow = tableData.value[0];
  firstRow.lastChanged = field;
}

// Handle file upload event
function handleFileUpload(event, row) {
  const file = event.target.files[0];
  if (file) {
    // Store the file name in the "files" field
    row.files = file.name;
    // You can also handle uploading the file to a server here if needed
  }
}
</script>

<style>
/* Add your table styling here if needed */

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.input-field {
  width: 100%;
  box-sizing: border-box;
}
</style>
