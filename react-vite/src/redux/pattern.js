export const ALL_PATTERNS = 'patterns/ALL_PATTERNS'
export const USER_PATTERNS = 'patterns/USER_PATTERNS'
export const PATTERN_DETAILS = 'patterns/PATTERN_DETAILS'
export const VIEW_PATTERN = 'patterns/VIEW_PATTERN'
export const VIEW_MATERIALS = 'patterns/VIEW_MATERIALS'
export const CREATE_PATTERN = 'patterns/CREATE_PATTERN'
export const UPDATE_PATTERN = 'patterns/UPDATE_PATTERN'
export const DELETE_PATTERN = 'patterns/DELETE_PATTERN'

//POJO action creators
//get all patterns
const allPatterns = (patterns) => {
    return {
        type: ALL_PATTERNS,
        patterns
    }
};

//get all user patterns
const userPatterns = (patterns) => {
    return {
        type: USER_PATTERNS,
        patterns
    }
}

//get detail of pattern
const patternDetails = (pattern) => {
    return {
        type: PATTERN_DETAILS,
        pattern
    }
}

//view pattern only
const viewPattern = (pattern) => {
    return {
        type: VIEW_PATTERN,
        pattern
    }
}

//view materials only
const viewMaterials = (pattern) => {
    return {
        type: VIEW_MATERIALS,
        pattern
    }
}

const createPattern = (pattern) => {
    return {
        type: CREATE_PATTERN,
        pattern
    }
}

const updatePattern = (pattern) => {
    return {
        type: UPDATE_PATTERN,
        pattern
    }
}

const deletePattern = (patternId) => {
    return {
        type: DELETE_PATTERN,
        patternId
    }
}


//thunks
//get all patterns
export const getAllPatterns = () => async (dispatch) => {
    const response = await fetch("/api/patterns")

    if (response.ok) {
        const data = await response.json()
        // console.log("DATA: ", data)
        if (data.errors) {
            return;
        }
        dispatch(allPatterns(data))
        return data
    }
}

//reducer

const initialState = {
    allPatterns: {},
    patternById: {}
}

const patternReducer = (state = initialState, action ) => {
    switch (action.type) {
        case ALL_PATTERNS: {
            // console.log("STATE: ", state)
            return {...state, allPatterns: {...action.patterns}}
        }
        default: {
            return state
        }
    }
}

export default patternReducer;
