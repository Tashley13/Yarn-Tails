import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

const AllPatterns = () => {
    const {userId} = useParams();
    const dispatch= useDispatch();
    const navigate= useNavigate();

    //if user clicks a pattern tile, check if they are logged in
    const loggedIn= useSelector((state)=>state.session.user)

    //grab all the patterns
    const patterns=useSelector((state) => state.patterns.allPatterns);
    console.log("PATTERNS: ", patterns)

    useEffect(()=> {
        dispatch(patternActions.getAllPatterns())
    }, )

    return (
        <div>
            Hello World
        </div>
    )
}

export default AllPatterns;
