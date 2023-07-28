<template>
  <div>
    <label class="form-label">{{ label }}</label>
    <div>
      <div v-for="option of options" class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :id="`${name}-${option}`"
          :name="name"
          value="{{ option }}"
        />
        <label class="form-check-label" for="gender-male">{{ option }}</label>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["name", "label", 'options']);
</script>
