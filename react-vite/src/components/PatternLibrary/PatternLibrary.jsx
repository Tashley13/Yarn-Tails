import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as testerActions from "../../redux/tester";

import './PatternLibrary.css'


const PatternLibrary = () => {
    const { userId } = useParams();
    const user_id = Number(userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.session.user)
    const tests = useSelector((state) => state.testers.allTests)
    console.log("TESTS: ", tests)

    useEffect(() => {
        dispatch(testerActions.getUserTests(user_id))
    }, [dispatch, user_id])

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
    }, [loggedIn, navigate])

    //since all tests are already pulled, separate them into two variables
    const inProgressTests = Array.isArray(tests) ? tests.filter(test => test.test_progress == 'InProgress') : [];
    const completeTests = Array.isArray(tests) ? tests.filter(test => test.test_progress == 'Complete') : [];

    const dateFormat = (date) => {
        return date ? date.slice(0, -12) : '';
    }

    const onComplete = (patternId) => {
        navigate(`/${patternId}/pattern_only`)
    }

    const inProgress = (testerId) => {
        navigate(`/test/${testerId}/edit`)
    }

    return (
        <div className="pattern-library">
            <div className="inProgress">
                <h2>In Progress</h2>
                {inProgressTests?.length > 0 ? (
                    inProgressTests.map(test => (
                        <div key={test.id}
                            className="progress-tests"
                        >
                            <p
                                onClick={() => inProgress(test.id)}
                                style={{ cursor: 'pointer' }}>
                                Pattern: {test.pattern_title}
                            </p>
                            <p>Due: {dateFormat(test.test_due)} </p>
                        </div>
                    ))
                ) : (
                    <p>No tests in progress.</p>
                )}

            </div>
            <div className="complete">
                <h2>Complete</h2>
                {completeTests?.length > 0 ? (
                    completeTests.map(test => (
                        <div key={test.id} className="complete-tests">
                            <p
                                onClick={() => onComplete(test.pattern_id)}
                                style={{ cursor: 'pointer' }}
                            >
                                Pattern: {test.pattern_title}</p>
                        </div>
                    ))
                ) : (
                    <p>No tests have been completed.</p>
                )}
            </div>
        </div>
    )
}

export default PatternLibrary;
