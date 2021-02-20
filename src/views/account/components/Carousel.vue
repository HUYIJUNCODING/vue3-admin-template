<template>
    <div class="swiper">
        <el-carousel interval="5000" indicator-position="none" arrow="never" height="600px">
            <el-carousel-item v-for="(item, index) in imgs" :key="index">
                <img :src="item" alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script lang="ts">

import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    name: "carousel",
    setup() {
        const state = reactive({
            swiperOption: {
                effect: "fade",
                autoplay: {
                    delay: 8000,
                    disableOnInteraction: false
                },
                loop: true
            },
            imgs: [
                "http://static.ledouya.com/FthHmRc8bm7l19104adxq9rvhWqj",
                "http://static.ledouya.com/FlFc81GToeD0cWQwzxEgza-nGmbH",
                "http://static.ledouya.com/FpRkgTur87WqVtAVctP_ciDIqd3z",
                "http://static.ledouya.com/FnA13EROlloHCGJVGcRZchL-T5HR",
                "http://static.ledouya.com/Ftc6W8mcabs16gcTsjtd-7WS64dZ",
                "http://static.ledouya.com/Fr5-Wq4Ujk2pZQiqadW9EHdM_k2g"
            ]
        });
        return {
            ...toRefs(state)
        };
    }
});
</script>
<style lang="scss" scoped>
    img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    }
</style>
