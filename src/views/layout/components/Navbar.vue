<template>
    <div class="nav-box row-flex row-flex-start row-flex-middle">navbar</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: 'navbar',
    setup(props) {
        return {}
    }
    
})
</script>

<style lang="scss" scoped>
    .nav-box {
        @include size(100%,64px);
        background-color: $box-bg;
        padding: 0 20px;
    }
    .nav-box.nav-box-flex {
        color: yellow;
    }
</style>