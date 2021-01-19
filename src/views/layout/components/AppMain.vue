<template>
    <div class="app-main-container">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {},
    setup(props) {
        return {};
    }
});
</script>

<style lang="scss" scoped>
.app-main-container {
   @include size(100%,calc(100% - 64px));
   padding: 15px;
   overflow-y: auto;
}
</style>
