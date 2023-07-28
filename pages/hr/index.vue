<template>
  <NuxtLayout name="dashboard">
    <div class="content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item active" aria-current="page">HR</li>
        </ol>
      </nav>
      <BaseBlock title="Employees" content-full>
        <!-- TODO: Ask about searching factors -->
        <BaseDataset
          name="employees"
          :dataset="employees"
          :indexes="['first_name']"
          :columns="['Profile Image', ...textColumns]"
        >
          <template #controller>
            <button class="btn btn-primary" @click="importData">Import</button>
            <button class="btn btn-primary">Add New Employee</button>
          </template>
          <template #default="{ row, rowIndex }">
            <tr
              role="button"
              :class="{
                'table-success': row.current_status === 'active',
                'table-danger': row.current_status === 'not-attending',
                'table-info': row.current_status === 'alumni',
                'table-active': row.current_status === 'dead',
              }"
            >
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
                  @click="() => (selectedEmployee = row)"
                ></button>
              </td>
              <td
                v-for="textColumn of textColumns"
                :key="textColumn"
                style="min-width: 150px"
              >
                {{
                  row[
                    textColumn
                      .split(" ")
                      .map((word) => word[0].toLowerCase() + word.slice(1))
                      .join("_")
                  ]
                }}
              </td>
            </tr>
          </template>
        </BaseDataset>
      </BaseBlock>
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
            <BaseBlock
              :title="selectedEmployee.full_name"
              transparent
              class="mb-0"
            >
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
                    :src="selectedEmployee.profile_image"
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
const {
  data: { value: employees },
} = await useFetch("/api/v1/employees");

const textColumns = Object.keys(employees[0]).slice(1, Object.keys(employees[0]).length - 1).map(column => column.replaceAll("_", " "))

const selectedEmployee = ref({});

const importData = () => {}
</script>
