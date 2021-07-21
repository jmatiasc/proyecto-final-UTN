
  const desplegarSeccion = () =>{
    const cajaDesplegable = document.getElementById("dropdown-secc");
    cajaDesplegable.setAttribute('class',"act-down");
  }

  const esconderSeccion = () =>{
    var cajaDesplegable = document.getElementById("dropdown-secc");
    cajaDesplegable.setAttribute('class',"des-down");
  }

  const cambiarVideo = (link) =>{
      
    var cajaDesplegable = document.getElementById("rep-vid");
    cajaDesplegable.setAttribute('src',link);
    cajaDesplegable = document.getElementById("rep-vid");
    console.log(cajaDesplegable);
  }


  const desplegarOpEdit = (op) =>{
    const cajaDesplegable = document.getElementById(op);
    console.log(op);
    cajaDesplegable.setAttribute('class',"op-edit-not act-op");
  }

  const esconderOpEdit = (op) =>{
    var cajaDesplegable = document.getElementById(op);
    cajaDesplegable.setAttribute('class',"op-edit-not des-op");
  }






  //_______________________________________________________api__________________________________________

  const api = async (url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales' ) =>{
    //https://www.dolarsi.com/api/api.php?type=valoresprincipales
      
      const respuesta = await fetch(url);
      const ret = await respuesta.json();
      const dolarO = ret[0]["casa"]["compra"];
      const dolarB = ret[1]["casa"]["compra"];
      const bitCoin = ret[1]["casa"]["compra"];
      // dolar oficial
      const boxDolarOficial = document.getElementById("d-dolar-o");
      const valorDO=`<i class="fas fa-money-bill-alt fa-2x"></i> <br>`+ " $"+ dolarO;
      boxDolarOficial.insertAdjacentHTML('beforeend', valorDO);

      
      const boxDolarBlue = document.getElementById("d-dolar-b");
      const valorDB=`<i class="fas fa-money-bill-alt fa-2x"></i> <br>`+ " $"+ dolarB;
      boxDolarBlue.insertAdjacentHTML('beforeend', valorDB);

      // bit coin
      const boxBitCoin = document.getElementById("d-bitcoin");
      const valorBC=`<i class="fab fa-bitcoin fa-2x"></i> <br>`+ " $"+ bitCoin;
      boxBitCoin.insertAdjacentHTML('beforeend', valorBC);




  }


 

  const apiCorona = async (url = 'http://localhost:3000/apis.datos.gob.ar/series/api/series/?ids=101.1_I2NG_2016_M_22:percent_change_a_year_ago&format=csv ')=>{
      
    const respuesta = await fetch(url);
    console.log(respuesta);

}
  window.onload = api();


  
