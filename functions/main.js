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
const ingreso_form = document.querySelector("#ingreso_form");
const save_patente_btn = document.querySelector("#save_patente_btn");


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
};



if (ingreso_form != null){
    let d;
    ingreso_form.addEventListener("submit", async(e)=>{ 
    
        e.preventDefault();
        if(document.getElementById("patente").value != ""){
            let fecha = new Date();
            var dia = fecha.getDate();
            var mes = fecha.getMonth();
            var year = fecha.getFullYear();
            var h = fecha.getHours();
            var m = fecha.getMinutes();
            if (h == 24){
                h = 0;
            } else if(h > 12){
                h = h - 0;
            }
            if(h<10){
                h = "0"+ h;
            }
            if(m<10){
                m = "0"+ m;
            }

            let patente = document.getElementById("patente").value;
            let fecha_total = dia+ "/"+ (mes+1) + "/" + year;
            let ingreso = h + ":" + m;
            let salida = "--:--";

            let post = {
                patente,
                fecha_total,
                ingreso,
                salida,
            }

            await firebase.firestore().collection("Vehiculos").add(post);
            console.log("Se ha agregado patente correctamente...");
            alert("Se ha ingresado el vehiculo correctamente");


        }
        else{
            console.log("Error en la ejecución...");
        }
        
        
    })
};
