import {Component} from "react";
import Tasks from './Tasks';

class TodoList extends Component {


    render() {
        return (
            <>
                <div className="container p-2 rounded-3 mt-4">
                <h1>Todo List</h1>
                    <Tasks />
                </div>
            </>
        )
    }

}

export default TodoList;