<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
  margin: auto;
  border: 20px solid #f1f1f1;
  border-radius: 50%;
  border-top: 20px solid #f1ac18;
  width: 200px;
  height: 200px;
  animation: spinner 2s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
