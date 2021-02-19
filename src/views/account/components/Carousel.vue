<template>
    <div class="swiper">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in imgs" :key="index">
                <img :src="item" alt="" />
            </swiper-slide>
        </swiper>
    </div>
</template>
<script lang="ts">
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
    name: 'carousel',
    components: {
        Swiper,
        SwiperSlide
    },
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

</style>
