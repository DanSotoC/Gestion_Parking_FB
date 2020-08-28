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
const crear_dueño_form = document.getElementById("crear_dueño_form");
const ingreso_form = document.getElementById("ingreso_form");
const Vehiculos_Container = document.getElementById("vehiculos-container");

const getVehiculos = () => firebase.firestore().collection("Vehiculos").get();
const ongetVehiculos = (callback) => firebase.firestore().collection("Vehiculos").onSnapshot(callback);
const getPatente = (id) => firebase.firestore().collection("Vehiculos").doc(id).get();
const updatePatente = (id, updatePatente) => firebase.firestore().collection("Vehiculos").doc(id).update(updatePatente);


if (crear_dueño_form != null){
    let d;
    crear_dueño_form.addEventListener("submit", async(e)=>{ 
        e.preventDefault();
        if(document.getElementById("nombre_dueño").value != "" && document.getElementById("apellido_dueño").value != "" && document.getElementById("patente_dueño").value != "")
        {
            let nombre = document.getElementById("nombre_dueño").value;
            let apellido = document.getElementById("apellido_dueño").value;
            let patente = document.getElementById("patente_dueño").value;
            let telefono = document.getElementById("telefono_dueño").value;
            let descripcion = document.getElementById("descripcion_dueño").value;
            
            await firebase.firestore().collection("Dueños").doc().set({
                nombre,
                apellido,
                patente,
                telefono,
                descripcion,
            })
            alert("Se ha creado el dueño correctamente");
            crear_dueño_form.reset();
        }else
        {
            console.log("Debe completar los primeros 2 campos...");
        }
    });
};


window.addEventListener('DOMContentLoaded', async(e) => {
    ongetVehiculos( (querySnapshot) =>{

        Vehiculos_Container.innerHTML = '';

        querySnapshot.forEach(doc => 
        {
               
            const vehiculo_db = doc.data();
            
            if(vehiculo_db.salida == "--:--") {
                Vehiculos_Container.innerHTML += 
                `<div class="card card-body mt-2 border-primary" >
                            <tr>
                            <td>${vehiculo_db.patente} </td>
                            <td>${vehiculo_db.ingreso} </td>
                            <td><button class="w3-button w3-white w3-padding-large w3-hover-red btn-salida" style="margin:0px 70px 0px 100px" data-id="${doc.id}"> Salida</td>
                            </tr>
                        </tbody>
                    </table>        
                    
                </div>`;
            }
        })

        const btnSalida = Vehiculos_Container.querySelectorAll(".btn-salida");
        btnSalida.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getPatente(e.target.dataset.id);
                    const vehiculo_out = doc.data();
              
                    let fecha = new Date();
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

                    let out = h + ":" + m;
                    await updatePatente(e.target.dataset.id, {
                        salida:out,
                    })
                    alert("Se agrego la salida correctamente")

                }catch (error) {
                    console.log(error);
                }
            })
        })
    })
})

if (ingreso_form != null){
    let d;
    ingreso_form.addEventListener("submit", async(e)=>{ 
        e.preventDefault();
        if(document.getElementById("patente").value != "")
        {
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

            firebase.firestore().collection("Vehiculos").doc().set({
                patente,
                fecha_total,
                ingreso,
                salida,
            })
            alert("Se ha creado el dueño correctamente");
            ingreso_form.reset();

        }else
        {
            console.log("Debe completar los campos...");
        }
    });
};


