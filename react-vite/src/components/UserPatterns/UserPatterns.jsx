import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

import './UserPatterns.css'

const UserPatterns = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    // console.log("USERID: ", userId)
    const loggedIn = useSelector((state)=> state.session.user)


    return (
        <div>
            Hello World
        </div>
    )
}

export default UserPatterns;
