<template>
  <v-dialog
    v-model="dialogMostrarFitosanitario"
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
          <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarFitosanitario()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Fitosanitario -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormFitosanitario ref="componentFormFitosanitario"></FormFitosanitario>
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

import FormFitosanitario from "@/components/FormFitosanitario";

import ServicioFitosanitarios from '../services/ServicioFitosanitarios';

export default {
  name: "DialogMostrarFitosanitario",

  components: {
    FormFitosanitario,
  },

  data() {
    return {};
  },

  computed: {
    modeloFitosanitarioStore: {
      get() {
        return this.$store.getters["moduloFitosanitario/modeloFitosanitarioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFitosanitario/establecerModeloFitosanitariosStore", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogMostrarFitosanitario
    dialogMostrarFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFitosanitario"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFitosanitario", v);
      },
    },

    ...mapState("moduloFitosanitario", ["formFitosanitarioValido", "modeloFitosanitarioStore"]),
  },

  methods: {
    async actualizarRegistro () {
      const respuesta = await ServicioFitosanitarios.actualizarFitosanitario(this.modeloFitosanitarioStore.fitosanitarioid, this.modeloFitosanitarioStore);
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarFitosanitario();
        this.cargarListaFitosanitario();
        this.vaciarModeloFitosanitarioStore();
      }
    },

    async cargarListaFitosanitario () {
      let listaFitosanitarios = [];
      let respuesta = await ServicioFitosanitarios.obtenerTodosFitosanitarios();
      let fitosanitarios = await respuesta.data;
      fitosanitarios.forEach((f) => {
        listaFitosanitarios.push(f);
      });
      this.listaFitosanitariosStore = listaFitosanitarios;
    },

    async eliminarRegistro() {
      const respuesta = await ServicioFitosanitarios.eliminarFitosanitario(this.modeloFitosanitarioStore.fitosanitarioid);
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarFitosanitario();
        this.cargarListaFitosanitario();
      } 
    },
    
    // Cierra el dialogo
    cerrarDialogMostrarFitosanitario() {
      this.dialogMostrarFitosanitario = !this.dialogMostrarFitosanitario; // Cierra el dialogMostrarFitosanitario
    },

    ...mapMutations("moduloFitosanitario", ["vaciarModeloFitosanitarioStore"]),
  },
};
</script>
