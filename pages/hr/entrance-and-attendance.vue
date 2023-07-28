<template>
  <NuxtLayout name="dashboard">
    <div class="content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item">
            <NuxtLink to="/hr">HR</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Entrance & Attendance
          </li>
        </ol>
      </nav>
      <div>
        <BaseBlock title="Employees" content-full>
          <!-- TODO: Ask about searching factors -->
          <BaseDataset
            name="attendance"
            :dataset="employees"
            :indexes="['first_name']"
            :columns="[
              'Profile Image',
              ...textColumns,
              'Attendance',
              'Mandatory',
              'Total Time',
            ]"
          >
            <template #controller>
              <NuxtLink to="/hr/attendance-settings" class="btn btn-primary"
                >Settings</NuxtLink>
              <NuxtLink to="/hr/calendar" class="btn btn-primary"
                ><i class="fa fa-calendar"></i></NuxtLink>
              <NuxtLink to="/hr/add-employee" class="btn btn-primary"
                ><i class="fa fa-person-circle-plus"></i
              ></NuxtLink>
            </template>
            <template #default="{ row, rowIndex }">
              <tr
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#full-modal"
              >
                <th scope="row">{{ rowIndex + 1 }}</th>
                <td style="min-width: 100px">
                  <button
                    class="image bg-image rounded bg-image-center block-content block-content-sm border-0"
                    :style="{
                      backgroundImage: `url(${row.image})`,
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
                  {{ row[textColumn] }}
                </td>
                <td style="min-width: 100px">
                  <div class="row gap-2 justify-content-center">
                    <div class="badge bg-secondary col-6">
                      Days: {{ row.attendance_days }}
                    </div>
                    <div class="badge bg-secondary col-6">
                      Hours: {{ row.attendance_hours }}
                    </div>
                  </div>
                </td>
                <td style="min-width: 100px">
                  <div class="row gap-2 justify-content-center">
                    <div class="badge bg-secondary col-6">
                      Days: {{ row.mandatory_days }}
                    </div>
                    <div class="badge bg-secondary col-6">
                      Hours: {{ row.mandatory_hours }}
                    </div>
                  </div>
                </td>
                <td style="min-width: 150px">
                  <div class="row gap-2 justify-content-center">
                    <div
                      class="badge col-6 bg-secondary"
                      :class="{
                        'bg-success':
                          totalDays(row) >= 100 && totalDays(row) <= 110,
                        'bg-danger': totalDays(row) < 100,
                        'bg-primary': totalDays(row) > 110,
                      }"
                    >
                      Days: {{ totalDays(row) }}%
                    </div>
                    <div
                      class="badge col-6 bg-secondary"
                      :class="{
                        'bg-success':
                          totalHours(row) >= 100 && totalHours(row) <= 110,
                        'bg-danger': totalHours(row) < 100,
                        'bg-primary': totalHours(row) > 110,
                      }"
                    >
                      Hours: {{ totalHours(row) }}%
                    </div>
                  </div>
                </td>
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
            <BaseBlock
              :title="selectedEmployee.fullName"
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
                    :src="selectedEmployee.image"
                    style="aspect-ratio: 1/1; object-fit: cover"
                    class="w-100"
                  />
                </div>
              </template>
            </BaseBlock>
          </div>
        </div>
      </div>

      <div
        class="modal"
        id="full-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="full-modal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <BaseBlock transparent class="mb-0">
              <template #title>
                <div>{{ selectedEmployee.full_name }}</div>
                <div class="text-muted text-normal">
                  {{ selectedEmployee.position }} - {{ selectedEmployee.title }}
                </div>
              </template>
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
const { data } = await useFetch("/api/v1/employees");

const textColumns = ['full_name', 'staff_off', 'position', 'title'];

const employees = data.value.map(employee => {

  const mandatory_days = employee.attendances.length;

  const attendance_days = employee.attendances.filter( attendance => attendance.status === "present" ).length;

  const mandatory_hours = employee.attendances.reduce( (prev, attendance) => prev + attendance.mandatory, 0 );

  const attendance_hours = employee.attendances.reduce( (prev, attendance) => prev + attendance.hours, 0 )

  return { ...employee, mandatory_days, attendance_days, mandatory_hours, attendance_hours }

})

const selectedEmployee = ref({});

const importData = () => {};

const totalDays = (row) => {
  return row.mandatory_days <= 0
    ? 0
    : Math.floor((row.attendance_days / row.mandatory_days) * 100);
};

const totalHours = (row) => {
  return row.mandatory_hours <= 0
    ? 0
    : Math.floor((row.attendance_hours / row.mandatory_hours) * 100);
};
</script>
