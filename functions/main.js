//Conexion a la base de datos - Firebase
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

// Se inicia bd
firebase.initializeApp(config);


const firestore = firebase.firestore();
const crear_dueño_form = document.getElementById("crear_dueño_form");
const ingreso_form = document.getElementById("ingreso_form");
const buscar_dueño_form = document.getElementById("buscar_dueño_form");
const buscar_salida_form = document.getElementById("buscar_salida_form");
const Vehiculos_Container = document.getElementById("vehiculos-container");
const Dueños_Container = document.getElementById("dueños-container");

// Se generan constantes para el GET de Patentes
const getVehiculos = () => firebase.firestore().collection("Vehiculos").get();
const ongetVehiculos = (callback) => firebase.firestore().collection("Vehiculos").onSnapshot(callback);
const getPatente = (id) => firebase.firestore().collection("Vehiculos").doc(id).get();
const updatePatente = (id, updatePatente) => firebase.firestore().collection("Vehiculos").doc(id).update(updatePatente);

// Se generan constantes para el GET de Dueños
const getDueños = () => firebase.firestore().collection("Dueños").get();
const ongetDueños = (callback) => firebase.firestore().collection("Dueños").onSnapshot(callback);
const getDueños_data = (id) => firebase.firestore().collection("Dueños").doc(id).get();
const updateDueños = (id, updateDueños) => firebase.firestore().collection("Dueños").doc(id).update(updateDueños);


//Formulario para CREAR DUEÑO
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

//Formulario para obtener patente al ingresar un vehiculo
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
            alert("Se ha ingresado el vehiculo correctamente");
            ingreso_form.reset();

        }else
        {
            console.log("Debe completar los campos...");
        }
    });
};

//GET Formulario para Ingreso y Salida de Vehiculos 
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
                            <td style="font-size: 20px">${vehiculo_db.patente} </td>
                            <td style="font-size: 20px">${vehiculo_db.ingreso} </td>
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
                    alert("Vehiculo Salio Correctamente")

                }catch (error) {
                    console.log(error);
                }
            })
        })
    })
});


//GET Formulario para obtener todos los dueños
window.addEventListener('DOMContentLoaded', async(e) => {
    e.preventDefault();
    ongetDueños( (querySnapshot) =>{
            Dueños_Container.innerHTML = '';

            querySnapshot.forEach(doc =>{

                const dueños_db = doc.data();
                Dueños_Container.innerHTML += 
                    `<div class="card card-body mt-2 border-primary" >
                                <tr>
                                <td>${dueños_db.nombre} </td>
                                <td>${dueños_db.apellido} </td>
                                <td>${dueños_db.patente} </td>
                                <td>${dueños_db.telefono} </td>
                                <td>${dueños_db.descripcion}</td>
                                </tr>
                            </tbody>
                        </table>        
                    </div>`;
            });
        });
});

//GET Formulario para obtener dueños filtrados (Busqueda)
window.addEventListener('DOMContentLoaded', async(e) => {
    ongetDueños( (querySnapshot) =>{
        buscar_dueño_form.addEventListener("submit", async(e)=>{ 
            e.preventDefault();
            Dueños_Container.innerHTML = '';

            querySnapshot.forEach(doc =>{
               
                const dueños_db = doc.data();
                console.log(dueños_db.patente);
                patente_d = document.getElementById("buscador_dueño").value;
                
                if(dueños_db.patente == patente_d ){
                    Dueños_Container.innerHTML += 
                    `<div class="card card-body mt-2 border-primary" >
                                <tr>
                                <td>${dueños_db.nombre} </td>
                                <td>${dueños_db.apellido} </td>
                                <td>${dueños_db.patente} </td>
                                <td>${dueños_db.telefono} </td>
                                <td>${dueños_db.descripcion}</td>
                                </tr>
                            </tbody>
                        </table>        
                    </div>`;
                }
            
            });
        });
        buscar_dueño_form.reset();
    });
});

//GET Formulario para obtener patentes filtrados (Busqueda)
window.addEventListener('DOMContentLoaded', async(e) => {    ongetVehiculos( (querySnapshot) =>{
        buscar_salida_form.addEventListener("submit", async(e)=>{ 
            e.preventDefault();
            Vehiculos_Container.innerHTML = '';

            querySnapshot.forEach(doc => 
            {
                
                const vehiculo_db = doc.data();
                const patente_s = document.getElementById("buscador_salida").value;
                
                if(vehiculo_db.patente  == patente_s && vehiculo_db.salida == "--:--") {
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
                
            });

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
                        alert("Vehiculo Salio Correctamente")
    
                    }catch (error) {
                        console.log(error);
                    }
                })
            })

        });
    });
});

function Ocultar_Mostar(){
    var x = document.getElementById("password_login");
    var y = document.getElementById("eye1");
    var z = document.getElementById("eye2");

    if (x.type == 'password'){
        x.type="text";
        z.style.display="inline";
        y.style.display="none";
    }
    else{
        x.type="password";
        y.style.display="inline";
        z.style.display="none";
    }   
};

const login_form = document.querySelector('#login_form');
const auth = firebase.auth()

login_form.addEventListener('submit',(e) => {
    e.preventDefault();
    const email = document.querySelector('#email_login').value;
    const password = document.querySelector('#password_login').value;
    auth.signInWithEmailAndPassword(email,password).then( userCredential =>{
            localStorage.setItem("Email", document.getElementById("email_login").value);
            window.location = 'index.html'
        })

})

function registro(){
    const emails = document.querySelector('#email_login').value;
    const passwords = document.querySelector('#password_login').value;

    auth
        .createUserWithEmailAndPassword(emails,passwords)
        .then( userCredential =>{
            login_form.reset();
            alert("Se ha registrado correctamente");
        })

}
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
        alert("Se ha cerrado sesión");
        window.location = 'login.html'
})

