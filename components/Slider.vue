<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import arrowBack from '../assets/icons/arrow_back.svg'
import arrowForward from '../assets/icons/arrow_forward.svg'
import {imagesArray} from "~/composable/states";

const slides = imagesArray();

onMounted(() => {
  checkSlidesPerPage();
  window.addEventListener('resize', checkSlidesPerPage);
});

const totalSlides = ref(slides.value.length);
const currentSlidePerPage = ref(0);
const slidesPerPage = ref(4);


const checkSlidesPerPage = () => {

};

const showNextSlide = () => {

};

const showPrevSlide = () => {

};

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkSlidesPerPage);
});
</script>

<template>
  <div class="slider">
    <button @click="showPrevSlide">
      <img :src="arrowBack" alt="Back">
    </button>
    <div class="slides">
      <div v-for="(slide, index) in slides" :key="index"
           :class="{ 'slide': true, 'shown-slide': index >= currentSlidePerPage && index < currentSlidePerPage + slidesPerPage }">
        <img :src="slide.url" :alt="'Image ' + (index + 1)">
      </div>
    </div>
    <button @click="showNextSlide">
      <img :src="arrowForward" alt="Next">
    </button>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 80%;
  overflow: hidden;
  padding: 80px 20px 0;
}

.slides {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}

.slide {
  float: left;
  height: 100%;
  min-width: 200px;
  display: none;
  padding: 8px;
}

.slide img {
  width: 100%;
  height: 100%;
}

.shown-slide {
  display: block;
}

button {
  height: fit-content;
  width: fit-content;
}
</style>
