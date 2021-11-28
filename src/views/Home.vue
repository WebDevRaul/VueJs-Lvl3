<template>
  <Introduction />
  <Main />
</template>

<script>
import Introduction from '@/components/Introduction.vue';
import Main from '@/components/Main.vue';

  export default {
    name: 'Home',
    components: { 
      Introduction, Main
    }
  };
</script>

<style lang="scss" scoped>

</style>