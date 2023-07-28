<template>
  <div class="mb-4">
    <input
      v-bind="$attrs"
      v-model="value"
      :class="{
        'is-invalid': v$.$errors.length,
      }"
      @input="$event => { v$.$touch; emit('update:modelValue', $event.target.value) }"
    />
    <div
      class="invalid-feedback animated fadeIn"
      v-for="error of v$.$errors"
      :key="error.$uid"
    >
      <div>{{ error.$message }}</div>
    </div>
  </div>
</template>
<script setup>
import useVuelidate from "@vuelidate/core";
import { maxLength } from "@vuelidate/validators";

defineOptions({ inheritAttrs: false });

const props = defineProps(["rules", "modelValue"]);

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue)

const rules = computed(() => {
  return {
    ...props.rules,
    maxLength: maxLength(32),
  };
});

const v$ = useVuelidate(rules, value);

const baseFormValidators = inject('baseFormValidators');

if ( baseFormValidators ) baseFormValidators.value = [ ...baseFormValidators.value, v$ ];
</script>
