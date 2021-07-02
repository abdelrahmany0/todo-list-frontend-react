import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link" to="/todo">Todo-list</Link>
                                <Link className="btn btn-success" to="/add">Add task</Link>
                            </div>
                        </div>
                    </div>

                </nav>
            </>
        );
    }
}

export default Navbar;