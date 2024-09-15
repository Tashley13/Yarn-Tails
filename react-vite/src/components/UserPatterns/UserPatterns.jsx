import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as patternActions from "../../redux/pattern";
// import PatternMaterials from "../PatternMaterials/PatternMaterials";

import './UserPatterns.css'

const UserPatterns = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_id = Number(userId)
    console.log("USERID: ", user_id)
    const loggedIn = useSelector((state) => state.session.user)
    // const patterns = Object.values(eachPattern)[0]


    const patterns = useSelector((state) => state.patterns.allPatterns)
    console.log("PATTERN", patterns);

    useEffect(() => {
        if (!loggedIn) {
            navigate(`/`)
        }
    }, [loggedIn, navigate, patterns])



    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.getUserPatterns(user_id))
        }
    }, [dispatch, user_id, loggedIn])


    //return create a pattern button as well
   if (patterns.length === 0) {
    return <div>You have no patterns</div>
   }



    return (
        <div className='user-pattern-display'>
            <ul>
                {patterns.length > 0 && (
                    patterns.map((pattern) => (
                        <div key={pattern.id} className='user-patterns'>
                            <NavLink to={`/${pattern.id}/view_pattern`}>
                            <div className='user-title'>
                                {pattern.title}
                            </div>
                            </NavLink>
                            {/* <div className="user-image">
                                {pattern.tile_image}
                            </div> */}
                            <div className="user-difficulty">
                                {pattern.difficulty}
                            </div>
                            {/* <div className="user-description">
                                {pattern.description}
                            </div> */}
                            <div className="user-times">
                                <ul>Time: {pattern.time}</ul>
                                <ul>Testing Time: {pattern.time_limit}</ul>
                            </div>
                            {/* <div>
                                <PatternMaterials/>
                            </div> */}
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}

export default UserPatterns;
