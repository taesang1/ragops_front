<template>
  <div style="width: max-content;">
    <newproject v-model="dialog" :dialog="dialog"/>
    <p class="main-title">프로젝트 생성</p>

    <div class="content">
      <div style="width: max-content; margin-left: auto;">
        <a @click="new_project">
          <button style="margin-bottom: 50px;" class="next-button">
          <a>프로젝트 생성</a>
          <img class="arrow-right" src="@/assets/arrow_right.png"></button>
        </a>
      </div>

      <div class="sub-title">
        프로젝트 목록
      </div>
      <div class="box">
        <table>
          <thead>
            <tr>
              <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row.id">
              <td>{{ row.id }}</td>
              <td @click="check_project({id : row.id, name : row.name})"><a>{{ row.name }}</a></td>
              <td>{{ row.start_dt }}</td>
              <td>{{ row.status }}</td>
              <td><a>보기</a></td>
              <td><a>보기</a></td>
              <td>{{ row.end_dt }}</td>
              <td><button v-if="row.status == '생성 완료'" class="table-button">데이터 갱신</button></td>
              <td><button @click="test(row.id)" class="table-button">Playground</button></td>
              <!-- <td><button v-if="row.status == '생성 완료'" @click="test" class="table-button">Playground</button></td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
  </div>
</template>
<script>
import newproject from '@/components/newproject.vue';

export default {
  components : { newproject },
  data () {
    return {
      headers : ['프로젝트 ID','프로젝트명', '생성 시작 시간', '상태', '옵션', '청킹 결과', '생성 완료 시각', '데이터 갱신', 'Playground'],
      data : [],
      dialog : false
    }
  },
  mounted() {
    this.$store.dispatch('get_project_list').then((res) => {
      this.data = res['projects']
    }).catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
    this.get_project_list()
  },
  methods: {
    new_project() {
      this.dialog = true
    },
    check_project(e) {
      localStorage.setItem('check_project', JSON.stringify(e))
      window.location.href = '/dataupload'
    },
    test(id) {
      this.$store.commit('check_project_id', id)
      window.location.href = `/Playground?project_id=${id}`
    },
    get_project_list() {
      setTimeout(() => {
        this.$store.dispatch('get_project_list').then((res) => {
          this.data = res['projects']
        })
        this.get_project_list()
      }, 1000)
    },
  }
}
</script>