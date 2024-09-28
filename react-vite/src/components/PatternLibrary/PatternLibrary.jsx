import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import * as checkoutActions from "../../redux/checkout";
import * as patternActions from "../../redux/pattern";

import './PatternLibrary.css'

const PatternLibrary = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const user_id = Number(userId)
    console.log("ID: ", userId)
    const loggedIn = useSelector((state) => state.session.user);


    const checkedOut = useSelector((state) => state.checkout.allCheckouts)
    console.log("CHECKOUTS: ", checkedOut)


    useEffect(() => {
        dispatch(checkoutActions.getAllCheckouts(user_id))

    }, [dispatch, user_id])

    if (!checkedOut) {
        return <div>You have no tests completed or in progress</div>
    }

    return (
        <div className="checkedout-patterns">
            <div className="inProgress">
                <h1>In Progress</h1>
                {checkedOut?.length > 0 ? (
                    checkedOut.map(({ checkout, pattern }) => (
                        checkout.test_posted === "InProgress" && pattern && (
                            <div key={checkout.id}>
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
                            <div key={checkout.id}>
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
