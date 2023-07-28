<template>
  <div class="mb-4">
    <button class="w-100" :class="{ 'btn btn-outline-primary': !isChecked, 'btn btn-primary': isChecked }" @click="toggleState(isChecked = !isChecked)">{{  label }}</button>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);

const props = defineProps(["label", "modelValue", "name"]);

const isChecked = ref(false);

watch(() => props.modelValue, () => {

  if (Array.isArray(props.modelValue)) {

    const modelValueSet = new Set(props.modelValue);
    
    isChecked.value = modelValueSet.has(props.name);
  
  }

})

const toggleState = (isChecked) => {

  if (Array.isArray(props.modelValue)) {
    
    const modelValueSet = new Set(props.modelValue);
  
    if (isChecked) modelValueSet.add(props.name);

    if (!isChecked) modelValueSet.delete(props.name);
      
    emit("update:modelValue", Array.from(modelValueSet));
  
  }

}
</script>
