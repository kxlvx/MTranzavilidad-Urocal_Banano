// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoProductorPersona = (recurso) => ({
    personaid : recurso.personaid, 
    percedula : recurso.percedula, 
    perapellidos : recurso.perapellidos, 
    pernombres : recurso.pernombres, 
    perdireccion : recurso.perdireccion, 
    pertelefono : recurso.pertelefono, 
    perwhatsapp : recurso.perwhatsapp, 
    peremail : recurso.peremail, 
    pergenero : recurso.pergenero, 
    edad : recurso.edad, 
    productoridioma: recurso.productoridioma,
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleProductorPersona = (recurso) => recurso.map((recurso) => unicoProductorPersona(recurso));  

module.exports = {
    multipleProductorPersona
};