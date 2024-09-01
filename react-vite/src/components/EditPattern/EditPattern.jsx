import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as patternActions from "../../redux/pattern";

const EditPattern = () => {
const { patternId } = useParams();
console.log("ID: ", patternId)
}

export default EditPattern;
