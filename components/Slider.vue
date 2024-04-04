<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import arrowBack from '../assets/icons/arrow_back.svg'
import arrowForward from '../assets/icons/arrow_forward.svg'
import {imagesArray} from "~/store/states";
import closeBtn from '../assets/icons/close.svg'

const slides = imagesArray();
const firstShownSlideIndex = ref(0)
const lastShownSlideIndex = ref(4);
const slideWidth = ref(25)

onMounted(() => {
  addEventListener('resize', detectScreenSize);
})

function showNextSlide() {
  firstShownSlideIndex.value++;
  lastShownSlideIndex.value++;
}

function showPrevSlide() {
  firstShownSlideIndex.value--;
  lastShownSlideIndex.value--;
}

function deleteImage(slideToDelete: string) {
  slides.value = slides.value.filter((slide) => {
    return slideToDelete !== slide;
  })
}

function detectScreenSize() {
  const screenWidth = window.screen.availWidth;
  if (screenWidth > 1045) {
    lastShownSlideIndex.value = firstShownSlideIndex.value + 4; // slides per page
    slideWidth.value = 25;
  } else if (screenWidth > 800) {
    lastShownSlideIndex.value = firstShownSlideIndex.value + 3;
    slideWidth.value = 33;
  } else if (screenWidth < 800 && screenWidth > 500) {
    lastShownSlideIndex.value = firstShownSlideIndex.value + 2;
    slideWidth.value = 50;
  } else {
    lastShownSlideIndex.value = firstShownSlideIndex.value + 1;
    slideWidth.value = 100;
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', detectScreenSize);
});
</script>

<template>
  <div class="slider">
    <button v-if="firstShownSlideIndex > 0" @click="showPrevSlide">
      <img :src="arrowBack" alt="Back">
    </button>
    <div v-for="(slide, index) in slides.slice(firstShownSlideIndex, lastShownSlideIndex)"
         :style="{ width: slideWidth + '%' }" :key="index" class="slide">
      <div class="image-wrapper">
        <button class="remove-btn" @click="deleteImage(slide)">
          <img :src="closeBtn" alt="close"/>
        </button>
        <img :src="slide.url" :alt="'Image ' + (index + 1)">
      </div>
    </div>
    <button v-if="slides.length > lastShownSlideIndex" @click="showNextSlide">
      <img :src="arrowForward" alt="Next">
    </button>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px;
  height: 100%;
  width: 100%;
}

.slide {
  height: 100%;
  padding: 15px;
  margin: 5px;
}

.slide img {
  width: 100%;
  height: 100%;
}

.image-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
  height: 100%;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 20px;
  width: 20px;
  padding: 2px;
  border-radius: 50px;
  background-color: white;
  display: none;
}
.image-wrapper:hover > .remove-btn{
  display: block;
}
</style>
