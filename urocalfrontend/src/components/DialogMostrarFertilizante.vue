<template>
  <v-dialog
    v-model="dialogMostrarFertilizante"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" >mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarFertilizante()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Fertilizante -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormFertilizante ref="componentFormFertilizante"></FormFertilizante>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false" @click="actualizarRegistro()"
          width="250px">
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFertilizante from "@/components/FormFertilizante";
import ServicioFertilizantes from '../services/ServicioFertilizantes';

export default {
  name: "DialogMostrarFertilizante",

  components: {
    FormFertilizante,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarFertilizante
    dialogMostrarFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFertilizante"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFertilizante", v);
      },
    },

    modeloFertilizanteStore: {
      get() {
        return this.$store.getters["moduloFertilizante/modeloFertilizanteStore"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerModeloFertilizanteStore", v);
      },
    },

    ...mapState("moduloFertilizante", ["formFertilizanteValido", "modeloFertilizanteStore"]),
  },

  methods: {
    async actualizarRegistro () {
      const respuesta = await ServicioFertilizantes.actualizarFertilizante(this.modeloFertilizanteStore.fertilizacionid, this.modeloFertilizanteStore);
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarFertilizante();
        this.cargarListaFertilizante();
        this.vaciarModeloFertilizanteStore();
      }
    },

    async cargarListaFertilizante () {
      let listaFertilizantes = [];
      let respuesta = await ServicioFertilizantes.obtenerTodosFertilizantes();
      let fertilizantes = await respuesta.data;
      fertilizantes.forEach((f) => {
        listaFertilizantes.push(f);
      });
      this.listaFertilizantesStore = listaFertilizantes;
    },

    async eliminarRegistro() {
      const respuesta = await ServicioFertilizantes.eliminarFertilizante(this.modeloFertilizanteStore.fertilizacionid);
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarFertilizante();
        this.cargarListaFertilizante();
      } 
    },

    cerrarDialogMostrarFertilizante() {
      this.dialogMostrarFertilizante = !this.dialogMostrarFertilizante;
    },

    ...mapMutations("moduloFertilizante", ["vaciarModeloFertilizanteStore"]),
  },
};
</script>
