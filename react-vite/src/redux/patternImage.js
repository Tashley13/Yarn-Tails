export const ALL_IMAGES = 'pattern_images/ALL_IMAGES'
export const POST_IMAGE = 'pattern_images/POST_IMAGE'

//POJO action creators

const allPatternImages = (images) => {
    return {
        type: ALL_IMAGES,
        payload: images
    }
}

const postPatternImage = (image) => {
    return {
        type: POST_IMAGE,
        payload: image
    }
}

//thunks

//
export const getAllPatternImages = (patternId) => async (dispatch) => {
    const response = await fetch(`api/patterns/${patternId}/images`)

    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
    }
    dispatch(allPatternImages(data))
    return data
}
}

export const uploadPatternImage = (image) => async (dispatch) => {

}
