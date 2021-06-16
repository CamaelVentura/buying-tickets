import { useEffect, useState } from 'react';
import './Flights.css';
import moment from 'moment'


let flightsList = [];
let options = [];
let load = false;

const table = () => <table class="table table-striped w-100">
    <thead>
        <tr>
            <th scope="col">Código</th>
            <th scope="col">Aero. de origem</th>
            <th scope="col">Aero. de destino</th>
            <th scope="col">Capacidade</th>
            <th scope="col">Horário de decolagem</th>
            <th scope="col">Horário de chegada</th>
            <th scope="col">Tax</th>
            <th scope="col">Preço</th>
        </tr>
    </thead>
    <tbody>
        {
            flightsList.map(flight => (
                <tr>
                    <td key={flight.code}>{flight.code}</td>
                    <td key={flight.start}>{flight.start.name}</td>
                    <td key={flight.end}>{flight.end.name}</td>
                    <td key={flight.capacity}>{flight.capacity}</td>
                    <td key={flight.arrivalTime}>{moment(flight.arrivalTime).format("DD/MM/yyyy").toString()}</td>
                    <td key={flight.departureTime}>{moment(flight.departureTime).format("DD/MM/yyyy").toString()}</td>
                    <td key={flight.tax}>{flight.tax}</td>
                    <td key={flight.price}>{flight.price}</td>
                </tr>


            ))
        }
    </tbody>
</table>
    ;
function Flights() {

    const [load, setLoad] = useState(false);

    useEffect(() => {
        getAirpotList();
    }, []);

    return (
        <div>
            <div class="row p-3">
                <div class="col-sm-3">
                    <h4>Vôos</h4>
                </div>
                <div class="col-sm-3">

                <select class="form-select" id="start">
                        <option value="not-selected" selected disabled >Aeroporto de origem</option>
                        {
                            options.map(airport => (
                                <option value={airport.code}>{airport.name + ' - ' + airport.code}</option>

                            ))
                        }
                    </select>
                </div>
                <div class="col-sm-3">
                <select class="form-select"  id="end">
                        <option value="not-selected" selected disabled>Aeroporto de chegada</option>
                        {
                            options.map(airport => (
                                <option value={airport.code}>{airport.name + ' - ' + airport.code}</option>

                            ))
                        }
                    </select>
                </div>
                <div class="col-sm-3">
                    

                    <div class="m-2">
                        <button type="button" class="btn btn-primary" onClick={() => filter()}>Filtrar</button>
                    </div>

                </div>
            </div>

            <div class="row p-3">
                <div class="col-sm-12">
                    {load && table()}

                </div>

            </div>
        </div>

    );


    function getAirpotList() {
        fetch("http://18.117.223.1:3000/airports/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((json) => {
                options = json;
                setLoad(true);

            });
    }

    function filter() {
        const end  = document.getElementById('end').value;
        const start  = document.getElementById('start').value;
        const data = {
            departure: start,
            arrival: end,
        }
        
        if(end.value != "not-selected" && start.value != "not-selected") {
            setLoad(false);
            fetch(`http://18.117.223.1:3000/flights/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((res) => res.json())
                .then((json) => {
                    flightsList = json;
                    setLoad(true);
                });
        }
    }
}
export default Flights;