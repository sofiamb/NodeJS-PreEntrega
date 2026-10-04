//console.log("Hola, este es mi programa");


const [metodo, recurso, ...elementosRestantes] = process.argv.slice(2);


//console.log(metodo);
//console.log(recurso);

const url = "https://dummyjson.com/products";
const urlPost = "https://dummyjson.com/products/add";

//spread
const [titulo, precio, categoria] = elementosRestantes;

const productoNuevo = {
    title : titulo,
    price : precio,
    category : categoria
   
};

const configuracion = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productoNuevo)
};

async function seleccionarFuncion(){

   // console.log(metodo);
   // console.log(recurso);
    if(metodo === "GET" && recurso === "products"){

        obtenerTodosLosProductos();
    }else{
        obtenerProductoEspecifico(recurso);
    }
}

//Obtener todos los productos
async function obtenerTodosLosProductos(){

    try{
        const respuesta = await fetch (url);

        if(!respuesta.ok){
            throw new Error(`error al obteners los productos: ${respuesta.status}`);
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
            throw new Error(`error al obteners los productos: ${respuesta.status}`);
        }

        const producto = await respuesta.json();
            
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

    fetch(urlPost, configuracion)
        //.then((respuesta) => respuesta.json())
        .then((respuesta) => {
        console.log("URL:", respuesta.url);
        console.log("Status:", respuesta.status);
        console.log("Content-Type:", respuesta.headers.get("content-type"));

        return respuesta.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error('Error: ', error));

    console.log(`${productoNuevo.title} - ${productoNuevo.price} - ${productoNuevo.category}`);
    
};

//Funciones
//seleccionarFuncion();
//obtenerTodosLosProductos();
//obtenerProductoEspecifico();
crearProductoNuevo();