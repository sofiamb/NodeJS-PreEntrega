//console.log("Hola, soy Sofía y este es mi programa.");

const [metodo, recurso, ...elementosRestantes] = process.argv.slice(2);

//console.log(metodo);
//console.log(recurso);

const url = "https://dummyjson.com/products";
const urlPost = "https://dummyjson.com/products/add";



const [titulo, precio, categoria] = elementosRestantes;

const productoNuevo = {
    title : titulo,
    price : precio,
    category : categoria   
};
//Spread
const productoParaEnviar = {
    ...productoNuevo,
    price: Number(productoNuevo.price)
};

const configuracionPOST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
  body: JSON.stringify(productoParaEnviar)
};

const configuracionDELETE = {
    method: 'DELETE',
};

//Obtener todos los productos
async function obtenerTodosLosProductos(){

    try{
        const respuesta = await fetch (url);

        if(!respuesta.ok){
            throw new Error(`error al obtener los productos: ${respuesta.status}`);
        }

        const producto = await respuesta.json();
        console.log(producto.products);
     
    }catch(error){

        console.error ("Error: ", error.message);
    }finally{
        console.log ("Operación finalizada");
    }    
}

//Obtener un producto específico
async function obtenerProductoEspecifico(recurso){

    const idRecortado = recurso.split("/");
    //console.log(idRecortado[1]);

    //template literal 
    const urlProducto = `${url}/${idRecortado[1]}`;
    //console.log(urlProducto);
       
    try{
        const respuesta = await fetch (urlProducto);

        if(!respuesta.ok){
            throw new Error(`error al obtener el producto+: ${respuesta.status}`);
        }

        const producto = await respuesta.json();
        console.log(producto);

        //Destructuring
        const{ title, category, price} = producto;        
        console.log(`${title} - ${price} - ${category}`);
     
    }catch(error){

        console.error ("Error: ", error.message);
    }finally{
        console.log ("Operación finalizada");
    }    

}

//Producto Nuevo - Promesa
const crearProductoNuevo = () => {

   fetch(urlPost, configuracionPOST)
    .then((respuesta) => respuesta.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error: ", error));
       
    console.log(`${productoNuevo.title} - ${productoNuevo.price} - ${productoNuevo.category}`);
    
};
//Eliminar producto
async function eliminarProducto(){

    const idRecortado = recurso.split("/");
    
    //template literal 
    const urlProducto = `${url}/${idRecortado[1]}`;
   
       
    try{
        const respuesta = await fetch (urlProducto, configuracionDELETE);

        if(!respuesta.ok){
            throw new Error(`error al eliminar el producto: ${respuesta.status}`);
        }

        const producto = await respuesta.json();
        console.log(producto);
        
        //Destructuring
        const{ title, category, price} = producto;        
        console.log(`${title} - ${price} - ${category}`);
     
    }catch(error){

        console.error ("Error: ", error.message);
    }finally{
        console.log ("Operación finalizada");
    }    


};

// funcion principal/main
function main(){

   // console.log(metodo);
   // console.log(recurso);
   switch(metodo){
    case "GET":
        const idRecortado = recurso.split("/");
        if(idRecortado[1]){
            obtenerProductoEspecifico(recurso);
        }else{
            obtenerTodosLosProductos();
        }  
        break;  
    case "POST":
        crearProductoNuevo();
        break;
    case "DELETE":
        eliminarProducto();
        break;
   }
  
}

main();