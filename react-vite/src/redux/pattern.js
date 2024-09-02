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
        payload: patterns
    }
};

//get all user patterns
const userPatterns = (patterns) => {
    return {
        type: USER_PATTERNS,
        payload: patterns
    }
}

//get detail of pattern including pattern itself
const patternDetails = (pattern) => {
    return {
        type: PATTERN_DETAILS,
        payload: pattern
    }
}

const createPattern = (pattern) => {
    return {
        type: CREATE_PATTERN,
        payload: pattern
    }
}

const updatePattern = (pattern) => {
    return {
        type: UPDATE_PATTERN,
        payload: pattern
    }
}

const deletePattern = (patternId) => {
    return {
        type: DELETE_PATTERN,
        payload: patternId
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

//get all patterns of user
export const getUserPatterns = (userId) => async (dispatch) => {
    const response = await fetch(`/api/patterns/current/${userId}`)

    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(userPatterns(data))
        return data
    }
}

//get details of pattern by id
export const viewUserPattern = (patternId) => async (disptach) => {
    const response = await fetch(`/api/patterns/${patternId}/view_pattern`)

    if (response.ok) {
        const data = await response.json()
        // console.log("DATA: ", data)
        if (data.errors) {
            return;
        }
        disptach(patternDetails(data))
        return data
    }
}

//create a new pattern
export const createUserPattern = (newPattern) => async (dispatch) => {
    const response = await fetch("/api/patterns/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPattern)
    }
    )
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }

        dispatch(createPattern(data))
    }
}

export const updateUserPattern = (pattern) => async (dispatch) => {
    const response = await fetch(`api/patterns/${pattern.id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(pattern)
    })
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }

        dispatch(updatePattern(data))
    }
}

//reducer

const initialState = {
    allPatterns: [],
    patternById: {}
}

const patternReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PATTERNS: {
            // let newState= {...state}
            // console.log("PAYLOAD", action.payload.patterns)
            // return newState
            return { ...state, allPatterns: action.payload.patterns }
            // return {...state, patternById: action.payload.patterns}
        }
        case USER_PATTERNS: {
            return { ...state, allPatterns: action.payload.patterns }
        }
        case PATTERN_DETAILS: {
            // let newState= {...state}
            // console.log("PAYLOAD: ", action.payload)
            return { ...state, patternById: action.payload }
        }
        case CREATE_PATTERN: {
            return {...state, allPatterns: action.payload.patterns}
        }
        case UPDATE_PATTERN: {
            return { ...state, patternById: action.payload.patterns}
        }
        default: {
            return state
        }
    }
}

//spread the newpattern into the spread of state.allPatterns

export default patternReducer;
