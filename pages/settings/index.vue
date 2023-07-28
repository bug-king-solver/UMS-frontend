<template>
  <NuxtLayout name="dashboard">
    <div class="content">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb push">
          <li class="breadcrumb-item active" aria-current="page">Settings</li>
        </ol>
      </nav>
      <div class="row">
        <NuxtLink to="/settings/colleges-and-departments">
            <BaseBlock class="col-4" tag="a" link-pop content-full href="javascript:void(0)">
              <div class="fs-lg fw-semibold text-uppercase text-center">
                <i class="fa fa-school"></i>
                Colleges & Departments
              </div>
            </BaseBlock>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup></script>
