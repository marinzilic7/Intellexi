import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent shadow-sm">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
           Intellexi
          </Link>
         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Tečajnice
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/calculator"
                  className="nav-link active"
                  aria-current="page"
                >
                  Kalkulator
                </Link>
              </li>
              <li className="nav-item">
               
                <Link className="nav-link active" to="/graph">
                  Grafički prikaz
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
