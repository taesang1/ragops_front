<template>
 <div class="project-box">
    <div @click="check_project_id=true" class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_name }}</div>
    <div v-if="check_project_id" class="project-list">
      <p @click="change_project(project)" v-for="project in project_list" :key="project">{{ project.name }}</p>
    </div>
 </div>
</template>
<script>
export default {
  data () {
    return {
      check_project_id : false
    }
  },
  watch: {
  },
  methods: {
    change_project(e) {
      localStorage.setItem('check_project', JSON.stringify(e))
      this.$store.commit('check_project_id', e)
      this.check_project_id = false
    }
  },
  computed: {
    project_name() {
      return this.$store.state.project_name
    },
    project_list() {
      return this.$store.state.project_list
    }
  }
}
</script>