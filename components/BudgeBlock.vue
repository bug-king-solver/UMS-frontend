<template>
    <BaseBlock class="bg-gray-dark p-0">
        <div>
            <h3 class="text-gray-lighter text-center"> {{ totalAmount }} </h3>
        </div>
        <div>
            <p class="text-gray-lighter mb-0"> {{ descriptions }} </p>
        </div>
    </BaseBlock>
</template>
<script setup>
const props = defineProps(["totalAmount", "descriptions"]);
</script>
<style lang="scss" scoped>
@import "~/assets/scss/oneui/_variables-bootstrap";

</style>