<template>
    <div class="app-wrapper row-flex row-flex-start row-flex-top">
        <Sidebar class="sidebar-container" />
        <div class="main-container">
            <Navbar />
            <AppMain />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Sidebar, Navbar, AppMain } from "./components/index";

export default defineComponent({
    components: { Sidebar, Navbar, AppMain }
});
</script>

<style lang="scss" scoped>
@import './index';
</style>
