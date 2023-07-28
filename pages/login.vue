<template>
  <!-- Page Content -->
  <div class="hero-static d-flex align-items-center bg-body">
    <div class="content">
      <div class="row justify-content-center push">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <!-- Sign In Block -->
          <BaseBlock title="Login" class="mb-0">

            <div class="p-sm-3 px-lg-4 px-xxl-5 py-lg-5">
              <img class="w-100" src="/images/identity/full-logo-colorful.png"/>

              <!-- Sign In Form -->
              <BaseForm @submit="onSubmit">
                <div class="py-3">
                  <BaseInput
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    id="login-publickey"
                    name="login-publickey"
                    placeholder="Username, Email or Phone"
                    :rules="publickey"
                  ></BaseInput>
                  <BaseInput
                    type="password"
                    class="form-control form-control-alt form-control-lg"
                    id="login-password"
                    name="login-password"
                    placeholder="Password"
                    :rules="password"
                  >
                  </BaseInput>
                  <div class="mb-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="login-remember"
                        name="login-remember"
                      />
                      <label class="form-check-label" for="login-remember"
                        >Remember Me</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6 col-xl-5">
                    <button type="submit" class="btn w-100 btn-alt-primary">
                      <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                      Sign In
                    </button>
                  </div>
                </div>
              </BaseForm>
              <!-- END Sign In Form -->
            </div>
          </BaseBlock>
          <!-- END Sign In Block -->
        </div>
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
<script setup>
import { required, helpers } from "@vuelidate/validators";

const publickey = {
    required: helpers.withMessage('This field cannot be empty', required),
}

const password = {
    required: helpers.withMessage('This field cannot be empty', required),
}

// On form submission
function onSubmit() {}
</script>