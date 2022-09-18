const resultado = document.querySelector('#resultado');
const tipo = document.querySelector('#tipo');
const moneda = document.querySelector('#moneda');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const ambientes = document.querySelector('#ambientes');
const dormitorios = document.querySelector('#dormitorios');
const opcion = document.querySelector('#opcion');
// const valoresOriginalesPrecioMin = valoresOriginales();
// const valoresOriginalesPrecioMax =  valoresOriginalesMaximo();
const varCompraOriginales=['seleccione',10000000,100000000,300000000,400000000,600000000,700000000];
const varAlquiler=['seleccione',20000,50000,80000,100000,150000,200000];
let scroll = false;
const dolar =  153 ;


const datosBusqueda = {

    tipo : '',
    moneda: '',
    minimo: '',
    maximo: '',
    ambientes:'',
    dormitorios:'',
    opcion:'compra',
    dolar:false


}



//si selecciona moneda dolar 


document.addEventListener('DOMContentLoaded', () =>{

        mostrarPropiedades(propiedades);
        scroll =  true;
        
})

//eventlistenters inputs de busqueda

tipo.addEventListener('change', e => {
    datosBusqueda.tipo = e.target.value;
  
    filtrarPropiedad();
})


moneda.addEventListener('change', e => {
    datosBusqueda.moneda = e.target.value;
    if (datosBusqueda.moneda === 'Dolares'){
        datosBusqueda.dolar= true;

    } else if (datosBusqueda.moneda === 'Pesos'){
        datosBusqueda.dolar= false;
       
    }
    
    mostrarPropiedades(propiedades);
    filtrarPropiedad();
    precioMinimoDolares();
    
   
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
 
    filtrarPropiedad();

})


maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
 
    filtrarPropiedad();
})


ambientes.addEventListener('change', e => {
    datosBusqueda.ambientes = parseInt(e.target.value);
   
    filtrarPropiedad();
})

dormitorios.addEventListener('change', e => {
    datosBusqueda.dormitorios = parseInt(e.target.value);
  
    filtrarPropiedad();
})


opcion.addEventListener('change', e => {
    datosBusqueda.opcion = e.target.value;
   
    precioMinimoDolares();
    filtrarPropiedad();
    
})



function convertirMoneda(precio){
    const dolar =  153 ;
    const { moneda } = datosBusqueda;
    precioInicialTemp = precio;

    
        if ( moneda === 'Dolares'){
                 precio = precio / dolar;
                 datosBusqueda.dolar = true;

                 precio = precio.toFixed(0);
                 return precio
        
             } else if (moneda === 'Pesos') {
               return  precioInicialTemp;
              
              
             } else {
                 return precioInicialTemp;
             }
           



    // if ( moneda === 'Dolares'){
    //     precio = precio * dolar;
    //     return precio

    // } else {
    //     precio
    // }
   
}

function precioMinimoDolares(){

   
  

    let opciones = minimo.options;
    let opcionesMaximo = maximo.options;
    
    if(datosBusqueda.dolar === true){

        if (datosBusqueda.opcion === "alquiler"){

            for ( let i = 0 , len = opciones.length; i < len ; i++){


                let optionTemp =varAlquiler[i] / dolar;
                let optionTempTxt =  numeroConCeros(optionTemp.toFixed(0));
               
                let optionTempMax = varAlquiler[i]/ dolar;
                optionTempMaxTxt = numeroConCeros(optionTempMax.toFixed(0));
                if (i > 0) {
                    opciones[i].value = optionTempTxt;
                    // opciones[i].text = numeroConCeros(optionTemp);
                    opciones[i].text = numeroConComas(optionTempTxt);
                    opcionesMaximo[i].value = optionTempTxt;
                    
                    opcionesMaximo[i].text = numeroConComas( optionTempMaxTxt);
                }



            }



        } else {

     
            for ( let i = 0 , len = opciones.length; i < len ; i++){
      
      
                let optionTemp =varCompraOriginales[i] / dolar;
                let optionTempTxt =  numeroConCeros(optionTemp.toFixed(0));
               
                let optionTempMax = varCompraOriginales[i]/ dolar;
                optionTempMaxTxt = numeroConCeros(optionTempMax.toFixed(0));
                if (i > 0) {
                    opciones[i].value = optionTemp;
                    // opciones[i].text = numeroConCeros(optionTemp);
                    opciones[i].text = numeroConComas(optionTempTxt);
                    opcionesMaximo[i].value = optionTempMax;
                    
                    opcionesMaximo[i].text = numeroConComas( optionTempMaxTxt);
                }
            }
            



        }
   

    } else if( datosBusqueda.dolar === false) {
        

     
        if (datosBusqueda.opcion === "alquiler"){

         
           
            for ( let i = 0 , len = opciones.length; i < len ; i++){

                opciones[i].value = varAlquiler[i];
                opciones[i].text = numeroConComas(varAlquiler[i]);
                opcionesMaximo[i].value = varAlquiler[i];
                opcionesMaximo[i].text =numeroConComas(varAlquiler[i]);
            }
            


        }
         else {
           
            for ( let i = 0 , len = opciones.length; i < len ; i++){
            opciones[i].value = varCompraOriginales[i];
            opciones[i].text = numeroConComas(varCompraOriginales[i]);
            opcionesMaximo[i].value = varCompraOriginales[i];
            opcionesMaximo[i].text = numeroConComas(varCompraOriginales[i]);


            }
     


           
        } 
            




        }

        
    }














