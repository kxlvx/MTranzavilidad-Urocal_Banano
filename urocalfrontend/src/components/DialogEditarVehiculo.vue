<template>
  <v-dialog v-model="dialogEditarVehiculo" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <v-spacer></v-spacer>
        <h5>Editar Vehiculo</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field class="custom px-2" filled dense label="Placa"></v-text-field>
            <v-select class="style-chooser custom px-2" :items="itemsMarca" label="Marca" ></v-select>
            <v-text-field class="custom px-2" filled dense label="Descripcion"></v-text-field>
            <v-text-field class="custom px-2" filled dense label="Lona"></v-text-field>
            <v-text-field class="custom px-2" filled dense label="Caseta"></v-text-field>
            <v-text-field class="custom px-2" filled dense label="Puerta"></v-text-field>
            <v-select class="style-chooser custom px-2" :items="itemsMarca" label="Marca" ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
        <!--<v-btn color="error" block @click="dialogEditarVehiculo = !dialogEditarVehiculo" >Cancelar</v-btn>-->
        <v-btn color="primary" elevation="0" large block class="mt-2">Guardar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogEditarVehiculo",

  props: {},

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      itemsMarca: ['Chevrolet', 'Mazda'],
      itemsFinca: ['Machala', 'Pasaje', 'Santa Rosa'],
    };
  },

  computed: {
    // Según el valor de la variable dialogEditarVehiculo muestra u oculta el dialogo
    dialogEditarVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarVehiculo", v);
      },
    },

    ...mapState("moduloVehiculo", ["limpieza_vehiculo"]),   // Modulo Vehiculo

    ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
    
  },

  methods: {
    cerrarDialogo(){
      this.dialogEditarVehiculo = !this.dialogEditarVehiculo;
      this.vaciarVehiculo;
    }
  }
};
</script>
