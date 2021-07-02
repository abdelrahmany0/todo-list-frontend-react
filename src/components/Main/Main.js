import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import Navbar from "./Navbar";
import AddTask from '../TodoList/AddTask'

export default function Main() {
    return (
        <Router>
            <div>
                <Navbar/>

                <Switch>
                    <Route path="/todo">
                        <TodoList/>
                    </Route>
                    <Route path="/add">
                        <AddTask />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