function numeroConComas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


function numeroConCeros(numero){

    let arregloNumero = Array.from(String(numero), Number);
    for ( let i = 1  , len = arregloNumero.length; i < len ; i++)
    {
       

        arregloNumero[i] = 0; 
       
       
        
    }

    let arregloFinal = arregloNumero.join('');
    
    return arregloFinal;


}



function mostrarPropiedades(propiedades){

    limpiarHTML(); 
        let precio;
     
    // propiedades.forEach( propiedad => {
       
        // const precioF = convertirMoneda(precio);
        let precioF; 
        const card = `

        ${propiedades.map(propiedad => `
    
        <article>
       
        <div class = "img-box">
            <img src = ${propiedad.img} alt = "">
        </div>

        <div class = "text-content">
            <h3>${propiedad.tipo}</h3>
            <div class = "rating">
                <span>
                    <i class = "fas fa-star"></i>
                </span>
                <span>
                    <i class = "fas fa-star"></i>
                </span>
                <span>
                    <i class = "fas fa-star"></i>
                </span>
                <span>
                    <i class = "fas fa-star"></i>
                </span>
                <span>
                    <i class = "far fa-star"></i>
                </span>
                <span>8 Rating</span>
            </div>
            <p>${propiedad.opcion}</p>
            <p>${propiedad.ambientes} ambientes</p>

            <p>${propiedad.dormitorios} dormitorios</p>

            <p>${propiedad.opcion} </p>


            <p>precio ${numeroConComas(convertirMoneda(propiedad.precio))} ${propiedad.precio == convertirMoneda(propiedad.precio) ? 'Pesos' : 'Dolares'}</p>

            <div class = "location">
                <div>
                    <span><i class = "fas fa-map"></i></span>
                    <span>${propiedad.barrio}</span>
                </div>
             
            </div>
        </div>
    </article>
    `).join('')}
        `;

        resultado.innerHTML = card;

        if (scroll){

            resultado.scrollIntoView({behavior: 'smooth'});

        }
        


}


//limpiar html

function limpiarHTML(){
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild);

        }


}

//funcion que filtra en base a la busqueda

function filtrarPropiedad() {
        const resultado =  propiedades.filter( filtrarTipo ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarAmbientes ).filter( filtrarDormitorios ).filter( filtrarOpcion );
       
     

        if( resultado.length ) {
            mostrarPropiedades(resultado);

        } else {
            sinResultados();
        }



}

function sinResultados() { 
    limpiarHTML(); 
    const  sinResultados = document.createElement('div');
    sinResultados.classList.add('alerta','error');
    sinResultados.textContent = 'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(sinResultados);



}

function filtrarTipo(dato) {
    // console.log(dato.tipo);
    const { tipo } = datosBusqueda ;
    
    if(tipo) {
        return dato.tipo === tipo;

    }
    return  dato;

}


function filtrarMinimo(dato) {
    //ordernar reultados de menor a mayor
    const { minimo } = datosBusqueda ;

    if (minimo) {
        if ( datosBusqueda.dolar === false){
        return dato.precio >= minimo;}
        else{
            datoprecio = dato.precio / dolar;


            return datoprecio >= minimo;

     

       };
        

    }

    return dato;

}
    
    function filtrarMaximo(dato) {
        //ordernar reultados de menor a mayor
        const { maximo } = datosBusqueda ;
    
        if (maximo) {
           if ( datosBusqueda.dolar === false){
            return dato.precio <= maximo;


           }else{
                datoprecio = dato.precio / dolar;


                return datoprecio <= maximo;

         

           };
            
        }
    
        return dato;
    
    
    }


    function filtrarAmbientes(dato){

        const { ambientes } = datosBusqueda ;
    
        if(ambientes) {
            return dato.ambientes === ambientes;
    
        }
        return  dato;

    }


    function filtrarDormitorios(dato){

        const { dormitorios } = datosBusqueda ;
    
        if(dormitorios) {
            return dato.dormitorios === dormitorios;
    
        }
        return  dato;

    }



    
function filtrarOpcion(dato) {
    // console.log(dato.tipo);
    const { opcion } = datosBusqueda ;
    
    if(opcion) {
        return dato.opcion === opcion;


    }
    return  dato;

}
