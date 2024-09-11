const ConfirmationModal = ({onConfirm, onCancel, message}) => {
    return (
        <div className="delete-pattern-modal">
            <h3>{message}</h3>
        <div className="delete-actions">
            <button onClick={onConfirm}> Yes, delete.</button>
            <button onClick={onCancel}>No, do not delete.</button>
        </div>
        </div>
    )
}

export default ConfirmationModal;
