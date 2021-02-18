<template>
    <div class="swiper">
        <swiper :options="swiperOption">
            <swiper-slide v-for='(item,index) in imgs' :key='index'>
                <img :src="item" alt="乐店云-小程序模板|微信小程序开发工具|微信小程序制作平台|新零售解决方案">
            </swiper-slide>

        </swiper>
    </div>
</template>
<script>
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    export default {
        data() {
            return {
                swiperOption: {
                    effect: "fade",
                    autoplay: {
                        delay: 8000,
                        disableOnInteraction: false
                    },
                    loop: true,
                },
                imgs:[
                    'http://static.ledouya.com/FthHmRc8bm7l19104adxq9rvhWqj',
                    'http://static.ledouya.com/FlFc81GToeD0cWQwzxEgza-nGmbH',
                    'http://static.ledouya.com/FpRkgTur87WqVtAVctP_ciDIqd3z',
                    'http://static.ledouya.com/FnA13EROlloHCGJVGcRZchL-T5HR',
                    'http://static.ledouya.com/Ftc6W8mcabs16gcTsjtd-7WS64dZ',
                    'http://static.ledouya.com/Fr5-Wq4Ujk2pZQiqadW9EHdM_k2g'
                ]
            };
        },
        components: {
            swiper,
            swiperSlide
        }
    };
</script>
<style scoped>
    @media only screen and (max-width: 1500px){
        .swiper img{

        }
    }
</style>

