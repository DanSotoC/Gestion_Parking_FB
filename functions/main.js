const config = {
    apiKey: "AIzaSyDInPMKYhERb27BCD3GLseikaxjQoiCi9I",
    authDomain: "gestion-parking-tal.firebaseapp.com",
    databaseURL: "https://gestion-parking-tal.firebaseio.com",
    projectId: "gestion-parking-tal",
    storageBucket: "gestion-parking-tal.appspot.com",
    messagingSenderId: "402489516954",
    appId: "1:402489516954:web:0b5a4ab87127931c501023",
    measurementId: "G-D5ES7N2D5B"
};


firebase.initializeApp(config);

const firestore = firebase.firestore();

const crear_dueño_form = document.querySelector("#crear_dueño_form");
const guardar_dueño_btn = document.querySelector("#guardar_dueño_btn");
const vehiculos = document.querySelector("#vehiculos");

if (crear_dueño_form != null){
    let d;
    crear_dueño_form.addEventListener("submit", async(e)=>{ 
        e.preventDefault();
        if(document.getElementById("nombre_dueño").value != "" && document.getElementById("apellido_dueño").value != "" && document.getElementById("patente_dueño").value != ""){
            let nombre = document.getElementById("nombre_dueño").value;
            let apellido = document.getElementById("apellido_dueño").value;
            let patente = document.getElementById("patente_dueño").value;
            let telefono = document.getElementById("telefono_dueño").value;
            let descripcion = document.getElementById("descripcion_dueño").value;
        
            let post = {
                nombre,
                apellido,
                patente,
                telefono,
                descripcion
            }

            await firebase.firestore().collection("Dueños").add(post);
            console.log("Se ha creado el dueño correctamente...");
            alert("Se ha creado el dueño correctamente");
            

        }
        else{
            console.log("Debe completar los primeros 2 campos...");
        }
        
        
    })
}
const ingreso_form = document.querySelector("#ingreso_form");
const save_patente_btn = document.querySelector("#save_patente_btn");

if (ingreso_form != null){
    let d;
    ingreso_form.addEventListener("submit", async(e)=>{ 
        e.preventDefault();
        if(document.getElementById("patente").value != ""){
            let patente = document.getElementById("patente").value;
            
            let post = {
                patente,
            }

            await firebase.firestore().collection("Ingreso_Vehiculos").add(post);
            console.log("Se ha agregado patente correctamente...");
            alert("Se ha ingresado el vehiculo correctamente");


        }
        else{
            console.log("Error en la ejecución...");
        }
        
        
    })
}

const getPatente = async() => {
    let Patente_Arreglo= [];
    let docs = await firebase.firestore().collection("Ingreso_Vehiculos").get().catch(err=>console.log(err));
    docs.forEach(doc => {
        Patente_Arreglo.push({"id":doc.id, "data":doc.data()});
    });
    
    createChildren(Patente_Arreglo);
}

const createChildren = async(arr) => {
    if(vehiculos != null){
        arr.map( pos => {
            let div = document.createElement("div");
            let cover = document.createElement("div");
            let anchor = document.createElement("a");
            let anchorNode = document.createTextNode(vehiculos.data.title);
            anchor.setAttribute("href", "#vehiculos/"+ vehiculos.id);

            anchor.appendChild(anchorNode);
            div.classList.add("vehiculos");
            div.appendChild(cover);
            dib.appendChild(anchor);
            vehiculos.appendChild(div);
        });

    }

}
