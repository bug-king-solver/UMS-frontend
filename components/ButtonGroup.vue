<template>
    <div class="pb-3" v-for="(option, index) in options" :key="index">
        <button
        :class="selectedOption === option ? 'btn btn-secondary' : 'btn btn-light'"
        @click="selectOption(option)"
        >
        {{ option }}
        </button>
    </div>
</template>
<script setup>
    const options = ['All transactions', 'Presets', 'Custom Date From, To'];
    const selectedOption = ref('All transactions');

    const selectOption = (option) => {
        selectedOption.value = option;
    };
</script>