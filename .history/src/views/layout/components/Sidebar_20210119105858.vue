<template>
    <div class="sidebar-container">
        <div class="head-box">
            <img class="logo" src="@/assets/logo.png" alt="" />
        </div>
        <div class="menu-box">
          
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect } from "vue";

export default defineComponent({
    name: "Sidebar",
    setup(props) {
        const data = reactive({});
       
        return {
           data
        };
    }
});
</script>

<style lang="scss">
.sidebar-container {
    @include size(200px, 100%);
    background-color: $theme-bg;
    .head-box {
        .logo {
            @include size(50px, 50px);
            margin: 15px auto;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:hover {
                transform: rotate(360deg);
                transition: all 0.6s ease-in-out;
            }
        }
    }
}
</style>
