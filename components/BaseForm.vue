<template>

    <form @submit.prevent="submit">
        <slot></slot>
    </form>

</template>
<script setup>

const emit = defineEmits(['submit']);

const validators = ref([]);

provide("baseFormValidators", validators);

const validate = async () => {

    const validates = await Promise.all(validators.value.map( validator => validator.value.$validate() ));

    return validates.reduce((previous, validator) => validator, false);

}

const submit = async () => {

    const isValid = await validate();

    isValid ? emit('submit') : null;

}

</script>