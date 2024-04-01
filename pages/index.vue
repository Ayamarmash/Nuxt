<script setup lang="ts">
import {ref} from "vue";
import UploadImageModal from "~/components/UploadImageModal.vue";

let modalOpened = ref(true);
function openUploadModal(){
  modalOpened.value = true;
}
function closeUploadModal(){
  modalOpened.value = false;
}
</script>

<template>
  <div class="gallery-wrapper">
    <header>
      <div class="text-base	font-bold">Gallery</div>
      <button class="upload-btn text-sm rounded-full" @click="openUploadModal">Upload</button>
    </header>
    <div class="gallery-main">
      <slider/>
      <UploadImageModal v-if="modalOpened" @closeModal="closeUploadModal"/>
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid #9C9C9C;
  padding: 4.3rem 6rem 0.7rem;
}

.gallery-wrapper {
  background-color: white;
  height: 100%;
}

.upload-btn {
  background-color: #72A8CA;
  padding: 10px 24px 10px 24px;
}

.gallery-main {
  display: flex;
  justify-content: center;
  height: 100%;
}

</style>
