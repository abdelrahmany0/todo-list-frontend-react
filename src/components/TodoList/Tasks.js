import EditTask from './EditTask'
import DeleteTask from "./DeleteTask";
import {Component} from "react";
import axios from "axios";

class Tasks extends Component {
    state = {tasks: []}

    componentDidMount() {
        this.getTasks()
    }

    getTasks = () => {
        axios.get(`http://localhost:8000/api/tasks/`)
            .then(res => {
                const tasks = res.data;
                this.setState({tasks});
            })
    }

    getClasses = () => {
        return "  text-body "
    }

    getClassColor = (index) => {
        if ((index + 1) % 2 === 1) {
            return " alert alert-primary "
        }
        return " alert alert-dark "
    }

    printDate = (time) => {
        var date = new Date(time);
        let d = date.getDate() + "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() + " " + (date.getHours() % 12 || 12) +
            ":" + date.getMinutes()
        return d;
    }

    render() {
        let tasks = this.state.tasks
        return (
            <div>
                {tasks.map((task, index) => (
                        <>
                            <div className={this.getClasses() + this.getClassColor(index)} key={"task"+index}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p>Title: <strong>{task.name}</strong></p>
                                        <p>created at: <strong>{task.created_at}</strong></p>
                                    </div>
                                    <div className="col-md-1 p-0">
                                        <EditTask task={task} updateTasks={this.getTasks} />
                                    </div>
                                    <div className="col-md-1 p-0">
                                        <DeleteTask task={task} updateTasks={this.getTasks} />
                                    </div>
                                </div>
                            </div>

                        </>

                    )
                )}

            </div>
        )
    }

}

export default Tasks;
