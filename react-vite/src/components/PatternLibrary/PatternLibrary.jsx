import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as checkoutActions from "../../redux/checkout";
import * as testerActions from "../../redux/tester";
// import * as patternActions from "../../redux/pattern";

import './PatternLibrary.css'

const PatternLibrary = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user_id = Number(userId)
    const navigate = useNavigate();
    console.log("ID: ", userId)
    const loggedIn = useSelector((state) => state.session.user);


    const checkedOut = useSelector((state) => state.checkout.allCheckouts)
    const tests = useSelector((state)=> state.testers.allTests)
    console.log("TESTS: ", tests)

    useEffect(()=> {
        if (!loggedIn) {
            navigate('/')
        }
    }, [loggedIn, navigate])


    useEffect(() => {
        dispatch(checkoutActions.getAllCheckouts(user_id))
        dispatch(testerActions.getUserTests(user_id))
    }, [dispatch, user_id])

    // if (!checkedOut) {
    //     return <div>You have no tests completed or in progress</div>
    // }

    const onComplete = (patternId) => {
        navigate(`/${patternId}/pattern_only`)
    }

    const inProgress = (testerId) => {
        navigate(`/test/${testerId}/edit`)
    }

    return (
        <div className="checkedout-patterns">
            <div className="inProgress">
                <h1>In Progress</h1>
                {checkedOut?.length > 0 ? (
                    checkedOut.map(({ checkout, pattern }) => (
                        checkout.test_posted === "InProgress" && pattern && (
                            <div key={checkout.id}
                            onClick={()=> {
                                const tester = tests.find(test => test.pattern_id === pattern.id);
                                if (tester) inProgress(tester.id)

                            }}
                            style={{cursor: 'pointer'}}>
                                <div>{pattern.title}</div>
                                <div>{checkout.test_due}</div>
                            </div>
                        )
                    ))
                ) : (
                    <div>No patterns are being tested</div>
                )}
            </div>
            <div className="complete">
                <h1>Complete</h1>
                {checkedOut?.length > 0 ? (
                    checkedOut.map(({ checkout, pattern }) => (
                        checkout.test_posted === "Complete" && pattern && (
                            <div key={checkout.id}
                            onClick={()=>onComplete(pattern.id)}
                            style={{cursor: 'pointer'}}>
                                <div>{pattern.title}</div>
                                <div>{checkout.test_due}</div>
                            </div>
                        )
                    ))
                ) : (
                    <div>No patterns have been completed</div>
                )}
            </div>
        </div>
    );

}

export default PatternLibrary;
