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
    }, [loggedIn, navigate])



    useEffect(() => {
        if (loggedIn) {
            dispatch(patternActions.getUserPatterns(user_id))
        }
    }, [dispatch, user_id, loggedIn])


    //return create a pattern button as well
   if (patterns.length === 0) {
    return <>
    <div>You have no patterns</div>
    <button onClick={()=> {
        navigate('/pattern/new')
    }}>Create Pattern</button>
    </>
   }



    return (
        <div className='user_display'>
                {patterns?.length > 0 && (
                    patterns.map((pattern) => (
                        <div key={pattern.id} className='user_patterns'>
                            <NavLink to={`/${pattern.id}/view_pattern`}>
                            <div className='user_title'>
                                {pattern.title}
                            </div>
                            </NavLink>

                            <div className="user_difficulty">
                                {pattern.difficulty}
                            </div>

                            <div className="user_times">
                                <ul>Time: {pattern.time}</ul>
                                <ul>Testing Time: {pattern.time_limit}</ul>
                            </div>
                            <div className="user_image">
                                    {pattern.display?.image ? (
                                        <img src={pattern.display.image}/>
                                    ) : (
                                        ''
                                    )}
                                </div>
                        </div>
                    ))
                )}

        </div>
    )
}

export default UserPatterns;
