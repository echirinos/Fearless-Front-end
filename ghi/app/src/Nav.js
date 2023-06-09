import React from "react";

function Nav() {
    return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Conference GO!</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="http://localhost:3000/">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="http://localhost:3000/new-conference.html">New location</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="http://localhost:3000/new-conference.html">New conference</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="http://localhost:3000/new-presentation.html">New presentation</a>
                    </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </header>

    );
  }

  export default Nav;
