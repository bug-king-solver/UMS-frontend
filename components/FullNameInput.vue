<template>
    
    <BaseInput v-model="fullname"></BaseInput>

</template>
<script setup>
const emit = defineEmits(["update:names"])

const fullname = ref("");

const names = computed(() => {

    const names = fullname.value.split(" ");

    return {

        firstName: names[0],
        
        secondName: names[1],
        
        thirdName: names[2],
        
        fourthName: names[4]

    }

});

watch(names, () => emit("update:names", names));
</script>