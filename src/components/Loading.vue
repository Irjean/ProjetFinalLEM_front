<template>
    <div id="loading">
        
    </div>
</template>
<script setup>

</script>
<style scoped>
    #loading{
  width: 50px;
  height: 50px;
  border-top: 10px solid rgb(0, 0, 0, 0);
  border-bottom: 10px solid rgb(0, 0, 0, 0);
  border-right: 10px solid black;
  border-left: 10px solid black;
  border-radius: 50%;
  animation: loading 1.5s linear infinite;
}

@keyframes loading{
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}
</style>