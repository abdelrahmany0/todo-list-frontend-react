import axios from "axios";

const DeleteTask = (props) => {

    const task = props.task

    async function deleteTask(id){
        await axios.delete(`http://localhost:8000/api/tasks/${id}`)
        props.updateTasks()

    }

    return (
        <>
            <button type="button" className="btn btn-danger" data-bs-toggle="modal"
                    data-bs-target={"#deleteTask-" + task.id}>
                Delete
            </button>

            <div className="modal fade" id={"deleteTask-" + task.id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Deleting task: {task.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <p> Are you sure you want to <span
                                className="text-danger fw-bolder">delete</span> task: <strong>{task.name}</strong>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-danger"
                                    onClick={()=>deleteTask(task.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteTask;