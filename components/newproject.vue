<template>
  <v-dialog content-class="new_rag" @keydown.esc="close" @click:outside="close" v-model="dialog">
    <v-card style="padding: 24px !important; background-color: rgba(241, 244, 250, 1); height: 100%;">
      <p class="main-title" style="margin-top: 0px;">신규 RAG 생성</p>

      <v-text-field
        label="RAG 이름을 입력해주세요."
        dense
        v-model="name"
        outlined
      ></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="rgba(58, 54, 219, 1)"
          @click="new_project"
        >
          <span style="color: white;">저장</span>
        </v-btn>
        <v-btn
          depressed
          color="rgba(160, 157, 255, 1)"
          @click="close"
        >
        <span style="color: white;">취소</span>
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
      name : ''
    }
  },
  props: {
    dialog : false
  },
  watch: {
  },
  methods: {
    new_project() {
      if (this.name == '') {
        alert('RAG명을 입력해주세요.')
        return
      }
      this.$store.dispatch('new_project', this.name).then((res)=> {
        this.$emit('input',false)
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
.v-dialog.new_rag{
  width: 500px;
  margin: auto;
  right: 0;
  bottom: 0;
  height: 250px;
}
</style>