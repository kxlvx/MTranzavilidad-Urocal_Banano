// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoRespacopio = (recurso) => ({
    personaid : recurso.personaid, 
    percedula : recurso.percedula, 
    perapellidos : recurso.perapellidos, 
    pernombres : recurso.pernombres, 
    perdireccion : recurso.perdireccion, 
    pertelefono : recurso.pertelefono, 
    perwhatsapp : recurso.perwhatsapp, 
    peremail : recurso.peremail, 
    pergenero : recurso.pergenero, 
    perfechanacimiento : recurso.perfechanacimiento, 
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleRespacopio = (recurso) => recurso.map((recurso) => unicoRespacopio(recurso));  

module.exports = {
    multipleRespacopio
};