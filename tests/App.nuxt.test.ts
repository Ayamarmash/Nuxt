import {mountSuspended} from '@nuxt/test-utils/runtime'
import index from '../pages/index.vue'
import UploadImageModal from "~/components/UploadImageModal.vue";
import ImagesSlider from "~/components/ImagesSlider.vue";
import {expect, test} from 'vitest'
import {image} from './lessThan2MB'
import {imagesArray} from "~/store/states";

const images = imagesArray();

test('Upload Image Modal opens when user clicks on Upload Button', async () => {
    const mainPage = await mountSuspended(index);
    // @ts-ignore
    expect(mainPage.findComponent(UploadImageModal).exists()).toBe(false);
    await mainPage.find('button').trigger('click')
    // @ts-ignore
    expect(mainPage.findComponent(UploadImageModal).exists()).toBe(true);
})

test('Check if Image is added to slider after being uploaded', async () => {
    const mainPage = await mountSuspended(index);

    expect(images.value.length).toBe(0);
    // @ts-ignore
    expect(mainPage.findComponent(ImagesSlider).exists()).toBe(false);
    // @ts-ignore
    images.value = [image]
    expect(images.value.length).toBe(1);
    await mainPage.vm.$nextTick();
    // @ts-ignore
    expect(mainPage.findComponent(ImagesSlider).exists()).toBe(true);
});

test('Check Deleting Image from images slider', async () => {
    const imagesSlider = await mountSuspended(ImagesSlider);
    // @ts-ignore
    images.value = [image];
    expect(images.value.length).toBe(1);
    await imagesSlider.vm.$nextTick();
    await imagesSlider.find('#deleteImage').trigger('click');
    await imagesSlider.vm.$nextTick();
    expect(images.value.length).toBe(0);
})