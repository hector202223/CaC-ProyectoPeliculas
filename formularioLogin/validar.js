/* Todo se ejecuta cuando el DOM se carga completamente
 */
document.addEventListener("DOMContentLoaded",() =>{

        //Selecciona el formulario del dom
        const formulario = document.querySelector("form");
        //------------------------------------
        //Funcion mostrar error
        const mostrarError = (input,mensaje) => {
        //Acceder al div padre o contenedor
        const divPadre = input.parentNode;
        //Encontramos el elemento error-text
        const errorText = divPadre.querySelector(".error-text");
        //Agregamos la clase error al elemento Padre
        divPadre.classList.add("error")
        //Agregamos el msj de error
        errorText.innerText = mensaje;
        
    }

    const input = document.querySelector("#password");
    const mensaje = "Campo Obligatorio";
    //-----------------------------
    //Eliminar el msj de Error
    const eliminarError = input => {
        //Acceder a la etiqueta contenedora
        const divPadre = input.parentNode;
        //Elimina la clase de error del elemento padre/contenedor
        divPadre.classList.remove("error");
        //Encontramos el elemento error-text
        const errorText = divPadre.querySelector(".error-text");
        //Establecemos el texto como vacio
        errorText.innerText = "";
    }
    //--------------------------------------------------------------
    //Funcion que corrobore si los campos estan completos para quitar el error
    formulario.querySelectorAll("input").forEach(input => {
        //Se activa cdo el valor de un elemento del formulario cambia y se sale del elemento
        input.addEventListener("change",() => {
            //Obtenemos el valor de un campo seleccionado
            const valor = input.value.trim();//Elimina cualquier espacio en Bco al principio y al final del valor obtenido.
            //Usamos una condicion para evaluar si este campo es diferente al vacio
            if(valor !==""){
                eliminarError(input);
            }
        })
    });
    //-------------------------------------
    //Funcion validar campo
    function validarCampo(campoId,mensaje){
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();
        if(value ==""){
            mostrarError(campo,mensaje);
            return false;//Indicamos que la validacion fallo
        } else {
            eliminarError(campo)
            return true;//Indicamos que la validacion fue exitosa
        }
    }
    //Funcion para validar un correo electronico usando una expresion regular
    function isEmail(email){
        const expresionRegular =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i ;
        return expresionRegular.test(email);
        //Devuelve true si la cadena coincide con el patron de la expresion regular
    }
    //Funcion para validar el campo de email
    function validarEmail(campoId,mensaje){
        //Obtenemos elemento mediante el id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        //Si el campo esta vacio
        if(email === ""){
            //Establecemos mensaje de error
            mostrarError(campo,"El correo electronico es obligatorio");
            //Indicamos que la validacion ha fallado
            return false
        } else if(!isEmail(email)){
            //Establecemos msj de error 
            mostrarError(campo,mensaje);
            //Indicamos que la validacion ha fallado
            return false
        }else{
            //Si es valido eliminamos cualquier error
            eliminarError(campo);
            //Indicamos que la validacion es exitosa
            return true
        }
    }
    //----------------------------------------
    //Funcion para validar Formulario
    const validarFormulario = () => {
        let validar = true;
        //Validar campo email
        validar = validarEmail("email","El correo electronico no es valido") && validar;
        //Validar contraseña
        validar = validarCampo("password","La contraseña es obligatoria") && validar;
        return validar;
    }
    //---------------------------------------
    //Agregar un evento de escucha para cuando se envia el formulario
    formulario.addEventListener("submit",event => {
        event.preventDefault();
        if(!validarFormulario()){
            //Mensaje no valido
            event.preventDefault()//Evita que el formulario se envie
            console.log("El formulario no es valido");
        }else{
            event.preventDefault();
            console.log("El formulario es valido...");
        }
    })
})





