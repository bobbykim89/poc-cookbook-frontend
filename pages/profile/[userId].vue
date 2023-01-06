<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.userId }}
  </div>
</template>

<style scoped></style>
