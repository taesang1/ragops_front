<template>
  <v-dialog persistent v-model="dialog" @click:outside="close">
    <v-card>
      
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
    check(e, ch) {
      console.log(e)
      for (var i of Object.keys(e)) {
        if (i != ch) {
          e[i].value = false
        }
      }
    },
    close() {
      this.$emit('input', false)
    },
    set_chart() {
      if (this.is_chart) return
      var ctx = document.querySelector('#chart')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3'],
          datasets: [{
            data: [0.781231, 0.740987, 0.7098],
            borderWidth: 1,
            backgroundColor: '#FF7DA8',
            maxBarThickness: 30
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              min: 0,
              max: 1,
            }
          }
        }
      });
      this.is_chart = true
    }
  }
}
</script>