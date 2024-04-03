<script lang="ts" setup>
import {defineEmits, ref} from 'vue';
import {uploadImages} from "~/services/vintrackersAPI";
import closeBtn from '../assets/icons/close.svg'
import {imagesArray} from "~/composable/states";
import Spinner from "vue-simple-spinner/src/components/Spinner.vue";

const images = imagesArray();
const emit = defineEmits(['closeModal']);
const base64Images = ref([])
const valid = ref(true);
const isDragging = ref(false);
const isLoading = ref(false);
let files: any[] = [];
let inputElement: HTMLInputElement;

function closeModal() {
  emit('closeModal');
}

function handleUploadImage(event: Event) {
  inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    let addedFiles = Array.from(inputElement.files);
    addedFiles.forEach((file) => {
      files.push(file);
      convertToBase64(file);
    })
  }
}

function convertToBase64(file: Blob) {
  const reader = new FileReader();
  reader.onload = function (event) {
    base64Images.value.push(event.target?.result)
  };
  valid.value = file.size <= 2000000;
  if (valid) {
    reader.readAsDataURL(file);
  }
}

async function uploadImageClicked() {
  isLoading.value = true;
  try {
    await uploadImages(base64Images.value).then(() => {
      base64Images.value.forEach((image) => {
        images.value.push({
          url: image
        });
      });
      removeAllSelected();
      alert('Image Uploaded Successfully')
      closeModal();
    });
  } catch (error) {
    alert('Error occurred during image upload:' + error);
  } finally {
    isLoading.value = false;
  }
}

function onDragOver(e: any) {
  e.preventDefault();
  isDragging.value = true;
  e.dataTransfer.dropEffect = 'copy'
}

function onDragLeave(e: any) {
  e.preventDefault();
  isDragging.value = false;
}

function onDrop(e: any) {
  e.preventDefault();
  isDragging.value = false;
  let droppedFiles = Array.from(e.dataTransfer.files);
  droppedFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          files.push(file);
          convertToBase64(file);
        } else {
          alert('Invalid File Type')
        }
      }
  )
}

function removeSelectedImage(image) {
  base64Images.value = base64Images.value.filter((base64Image) => {
    return base64Image !== image;
  })
  inputElement.value = '';
}

function removeAllSelected() {
  base64Images.value = [];
  files = [];
  inputElement.value = '';
}
</script>

<template>
  <div class="modal">
    <div class="modal-wrapper" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <div class="text-base	font-semibold">Upload New Photo</div>
        <button class="close-btn" @click="closeModal"><img alt="close" :src="closeBtn"/></button>
      </div>
      <Spinner size="50px" v-if="isLoading"></Spinner>
      <div v-if="!isLoading" class="modal-input">
        <input multiple type="file" id="imageInput" accept="image/*" @change="handleUploadImage">
        <div style="font-size: 1em">OR</div>
        <div :class="{isDragging: isDragging}" class="text-blue-950	drag-and-drop-area" @dragover.prevent="onDragOver"
             @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
          <span v-if="!isDragging">Drag & Drop Image Here</span>
          <span v-if="isDragging">Drop Here</span>
        </div>
        <div v-if="!valid" class="text-sm text-red-600">Max Size: 2MB</div>
      </div>
      <div v-if="base64Images.length > 0 && !isLoading" class="preview-area">
        <div v-for="(image, index) in base64Images" :key="index">
          <div @click="removeSelectedImage(image)" class="selected-image-wrapper">
            <div class="remove-selected">Remove</div>
            <img class="selected-image" alt="img" :src="image"/>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="upload-btn text-sm" @click="uploadImageClicked" :disabled="!valid">Upload</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
}

.modal-wrapper {
  height: 100%;
  width: 100%;
  z-index: -1;
  position: fixed;
  background-color: rgba(201, 196, 196, 0.44);
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60vh;
  max-height: 70vh;
  min-height: fit-content;
  width: 50vw;
  min-width: fit-content;
  border-radius: 10px;
  background-color: #ffffff;
  overflow: auto;
}

.modal-header {
  width: 100%;
  color: #444444;
  display: flex;
  padding: 25px;
  justify-content: space-between;
  border-bottom: 1px solid #c7c7c7;
}

.close-btn {
  width: fit-content;
  height: fit-content;
  align-self: end;
}

.modal-input {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  min-width: fit-content;
}

#imageInput {
  width: 220px;
  font-size: calc(1vh + 0.5vw);
}

.modal-footer {
  border-top: 1px solid #c7c7c7;
  padding: 20px;
  display: flex;
  justify-content: end;
}

.upload-btn {
  background-color: #007BFF;
  color: white;
  padding: 7px 15px 7px 15px;
  border-radius: 5px;
}

.drag-and-drop-area {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececf1;
  width: 50%;
  height: 50%;
  border: 2px #949292 dashed;
  font-size: 1em;
  text-align: center;
}

.isDragging {
  scale: 1.1;
}

.preview-area {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 100%;
  width: 40vw;
  overflow-y: auto;
  align-self: center;

  > * {
    margin-left: 15px;
  }
}

.selected-image-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.selected-image {
  width: 100% !important;
  height: 100% !important;
}

.remove-selected {
  opacity: 0;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  background-color: rgba(134, 131, 131, 0.53);
  font-weight: lighter;
}

.remove-selected:hover {
  opacity: 1;
}

</style>
