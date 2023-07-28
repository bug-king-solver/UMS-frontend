<template>
  <NuxtLayout name="dashboard">
    <div class="content row">
      <BaseBlock class="col-12" content-full>
        <h3>{{ $t("colleges_and_departments.title") }}</h3>
        <BaseSectionsTable>
          <template #thead>
            <tr>
              <th style="width: 30px"></th>
              <th style="width: 20%">{{ $t("colleges_and_departments.table.columns.code") }}</th>
              <th class="d-none d-sm-table-cell">{{ $t("colleges_and_departments.table.columns.name_in_english") }}</th>
              <th class="d-none d-sm-table-cell">{{ $t("colleges_and_departments.table.columns.name_in_arabic") }}</th>
              <th class="d-none d-sm-table-cell">{{ $t("colleges_and_departments.table.columns.name_in_kurdish") }}</th>
            </tr>
          </template>
          <template
            name="default"
            v-for="(college, collegIndex) in colleges"
            :key="college.code"
          >
            <BaseSectionsTableSection>
              <template #header>
                  <td class="text-center">
                    <i class="fa fa-angle-right text-muted"></i>
                  </td>
                  <td class="fw-semibold fs-sm">
                    {{ college.code }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ college.name_english }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ college.name_arabic }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ college.name_kurdish }}
                  </td>
              </template>
              <template #body>
                <tr v-for="department of college.departments">
                  <td></td>
                  <td class="fw-semibold fs-sm">
                    {{ department.code }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ department.name_english }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ department.name_arabic }}
                  </td>
                  <td class="d-none d-sm-table-cell">
                    {{ department.name_kurdish }}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td class="fw-semibold fs-sm">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.code.placeholder')"
                      v-model="newDepartment.code"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_english.placeholder')"
                      v-model="newDepartment.name_english"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_arabic.placeholder')"
                      v-model="newDepartment.name_arabic"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_kurdish.placeholder')"
                      v-model="newDepartment.name_kurdish"
                    ></BaseInput>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button
                      class="btn btn-outline-primary w-100"
                      @click="addNewDepartment(collegIndex)"
                    >
                    {{ $t('colleges_and_departments.table.add_new_department_button') }}
                    </button>
                  </td>
                </tr>
              </template>
            </BaseSectionsTableSection>
          </template>
          <tbody>
            <tr>
                  <td></td>
                  <td class="fw-semibold fs-sm">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.code.placeholder')"
                      v-model="newCollege.code"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_english.placeholder')"
                      v-model="newCollege.name_english"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_arabic.placeholder')"
                      v-model="newCollege.name_arabic"
                    ></BaseInput>
                  </td>
                  <td class="d-none d-sm-table-cell">
                    <BaseInput
                      class="form-control"
                      :placeholder="$t('colleges_and_departments.table.form.name_in_kurdish.placeholder')"
                      v-model="newCollege.name_kurdish"
                    ></BaseInput>
                  </td>
                </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button class="btn btn-primary" @click="addNewCollege">
                  {{ $t('colleges_and_departments.table.add_new_college_button') }}
                </button>
              </td>
            </tr>
          </tbody>
        </BaseSectionsTable>
      </BaseBlock>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { reactive } from "vue";

const table = ref(null);

const newCollege = reactive({
  code: "",
  name_english: "",
  name_arabic: "",
  name_kurdish: "",
  departments: [],
});

const newDepartment = reactive({
  code: "",
  name_english: "",
  name_arabic: "",
  name_kurdish: "",
  departments: [],
});

// Example data
const colleges = reactive([
  {
    code: "ENG",
    name_english: "College Of Engineering",
    name_arabic: "كلية هندسة",
    name_kurdish: "كلية هندسة",
    departments: [
      {
        code: "CS",
        name_english: "Department Of Computer Science",
        name_arabic: "كلية هندسة",
        name_kurdish: "كلية هندسة",
      },
    ],
  },
]);

const resetTable = () => {
  table.value.classList.remove("js-table-sections-enabled");

  const tbodyAll = table.value.querySelectorAll("tbody");

  tbodyAll.forEach((tbodyEl) => {
    tbodyEl.classList.remove("show");
  });
};

const resetNewCollege = () => {
  newCollege.code = "";
  newCollege.name_english = "";
  newCollege.name_arabic = "";
  newCollege.name_kurdish = "";
};

const pushNewCollege = () => {
  colleges[colleges.length] = { ...newCollege };
};

const addNewCollege = async () => {
  pushNewCollege();

  resetNewCollege();

  await nextTick();

  resetTable();

};

const resetNewDepartment = () => {
  newDepartment.code = "";
  newDepartment.name_english = "";
  newDepartment.name_arabic = "";
  newDepartment.name_kurdish = "";
};

const pushNewDepartment = (collegeIndex) => {
  colleges[collegeIndex].departments = [
    ...Array.from(colleges[collegeIndex].departments),
    { ...newDepartment },
  ];
};

const addNewDepartment = async (collegeIndex) => {
  pushNewDepartment(collegeIndex);

  resetNewDepartment(collegeIndex);

  await nextTick();

  resetTable();

};
</script>
<style lang="scss"></style>
