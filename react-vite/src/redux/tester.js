export const ALL_TESTERS = 'testers/ALL_TESTERS'
export const USER_TESTERS = 'testers/USER_TESTERS'
export const VIEW_TESTER = 'testers/VIEW_TESTER'
export const GET_TEST = 'patterns/GET_TEST'
export const CREATE_TESTER = 'patterns/CREATE_TESTER'
export const UPDATE_TESTER = 'testers/UPDATE_TESTER'
export const DELETE_TESTER = 'testers/DELETE_TESTER'

//POJO action creators
//all tests
const allTesters = (testers) => {
    return {
        type: ALL_TESTERS,
        payload: testers
    }
}

//user tests
const userTesters = (testers) => {
    return {
        type: USER_TESTERS,
        payload: testers
    }
}

//view test by id
const viewTest = (testerId) => {
    return {
        type: VIEW_TESTER,
        payload: testerId
    }
}

//all tests for pattern
const patternTest = (patternId) => {
    return {
        type: GET_TEST,
        payload: patternId
    }
}

const createTest = (test) => {
    return {
        type: CREATE_TESTER,
        payload: test
    }
}

const updateTester = (tester) => {
    return {
        type: UPDATE_TESTER,
        payload: tester
    }
}

const deleteTester = (testerId) => {
    return {
        type: DELETE_TESTER,
        payload: testerId
    }
}

//thunks
//get all tests
export const getAllTests = () => async (dispatch) => {
    const response = await fetch("/api/testers")

    if (response.ok) {
        const data = await response.json()
        // console.log("DATA: ", data)
        if (data.errors) {
            return;
        }
        dispatch(allTesters(data))
        return data
    }
}


//get all tests by patternId
export const getTestsByPatternId = (patternId) => async (dispatch) => {
    const response = await fetch(`/api/patterns/${patternId}/testers`)

    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(patternTest(data))
        return data
    }
}


//get all tests of user
export const getUserTests = (userId) => async (dispatch) => {
    const response = await fetch(`/api/testers/current/${userId}`)

    if (response.ok) {
        const data = await response.json()
        // console.log("DATA: ", data)
        if (data.errors) {
            return;
        }
        dispatch(userTesters(data))
        return data
    }
}

//get test by id
export const getTestById = (testerId) => async (dispatch) => {
    const response = await fetch(`/api/testers/${testerId}`)

    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(viewTest(data))
        return data
    }
}

//create a test based on patternId
export const createTestByPatternId = (patternId, test) => async (dispatch) => {
    const response = await fetch(`/api/patterns/${patternId}/testers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
    })
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }

        dispatch(createTest(data))
        return data
    }
}

//edit test
export const updateUserTest = (test) => async (dispatch) => {
    const response = await fetch(`/api/testers/${test.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }

        dispatch(updateTester(data))
        return data
    }
}

//delete test
export const deleteUserTest = (testerId) => async (dispatch) => {
    const response = await fetch(`/api/testers/${testerId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(deleteTester(testerId))
        return data
    }
    return response
}

//reducer

const initialState = {
    allTests: [],
    testById: {}

}

const testerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_TESTERS: {
            return { ...state, allTests: action.payload.testers }
        }
        case USER_TESTERS: {
            return { ...state, allTests: action.payload.testers }
        }
        case VIEW_TESTER: {
            return { ...state, testById: action.payload }
        }
        case GET_TEST: {
            return { ...state, allTests: action.payload }
        }
        case CREATE_TESTER: {
            return { ...state, allTests: action.payload.testers }
        }
        case UPDATE_TESTER: {
            return { ...state, patternById: action.payload }
        }
        case DELETE_TESTER: {
            const newState = { ...state };
            newState.allTests = newState.allTests.filter(test => test.id !== action.payload)
            return newState
        }

        default: {
            return state
        }
    }
}

export default testerReducer;
