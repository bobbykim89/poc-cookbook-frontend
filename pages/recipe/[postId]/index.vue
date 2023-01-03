<script setup lang="ts">
const route = useRoute()
console.log(route.params.postId)
</script>

<template>
  <div>
    {{ route.params.postId }}
  </div>
</template>

<style scoped></style>
