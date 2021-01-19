<template>
    <router-view />
</template>

<style lang="scss">

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


//覆盖el默认样式
.el-menu {
    border: 0 !important;
}

</style>