<template>
  <v-dialog @keydown.esc="close" @click:outside="close" width="550" v-model="dialog">
    <v-card style="padding: 24px;">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="check_project(row.id)" v-for="row in data" :key="row.id" style="cursor: pointer;;">
            <td>{{ row.id }}</td>
            <td>{{ row.start_dt }}</td>
            <td>{{ row.status }}</td>
            <td>{{ row.end_dt }}</td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  emits: ['input'],
  data () {
    return {
      headers : ['프로젝트', '생성 시작 시간', '상태', '생성 완료 시각'],
      data : []
    }
  },
  props: {
    dialog : false
  },
  methods: {
    close() {
      this.$emit('input',false)
    },
    check_project(id) {
      this.$store.commit('check_project_id', id)
      this.close()
    }
  },
  mounted() {
    this.$store.dispatch('get_project_list').then((res) => {
      this.data = res['projects']
    })
  }
}
</script>