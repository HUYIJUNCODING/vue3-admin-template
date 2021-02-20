<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({

    beforeMount() {
        this.$store.commit("checkRole");  
    }
});
</script>
<style lang="scss">
@import "~@/styles/common/iconfont/iconfont.css";
#app {
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $default-color;
    background-color: $page-bg;
}
</style>
