// Implementar la clase Activity, la cual representará a las actividades que se crearán. Debe tener las propiedades: id, title, description, imgUrl.

class Activity{
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

/*Implementar la clase Repository, la cual se encargará de crear, almacenar y manipular las actividades. La misma tendrá:

Propiedad activities => Un arreglo para almacenar las actividades.
Método getAllActivities => Debe retornar un arreglo con todas las actividades.
Método createActivity => Debe instanciar una actividad con los datos correspondientes y almacenarla en su arreglo.
EXTRA CREDIT. Método deleteActivity => Debe recibir un id y filtrar el arreglo para eliminar la actividad correspondiente. */

class Repository{
    constructor(){
        this.activities = [];
        this.id = 0;
    }
    getAllActivities(){
        return this.activities;
    }
    createActivity(title, description, imgUrl){
        const id = ++this.id;
        const activity = new Activity(id, title, description, imgUrl);
        this.activities.push(activity)
    }
    deleteActivity(id){
        const filteredActivities = this.activities.filter((activities) => activities.id !== id);
        this.activities = filteredActivities;        
    }
}

//Crear una instancia de la clase Repository con la que trabajaremos en toda la actividad.
const myRepo = new Repository();

//Implementar una función que tomará UNA instancia de Activity y la convertirá en elemento HTML. Esta función nos servirá más adelante.

//Recibir por parámetro un objeto instancia de Activity.
function transformToHtml(activity){
    //Extraer sus propiedades en variables utilizando destructuring.
    const {id, title, description, imgUrl} = activity
    //Crear los elementos HTML que formarán parte de la tarjeta. Ej: <h3> para el título, <p> para la descripción, <img> para la imagen.
    const id_html = document.createElement("p")
    const title_html = document.createElement("h3");
    const description_html = document.createElement("p");
    const img_html = document.createElement("img");

    /* Asignar los valores a las propiedades correspondientes a cada uno de los elementos. Ej: a la propiedad innerHTML del elemento del título, asignar el valor correspondiente. A la propiedad src del elemento de la imagen, asignar el valor correspondiente. */
    
    //agregando contenido a las etiquetas.
    title_html.innerHTML = title; 
    description_html.innerHTML = description; 
    //agregando al  atributo src url dada por el usuario en el formulario.
    img_html.src = imgUrl;
    //ocultar etiqueta id_html agregando atributo hidden.
    id_html.hidden = true;

    //Agregar a los elementos las clases CSS correspondientes que hayas implementado para darles estilos.
    title_html.classList.add("cardTitle");
    description_html.classList.add("cardDescription");
    img_html.classList.add("cardImg");

    //Crear un elemento <div> que será la tarjeta donde incluiremos todos los demás elementos.
    const cardDiv = document.createElement("div");

    //“Appendear” al nuevo <div> los elementos creados anteriormente .
    cardDiv.appendChild(id_html);
    cardDiv.appendChild(title_html);
    cardDiv.appendChild(img_html);
    cardDiv.appendChild(description_html);
    

    //Asignar al <div> la clase CSS que tengas implementada para darle estilos.
    cardDiv.classList.add("cardDiv");

    //Retornar el <div> finalizado con todos los elementos correspondientes dentro.
    return cardDiv;
}

//Implementar una función que se encargará de “convertir” TODAS las instancias de Activity en elementos HTML para agregarlos al contenedor correspondiente.
function transformToActivities() {
    //Seleccionar el contenedor
    const container_act = document.getElementById("contaner_activities");
    // Paso 2: Vaciar el contenido actual del contenedor
    container_act.innerHTML = "";
    // Paso 3: Obtener el listado completo de actividades
    const activities = myRepo.getAllActivities();
    // Paso 4: Mapear las actividades a elementos HTML
    const activityHtml = activities.map((activity) => transformToHtml(activity));
    // Paso 5: Appendear los elementos HTML al contenedor
    activityHtml.forEach((elementDiv) => {
      container_act.appendChild(elementDiv);
    });
  }

//Implementar la función handler que se ejecutará al disparar el evento del botón.
function handlerActivity(event){
//cancela evento de envio del formulario.    
event.preventDefault();
//Seleccionar los inputs de title, description e imgUrl.
const tituloInput = document.querySelector("#titulo");
const descripcionInput = document.querySelector("#descripcion");
const urlimgInput = document.querySelector("#urlimg");
//Tomar los valores ingresados en los inputs y guardarlos en variables.
const tituloValue = tituloInput.value; 
const descripcionValue = descripcionInput.value;
const urlimgValue = urlimgInput.value;
//Validar que estos valores estén completos. De lo contrario deberá cortar el proceso y mostrar un mensaje avisando al usuario de que hay datos incompletos.
if(!tituloValue || !descripcionValue || !urlimgValue){
    return alert("Por favor ingrese los datos de todos los campos");
}
//Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad.
myRepo.createActivity(tituloValue, descripcionValue, urlimgValue);
//Invocar la función transformToActivities() para “refrescar” el contenedor de actividades.
transformToActivities();
}
//Seleccionar el botón que disparará el evento de agregar actividad.
const button = document.getElementById("botonActividad");
//Agregar un Event Listener, el evento, al dispararse, ejecuta la función handlerActivity().
button.addEventListener("click",handlerActivity);







