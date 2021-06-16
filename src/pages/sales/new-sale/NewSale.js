import './NewSale.css';
import { useEffect, useState } from 'react';

let load = false;
let ticketNumber = "";
function NewSale() {

    const [load, setLoad] = useState(false);

    useEffect(() => {
    }, []);




    return (

        <div>
            <div class="row">
                <div class="col-sm-3 p-5">
                    <h4>Nova venda</h4>
                </div>
                <div class="col-sm-3"></div>
                <div class="col-sm-3">
                </div>
                <div class="col-sm-3">

                </div>


            </div>
            <div
                class="sale-container text-center">
                {
                    load ?
                    <div>
    <h1>
                            Compra feito com sucesso !
                           
                    </h1>
                
                    <h3>Seu ticket: { ticketNumber }</h3>
                    </div>
                        :
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Código do Vôo</label>
                                <input type="text" class="form-control" id="code" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Usuário</label>
                                <input type="text" class="form-control" id="user" />
                            </div>
                            <button type="button" onClick={() => save()} class="btn btn-primary">Salvar</button>
                        </form>

                }
            </div>
        </div>
    );


    function save() {

        const user = document.getElementById("user");
        const code = document.getElementById("code");
        setLoad(false);
        const data = {
            user: user.value,
            flight: code.value
        }
        fetch("http://18.117.223.1:3000/tickets/buy", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                ticketNumber=json.ticketCode;
                setLoad(true);

            });
    }
}
export default NewSale;

