import './Sales.css'


function Sales(){
    function save(){
        window.location.href = "/sales/new";
    }
    
    return (
        <div>
        <div class="row p-3">
            <div class="col-sm-3">
            <h4>Vendas</h4>
            </div>
            <div class="col-sm-3"></div>
            <div class="col-sm-3">
            </div>
            <div class="col-sm-3">
               
                <div class="m-2">
             
                <button type="button" class="btn btn-primary" onClick={() => { save()}} >Cadastrar Nova Venda</button>
          
                </div>

            </div>
        </div>
        
        <div class="row p-3">
            <div class="col-sm-12">
                {/* <table class="table table-striped w-100">
                    <thead>
                        <tr>
                            <th scope="col">E-ticket</th>
                            <th scope="col">Vôo</th>
                            <th scope="col">Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salesList.map(sale => (
                                <tr>
                                    <td key={sale.eTicket}>{sale.eTicket}</td>
                                    <td key={sale.flight}>{sale.flight}</td>
                                    <td key={sale.price}>{sale.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            */}
            </div>

        </div>
    </div>

    );
}


export default Sales;