const baseAPI = "https://vintrackers.buildonlinestaging.com";

async function uploadImages(images: string[]) {
    if (images.length > 0) {
        try {
            const body = {
                images: images
            };
            const response = await fetch(baseAPI + '/upload/images/', { // Corrected URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    else{
        alert('Please Choose a Photo');
    }
}

export {uploadImages};
