import Cosecha from '@/models/ModeloCosecha';

export default {
    namespaced: true,

    state: {
        cosecha: new Cosecha('', '', '', '', '', '','','',''), // Modelo cosecha
        formCosechaValido: false, // Indica si el formulario de cosecha es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nueva cosecha
        setCosecha(state, nuevoCosecha) {
            state.cosecha = nuevoCosecha
        },

        // Vacia el modelo cosecha
        vaciarCosecha(state) {
            state.cosecha = new Cosecha('', '', '', '', '', '','','','')
        },

        cambiarEstadoFormCosechaValido(state, nuevoEstado) {
            state.formCosechaValido = nuevoEstado
        },
    },

    getters: {
        formCosechaValido: (state) => state.formCosechaValido, // Devuelve la variable formcosechaValido
    },
}