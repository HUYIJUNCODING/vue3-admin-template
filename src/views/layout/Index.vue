<template>
    <div class="layout-container row-flex row-flex-start row-flex-top">
        <Sidebar />
        <div class="main-box">
            <Navbar />
            <AppMain />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Sidebar, Navbar, AppMain } from "./components/index";

export default defineComponent({
    components: { Sidebar, Navbar, AppMain },
    setup(props) {
        return {};
    }
});
</script>

<style lang="scss" scoped>
.layout-container {
    height: 100%;
    width: 100%;
    .main-box {
        flex: 1;
        height: 100%;
    }
}
</style>
