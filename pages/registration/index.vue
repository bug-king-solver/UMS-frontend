<template>
  <NuxtLayout name="dashboard">
    <div class="content">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb push">
            <li class="breadcrumb-item active" aria-current="page">
              Registeration
            </li>
          </ol>
        </nav>
        <BaseBlock title="Students" content-full>
          <!-- TODO: Ask about searching factors -->
          <BaseDataset name="students" :dataset="students" :indexes="['first_name']" :columns="['Profile Image', ...textColumns]">
            <template #controller>
              <button class="btn btn-primary" @click="importData">Import</button>
              <button class="btn btn-primary">Add New Student</button>
            </template>
            <template #default="{ row, rowIndex }">
              <tr :class="{ 'table-success': row.current_status === 'active', 'table-danger': row.current_status === 'not-attending', 'table-info': row.current_status === 'alumni', 'table-active': row.current_status === 'dead' }">
                <th scope="row">{{ rowIndex + 1 }}</th>
                <td style="min-width: 100px">
                  <button
                    class="image bg-image rounded bg-image-center block-content block-content-sm border-0"
                    :style="{
                      backgroundImage: `url(${row.profile_image})`,
                      width: '50px',
                      height: '50px',
                    }"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-block-normal"
                    @click="() => (selectedStudent = row)"
                  ></button>
                </td>
                <td v-for="textColumn of textColumns" :key="textColumn" style="min-width: 150px">{{ row[textColumn.split(' ').map((word) => word[0].toLowerCase() + word.slice(1)).join('_')] }}</td>
              </tr>
            </template>
          </BaseDataset>
        </BaseBlock>
      </div>
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
            <BaseBlock :title="selectedStudent.full_name_english" transparent class="mb-0">
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
                <div class="block-content fs-sm block-content-full">
                  <img
                    :src="selectedStudent.profile_image"
                    style="aspect-ratio: 1/1; object-fit: cover"
                    class="w-100"
                  />
                </div>
              </template>
            </BaseBlock>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">

const { data: { value: students } } = await useFetch('/api/v1/students');

const selectedStudent = ref({});

const textColumns = Object.keys(students[0]).slice(1).map(column => column.replaceAll("_", " "));

const importData = () => {
  // TODO: implement importData function
};
</script>
