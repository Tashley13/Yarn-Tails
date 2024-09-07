import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as testerActions from "../../redux/tester";

const CreateTest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [rating, setRating] = useState('');
    const [ image, setImage] = useSate('');
    const [ review, setReview] = useState('');
    const [errors, setErrors] = useState({});

    const loggedIn = useSelector((state) => state.session.user)

    useEffect(()=> {
        if (!loggedIn) {
            navigate("/")
        }
    }, [loggedIn, navigate])

    const updateRating = (e) => setRating(e.target.value)
    const updateImage = (e) => setImage(e.target.value)
    const updateReview = (e) => setReview(e.target.value)


    return (
        <div>Hello World</div>
    )
}

export default CreateTest;
