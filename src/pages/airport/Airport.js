import { useEffect, useState } from 'react';
import './Airport.css';

let airportList = [];
let options = [];
const table = () => {
    return (
        <table class="table table-striped w-100">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Código</th>
                    <th scope="col">Localização</th>
                </tr>
            </thead>
            <tbody>
                {
                    airportList.map(airport => (

                        <tr>
                            <td key={airport.code}>{airport.name}</td>
                            <td key={airport.code}>{airport.code}</td>
                            <td key={airport.code}>{airport.location}</td>
                        </tr>


                    ))
                }
            </tbody>
        </table>
    );
};

function Airport() {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        getList()
    }, []);

    return (

        <div>
            <div class="row p-3">
                <div class="col-sm-3">
                    <h4>Aeroportos</h4>
                </div>
                <div class="col-sm-3"></div>
                <div class="col-sm-3"></div>
                <div class="col-sm-3">
                    <select class="form-select" id="airport-origin">
                        <option value="not-selected" selected disabled>Aeroporto de origem</option>
                        {
                            options.map(airport => (
                                <option value={airport.code}>{airport.name + ' - ' + airport.code}</option>

                            ))
                        }
                    </select>

                    <div class="m-2">
                        <button type="button" class="btn btn-primary" onClick={()=> filter()}>Filtrar</button>
                    </div>

                </div>
            </div>
            <div class="row p-3">
                <div class="col-sm-12 text-center">
                    {load && table()}
                    {airportList.length == 0 ? <h3>Não há aeroportos cadastrados</h3> : null}
                </div>

            </div>
        </div>


    );

    function getList() {

        fetch("http://18.117.223.1:3000/airports/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                airportList = json;
                options = json;
                setLoad(true);

            });

    }

    function filter() {
        const origin = document.getElementById("airport-origin");

        if(!origin.value.includes('not-selected')){
            setLoad(false);
            fetch("http://18.117.223.1:3000/airports/departure/" + origin.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    airportList = json;
                    setLoad(true);
                });
        }
    }
}
export default Airport;