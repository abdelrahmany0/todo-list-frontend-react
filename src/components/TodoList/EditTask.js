import {Component} from "react";
import axios from "axios";
import Updated from "./updated";

class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedTask: {...this.props.task},
            errors: {
                name: false,
                nameMsg: "",
                description: false,
                descriptionMsg: "",
            },
            mainError: false,
            updated: false,
        }
    }

    handleChange = (e) => {
        if (!this.checkErrors(e.target.name, e.target.value)) {
            let task = this.state.editedTask
            task[e.target.name] = e.target.value
            this.setState({editedTask: task});
        }
    }

    checkErrors = (name, value) => {
        let flag = false;
        let errors = this.state.errors
        this.setState({mainError: false})
        if (value.trim() === '') {
            flag = true
            errors[name] = true;
            errors[name + "Msg"] = name + " Can't be empty"
            this.setState({
                errors: errors,
            })
        }
        if (name === "name" && value.length < 3) {
            flag = true
            errors[name] = true;
            errors[name + "Msg"] = name + " Can't be less than 3 characters!"
            this.setState({
                errors: errors,
            })
        }
        if (name === "description" && value.length < 6) {
            flag = true
            errors[name] = true;
            errors[name + "Msg"] = name + " Can't be less than 6 characters!"
            this.setState({
                errors: errors,
            })
        }
        if (!flag) {
            errors[name] = false;
            this.setState({[name + "Error"]: false})
        }
        return false;
    }

    updateTask = async () => {
        if (!this.state.errors.name && !this.state.errors.description) {
            await axios.put(`http://localhost:8000/api/tasks/${this.props.task.id}`,
                {
                    id: this.props.task.id,
                    name: this.state.editedTask.name,
                    description: this.state.editedTask.description
                });
            this.setState({mainError: false, updated: true})
            this.props.updateTasks()
        } else {
            this.setState({mainError: true})
        }
    }

    hideDiv= () => {
        this.setState({updated: false})
    }

    reset = async () => {
        await this.setState({editedTask: {...this.props.task}})
    }

    render() {
        let task = this.state.editedTask
        return (
            <>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target={"#editTask-" + task.id}>
                    Edit / view
                </button>
                <div className="modal fade" id={"editTask-" + task.id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">


                    {this.state.updated ?
                        <div id={"hide"} className="alert alert-success updated" role="alert">
                            Task updated Successfully <i className="bi bi-check2-all"/>
                            <button type="button" onClick={this.hideDiv} className="btn-close" data-dismiss="alert" aria-label="Close"/>
                        </div>
                    : null
                    }

                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Task: {this.props.task.name}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={this.reset}
                                        aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3 w-75">
                                    <span className="input-group-text" id="basic-addon1">Title: </span>
                                    <input value={task.name} onChange={this.handleChange} name="name" type="text"
                                           className="form-control" placeholder="Task Title"/>
                                </div>
                                {
                                    this.state.errors.name ?
                                        <div className="alert alert-danger w-75 p-0">
                                            <p className="p-2 m-0">{this.state.errors.nameMsg}</p>
                                        </div>
                                        : null
                                }
                                <span className="input-group-text" id="basic-addon2">Description: </span>
                                <div className="input-group mb-3 w-100">
                                    <textarea value={task.description} onChange={this.handleChange} name="description"
                                           className="form-control" placeholder="Task Description..."/>
                                </div>
                                {
                                    this.state.errors.description ?
                                        <div className="alert alert-danger w-75 p-0">
                                            <p className="p-2 m-0">{this.state.errors.descriptionMsg}</p>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="modal-footer">
                                {
                                    this.state.mainError ?
                                        <div className="alert alert-danger w-100 p-0">
                                            <p className="p-2 m-0">please fix the above errors</p>
                                        </div>
                                        :null
                                }
                                <button type="button" className="btn btn-secondary" onClick={this.reset}
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={this.updateTask}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EditTask;