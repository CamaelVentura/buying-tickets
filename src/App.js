import './App.css';
import Login from './pages/login/Login';
import Sales from './pages/sales/Sales';
import Flights from './pages/flights/Flights';
import Airport from './pages/airport/Airport';
import NewSale from './pages/sales/new-sale/NewSale';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

let isLogged;

function App() {
  isLogged = localStorage.getItem("token");
  if (!isLogged && !window.location.href.includes('/login')) {
    window.location.href = "/login";
  }
  if (isLogged && window.location.href.includes('/login')) {
    window.location.href = "/airports";
  }
  return (
    <Router>
      <div class="row p-0 m-0">
        {isLogged ? <div class="col-sm-3 p-0 m-0">
          <nav class="p-3 text-center">
            <div class="logo"></div>
            <p class="title-painel"> <b>Container Airlines</b></p>

            <hr />

            <ul>

              <Link to="/airports">
                <li>Aeroportos</li>
              </Link>
              <Link to="/flights">
                <li>Vôos
            </li>
              </Link>
              <Link to="/sales">
                <li>
                  Vendas
            </li>
              </Link>

              <Link>
                <li class="exit-button" onClick={() => { exit() }}>
                  Sair
            </li>
              </Link>
            </ul>
          </nav>

        </div>
          : null}
        <div class={isLogged ? "col-sm-9" : ""}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/airports">
              <Airport />
            </Route>
            <Route path="/flights">
              <Flights />
            </Route>
            <Route path="/sales/new">
              <NewSale />
            </Route>
            <Route exact path="/sales">
              <Sales />
            </Route>

          </Switch>

        </div>
      </div>
    </Router>
  );
}

function exit() {

  const token = localStorage.getItem("token");

  fetch("http://18.117.223.1:3000/auth/logout", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.toString()
    }
  }).then((res) => res.json());

  localStorage.removeItem("token");
  window.location.href = "/login";
}

export default App;
