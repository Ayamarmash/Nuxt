import {mountSuspended} from '@nuxt/test-utils/runtime'
import index from '../pages/index.vue'
import UploadImageModal from "~/components/UploadImageModal.vue";
import {expect, test} from 'vitest'
import {image} from './lessThan2MB'
import {imagesArray} from "~/store/states";
import {fa} from "cronstrue/dist/i18n/locales/fa";

const images = imagesArray();

test('Upload Image Modal opens when user clicks on Upload Button', async () => {
    const galleryPage = await mountSuspended(index);
    // @ts-ignore
    expect(galleryPage.findComponent(UploadImageModal).exists()).toBe(false);
    await galleryPage.find('button').trigger('click')
    // @ts-ignore
    expect(galleryPage.findComponent(UploadImageModal).exists()).toBe(true);
})

test('Image Uploaded to server when user select an image that is less than 2MB', async () => {
    const uploadImageModal = await mountSuspended(UploadImageModal);
    // @ts-ignore

    expect(uploadImageModal.vm.base64Images.value.length === 0).toBe(true)

    // @ts-ignore
    uploadImageModal.vm.base64Images.value = [image]
    await uploadImageModal.vm.$nextTick();

    expect(uploadImageModal.vm.base64Images.value.length === 0).toBe(false)
    await uploadImageModal.find('#uploadImage').trigger('click');
    console.log(uploadImageModal.vm.base64Images.value.length)
    expect(images.value.length > 0).toBe(true)

});
