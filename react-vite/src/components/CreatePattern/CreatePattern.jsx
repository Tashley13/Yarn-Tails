import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

const CreatePattern = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const [ title, setTitle ] = useState('');
        const [ tileImage, setTileImage ] = useState('');
        const [ difficulty, setDifficulty ] = useState('');
        const [ time, setTime ] = useState('');
        const [ timeLimit, setTimeLimit ] = useState('');
        const [ description, setDescription ] = useState('');
        const [ instrument, setInstrument ] = useState('');
        const [ instrumentSize, setInstrumentSize] = useState('');
        const [ yarnWeight, setYarnWeight ] = useState('');
        const [ yardage, setYardage ] = useState('');
        const [ pattern, setPattern ] = useState('');
        const [ errors, setErrors ] = useState({});

        const loggedIn = useSelector((state)=> state.session.user)

        if (!loggedIn) return (
            navigate(``)
        )

        const updateTitle = (e) => setTitle(e.target.value);
        const updateTileImage = (e) => setTileImage(e.target.value);
        const updateDifficulty = (e) => setDifficulty(e.target.value);
        const updateTime = (e) => setTime(e.target.value);
        const updateTimeLimit = (e) => setTimeLimit(e.target.value);
        const updateDescription = (e) => setDescription(e.target.value);
        const updateInstrument = (e) => setInstrument(e.target.value);
        const updateInstrumentSize = (e) => setInstrumentSize(e.target.value);
        const updateYarnWeight = (e) => setYarnWeight(e.target.value);
        const updateYardage = (e) => setYardage(e.target.value);
        const updatePattern = (e) => setPattern(e.target.value);

        const handleSubmit = async (e) => {
            e.preventDefault();

            const errors = {} // push errors to
            //check to make sure the fields are filled in
            if (!title) errors.title = 'Title is required';
            if (!tileImage) errors.tileImage = 'Tile image is required';
            if (!difficulty) errors.difficulty = 'Difficulty is required';
            if (!time) errors.time = 'Time is required';
            if (!timeLimit) errors.timeLimit = "Time limit is required";
            if (description.length < 20) errors.description = "Description needs to be greater than 20 characters";
            if (!instrument) errors.instrument = "Instrument is required";
            if (!instrumentSize) errors.instrumentSize = "Instrument size is required";
            if (!yarnWeight) errors.yarnWeight = "Yarn weight is required";
            if (!yardage) errors.yardage = "Yardage is required";
            if (pattern.length < 40 ) errors.pattern = "Pattern needs to be more than 40 characters";

            //look to see if errors has any length of keys, if so set errors, return, and clear errors
            if (Object.keys(errors).length) {
                setErrors(errors);
                return;
            }
            setErrors({})


        }


    return (
        <div>
            Hello World
        </div>
    )
}

export default CreatePattern;
