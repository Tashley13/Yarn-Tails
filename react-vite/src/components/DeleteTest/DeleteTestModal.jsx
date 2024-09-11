import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as testerActions from "../../redux/tester";

function DeleteTestModal(testerId) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleYes=() => {
        dispatch(testerActions.deleteUserTest(testerId))
    }

    const handleNo=() => {
        closeModal();
    }

    return (
        <div className="delete-test">
            <h3>Confirm Deletion</h3>
            <p>Click yes to delete, click no otherwise.</p>
            <div className="delete-test-options">
                <button onClick={handleYes} className="yes-delete">Yes, delete test</button>
                <button onClick={handleNo} className="no-delete"> No, do not delete test</button>
            </div>
        </div>

    )
}

export default DeleteTestModal;
