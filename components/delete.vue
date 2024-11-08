<template>
  <v-dialog content-class="delete" @keydown.esc="close" @click:outside="close" v-model="dialog">
    <v-card style="padding: 24px !important; background-color: rgba(241, 244, 250, 1); height: 100%;">
      <p class="main-title" style="margin-top: 0px;">RAG 삭제</p>

      <p style="text-align: center; font-size: 20px; margin-bottom: 12px !important;">
        {{name}} RAG를 삭제하시겠습니까?
      </p>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="rgba(58, 54, 219, 1)"
          @click="delete_project"
        >
          <span style="color: white;">예</span>
        </v-btn>
        <v-btn
          depressed
          color="rgba(160, 157, 255, 1)"
          @click="close"
        >
        <span style="color: white;">아니오</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>  
export default {
  emits: ['input'],
  data () {
    return {
    }
  },
  props: {
    dialog : false,
    id: null,
    name : ''
  },
  watch: {
  },
  methods: {
    delete_project() {
      this.$store.dispatch('delete_project', this.id).then((res) => {
        localStorage.removeItem('check_project')
        this.close()
      })
    },
    close() {
      this.$emit('input',false)
    },
  },
  mounted() {
  }
}
</script>
<style>
.v-dialog.delete{
  width: 500px;
  margin: auto;
  right: 0;
  bottom: 0;
  height: 200px;
}
</style>