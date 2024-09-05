export const ALL_TESTERS = 'testers/ALL_TESTERS'
export const USER_TESTERS = 'testers/USER_TESTERS'
export const VIEW_TESTER = 'testers/VIEW_TESTER'

export const CREATE_TESTER = 'testers/CREATE_TESTER'
export const UPDATE_TESTER = 'testers/UPDATE_TESTER'
export const DELETE_TESTER = 'testers/DELETE_TESTER'

//POJO action creators
const allTesters = (testers) => {
    return {
        type: ALL_TESTERS,
        payload: testers
    }
}

const userTesters = (testers) => {
    return {
        type: USER_TESTERS,
        payload: testers
    }
}

const viewTester = (tester) => {
    return {
        type: VIEW_TESTER,
        payload: tester
    }
}

const createTester = (tester) => {
    return {
        type: CREATE_TESTER,
        payload: tester
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



//reducer
