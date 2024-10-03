export const ALL_IMAGES = 'pattern_images/ALL_IMAGES'
export const POST_IMAGE = 'pattern_images/POST_IMAGE'
export const DELETE_IMAGE = 'pattern_images/DELETE_IMAGE'

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

const removePatternImage = (image) => {
    return {
        type: DELETE_IMAGE,
        payload: image
    }
}

//thunks

//
export const getAllPatternImages = (patternId) => async (dispatch) => {
    const response = await fetch(`/api/patterns/${patternId}/images`)

    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(allPatternImages(data))
        return data
    }
}

export const createPatternImage = (formData) => async (dispatch) => {
    const response = await fetch("/api/pimages", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json()
        // console.log("DATA:", data)
        // const resImage = data.image;
        dispatch(postPatternImage(data))
    } else {
        console.error("There was an error creating your image.")
    }
}

export const deletePatternImage = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/pimages/image/${imageId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        // const data = await response.json();
        dispatch(removePatternImage(imageId))

    }

}


const initialState = {
    images: [] //set as an empty array since files are stored in an array
};

const patternImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_IMAGES: {
            return { ...state, images: action.payload.pattern_images}
        }
        case POST_IMAGE: {
            return { ...state, images: [...state.images, action.payload]}
        }
        case DELETE_IMAGE: {
            const newState = {...state}
            newState.images = newState.images.filter(image =>image.id !=action.payload)
            return newState
        }

        default: {
            return state
        }
    }
}

export default patternImageReducer;
