<template>
  <v-dialog fullscreen @keydown.esc="close" @click:outside="close" width="550" v-model="dialog">
    <v-card style="padding: 24px;">
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
    dialog : false
  },
  methods: {
    close() {
      this.$emit('input',false)
    },
  },
  mounted() {
  }
}
</script>