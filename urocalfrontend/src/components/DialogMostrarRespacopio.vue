<template>
  <v-dialog
    v-model="dialogMostrarRespacopio"
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
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarRespacopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Respacopio -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormRespacopio ref="componentFormRespacopio"></FormRespacopio>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRespacopio from "@/components/FormRespacopio";

export default {
  name: "DialogMostrarRespacopio",

  components: {
    FormRespacopio,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarRespacopio
    dialogMostrarRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRespacopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRespacopio", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarRespacopio() {
      this.dialogMostrarRespacopio = !this.dialogMostrarRespacopio; // Cierra el dialogMostrarRespacopio
    },
  },
};
</script>
