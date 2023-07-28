<template>
  <NuxtLayout name="dashboard">
    <div class="content bg-body" style="height: 100vh">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item">
            <NuxtLink to="/hr">HR</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Add Employee</li>
        </ol>
      </nav>
      <BaseForm ref="form" @submit="onSubmit">
        <BaseBlock title="Personal Info">
          <div class="row">
            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="Kurdish Full Name"
              ></BaseInput>
            </div>
            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="English / Passpost Name"
              ></BaseInput>
            </div>
            <div class="col-6 col-md-5 col-xl-3">
              <label class="form-label">Identity Card</label>
              <FilePond :max-files="2" :allow-multiple="true"></FilePond>
            </div>
          </div>
        </BaseBlock>
        <BaseBlock title="Universty Info">
          <div class="row">
            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="College"
              ></BaseInput>
            </div>
            <div class="col-6">
              <BaseInput
                class="form-control form-control-alt form-control-lg"
                placeholder="Department"
              ></BaseInput>
            </div>
          </div>
        </BaseBlock>
        <div class="row mb-4">
          <div class="col-12 col-md-4 col-xl-2">
            <button type="submit" class="btn w-100 btn-alt-primary">
              Add Student
            </button>
          </div>
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
