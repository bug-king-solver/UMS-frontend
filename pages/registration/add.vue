<template>
  <NuxtLayout name="dashboard">
    <div class="content bg-body" style="min-height: 100vh">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item">
            <NuxtLink to="/registration">Registeration</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Add</li>
        </ol>
      </nav>
      <BaseForm ref="form" @submit="onSubmit">
        <BaseBlock title="Personal Info">
          <div class="row">
            <div class="col-6">
              <label class="form-label">Student Photo</label>
              <FilePond :max-files="1" :allow-multiple="true"></FilePond>
            </div>

            <div class="col-6">
              <div
                class="col-12"
                v-for="input of ['full_name_kurdish', 'full_name_english']"
              >
                <FullNameInput
                  class="form-control form-control-alt form-control-lg"
                  :placeholder="
                    input
                      .split('_')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ')
                  "
                ></FullNameInput>
              </div>
            </div>

            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="Phone"
              ></BaseInput>
            </div>

            <div class="col-6 row">
              <BaseInput
                type="date"
                class="form-control form-control-alt form-control-lg"
              ></BaseInput>
            </div>
            
            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="Blood Type"
              ></BaseInput>
            </div>

            <div class="col-6">
              <BaseRadio label="Gender" :options="['male', 'female']" name="gender"></BaseRadio>
            </div>

            <div class="col-6 row">
              <BaseCheckbox label="My Mother is alive"></BaseCheckbox>
              <div
                v-for="input of ['mother\'s_name', 'mother\'s_job', 'mother_tongue' ]"
                class="col-12"
              >
                <BaseInput
                  class="form-control form-control-alt form-control-lg"
                  :placeholder="
                    input
                      .split('_')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ')
                  "
                ></BaseInput>
              </div>
            </div>

            <div class="col-6 row">
              <BaseCheckbox label="My Father is alive"></BaseCheckbox>
              <div
                v-for="input of ['father\'s_job']"
                class="col-12"
              >
                <BaseInput
                  class="form-control form-control-alt form-control-lg"
                  :placeholder="
                    input
                      .split('_')
                      .map((word) => word[0].toUpperCase() + word.slice(1))
                      .join(' ')
                  "
                ></BaseInput>
              </div>
            </div>

              <div class="col-6" v-for="input of ['Martyr Family', 'Political prisoner Family']">
                <BaseCheckbox
                  :label="input"
                ></BaseCheckbox>
              </div>
            
            <div
              v-for="input of [
                'nationality',
                'city',
                'state',
                'zip',
                'Student Residency Address',
              ]"
              class="col-6"
            >
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                :placeholder="
                  input
                    .split('_')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' ')
                "
              ></BaseInput>
            </div>
            <div
              class="col-6 col-md-5 col-xl-3"
              v-for="input of [
                'National ID',
                'Info ID',
                'Passport',
                'Summer Training',
                'Certificate',
                'Other Files',
              ]"
            >
              <label class="form-label">{{ input }}</label>
              <FilePond :max-files="2" :allow-multiple="true"></FilePond>
            </div>
          </div>
        </BaseBlock>
        <BaseBlock title="Student Academic details">
          <div class="row">
            <div
              v-for="input of [
                'Student’s University Code',
                'College name',
                'College code',
                'Department name',
                'Department code',
              ]"
              class="col-6"
            >
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                :placeholder="
                  input
                    .split('_')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' ')
                "
              ></BaseInput>
            </div>
          </div>
          <div class="col-6 row">
            <BaseInput
              type="date"
              class="form-control form-control-alt form-control-lg"
            ></BaseInput>
          </div>
          <div
            class="col-6 row"
            v-for="input of ['Current Level', 'Current Status']"
          >
            <BaseInput
              class="form-control form-control-alt form-control-lg"
              :placeholder="input"
            ></BaseInput>
          </div>
          <div class="col-6 col-md-5 col-xl-3">
            <label class="form-label">Letter of Ministry’s Approval</label>
            <FilePond :max-files="2" :allow-multiple="true"></FilePond>
          </div>
          <div class="col-6 col-md-5 col-xl-3">
            <BaseInput
              class="form-control form-control-alt form-control-lg"
              placeholder="Students Place of origin"
            ></BaseInput>
          </div>
          <div class="col-6 col-md-5 col-xl-3">
            <BaseInput
              class="form-control form-control-alt form-control-lg"
              placeholder="Name of the origin place"
            ></BaseInput>
          </div>
        </BaseBlock>
        <div class="row mb-4">
          <button type="submit" class="btn btn-alt-secondary col-2">
            Save progress
          </button>
          <button type="submit" class="btn btn-alt-primary col-2">
            Save & Next
          </button>
        </div>
      </BaseForm>
    </div>
  </NuxtLayout>
</template>
<script setup>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

const FilePond = vueFilePond();

// Import FilePond styles
import "filepond/dist/filepond.min.css";

const form = ref(null);

const onSubmit = () => {};
</script>
<style>
.filepond--credits {
  display: none;
}
</style>
