<template>
    <div class="control-panel-header"></div>
    <div class="control-panel-body">
        111
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect } from "vue";

function error(message: string): never {
    // throw new Error(message)
    return error(message)
}



export default defineComponent({
    setup() {
        let str = '';
        str = undefined;



        return { str };
    }
});
</script>

<style lang="scss"></style>
