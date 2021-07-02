import {Component} from "react";
import axios from "axios";

class AddTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newTask: {
                name: "",
                description: ""
            },
            errors: {
                name: {error: false, nameMsg: "", touched: false},
                description: {error: false, descriptionMsg: "", touched: false},
            },
            created: false,
            mainError: false,
            isValid: false,
        }
    }
    handleChange = (e) => {
        if (!this.checkErrors(e.target.name, e.target.value)) {
            let task = this.state.newTask
            task[e.target.name] = e.target.value
            this.setState({newTask: task})
        }
    }

    addTask = async () => {
        Object.keys(this.state.newTask).forEach(key => this.checkErrors(key, this.state.newTask[key]))
        if (!this.state.errors.name.error && !this.state.errors.description.error){
            await axios.post(`http://localhost:8000/api/tasks/`,{
                "name": this.state.newTask.name,
                "description": this.state.newTask.description,
            }).then(res => {
                if (!res.data.error){
                    this.setState({created: true, mainError: false})
                }
            })
                .catch(error => {
                    console.log(error)});
        }else {
            this.setState({mainError: true})
        }
    }

    checkErrors = (name, value) => {
        let flag = false;
        let errors = this.state.errors
        this.setState({mainError: false})
        if (value.trim() === '') {
            flag = true
            errors[name].error = true;
            errors[name + "Msg"] = name + " Can't be empty"
            this.setState({
                errors: errors,
            })
        }
        if (name === "name" && value.length < 3) {
            flag = true
            errors[name].error = true;
            errors[name + "Msg"] = name + " Can't be less than 3 characters!"
            this.setState({
                errors: errors,
            })
        }
        if (name === "description" && value.length < 6) {
            flag = true
            errors[name].error = true;
            errors[name + "Msg"] = name + " Can't be less than 6 characters!"
            this.setState({
                errors: errors,
            })
        }
        if (!this.state.errors.name.error && !this.state.errors.description.error && this.state.errors.name.touched && this.state.errors.description.touched){
            this.setState({isValid: true})
        }
        if (!flag) {
            errors[name].error = false;
            this.setState({[name + "Error"]: false})
        }
        return false;
    }

    focusOut = (e) => {
        let name = e.target.name
        let value = e.target.value
        let errors = this.state.errors
        errors[name].touched = true
        this.setState({errors})
        this.checkErrors(name, value)
    }

    render() {
        return (
            <>
                <div className="container my-5 text-center">
                    <h2>Add a new Task</h2>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Task Title:</span>
                        <input name="name" onBlur={this.focusOut} onChange={this.handleChange} type="text" className="form-control" placeholder="Task Title..." />
                    </div>
                    {
                        this.state.errors.name.error ?
                            <div className="alert alert-danger p-0">
                                <p className="p-2 m-0">{this.state.errors.nameMsg}</p>
                            </div>
                            : null
                    }
                        <span className="input-group-text">Task Description:</span>
                    <div className="input-group mb-3">
                        <textarea name="description" onBlur={this.focusOut} onChange={this.handleChange} className="form-control" placeholder="Task Description..."
                            cols={30} rows={2}
                        />
                    </div>
                    {
                        this.state.errors.description.error ?
                            <div className="alert alert-danger p-0">
                                <p className="p-2 m-0">{this.state.errors.descriptionMsg}</p>
                            </div>
                            : null
                    }
                    {
                        this.state.mainError ?
                            <div className="alert alert-danger w-100 p-0">
                                <p className="p-2 m-0">please fix the above errors</p>
                            </div>
                            :null
                    }
                    <div className="w-50">
                    </div>
                    <div className="d-grid gap-2 w-25 mx-auto">
                        <button className={["btn btn-success", !this.state.isValid?"disabled":""].join(" ")} disabled={!this.state.isValid} onClick={this.addTask}>Add Task</button>
                    </div>
                </div>
            </>
        )
    }
}

export default AddTask;