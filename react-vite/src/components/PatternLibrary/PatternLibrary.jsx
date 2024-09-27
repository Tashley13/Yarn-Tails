import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import * as checkoutActions from "../../redux/checkout";

import './PatternLibrary.css'

const PatternLibrary = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const user_id = Number(userId)
    console.log("ID: ", userId)
    const loggedIn = useSelector((state)=> state.session.user);


    const checkedOutPatterns = useSelector((state)=> state.checkout.allCheckouts)
    console.log("CHECKOUTS: ", checkedOutPatterns)

    useEffect(()=> {
            dispatch(checkoutActions.getAllCheckouts(user_id))
    }, [dispatch, user_id])
}

export default PatternLibrary;
