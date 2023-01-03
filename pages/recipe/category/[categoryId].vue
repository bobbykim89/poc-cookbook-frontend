<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.categoryId }}
  </div>
</template>

<style scoped></style>
