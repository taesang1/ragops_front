<template>
  <div style="width: max-content;">
    <options v-model="option_dialog" :dialog="option_dialog" :option="option"/>
    <deletes v-model="delete_dialog" :dialog="delete_dialog" :id="delete_id" :name="delete_name"/>
    <newproject v-model="dialog" :dialog="dialog"/>
    <p class="main-title">RAG 생성</p>

    <div class="content">
      <div style="width: max-content; margin-left: auto;">
        <a @click="new_project">
          <button style="margin-bottom: 50px;" class="next-button">
          <a>RAG 생성</a>
          <img class="arrow-right" src="@/assets/arrow_right.png"></button>
        </a>
      </div>

      <div class="sub-title">
        RAG 목록
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
              <td @click="check_option(row.option)"><a>보기</a></td>
              <!-- <td><a>보기</a></td> -->
              <td>{{ row.end_dt }}</td>
              <td><button v-if="row.status == '생성 완료'" class="table-button">데이터 갱신</button></td>
              <td><button @click="test(row.id)" class="table-button">Playground</button></td>
              <td @click="delete_project(row.id, row.name)"><a>삭제</a></td>
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
import options from '@/components/option.vue';
import deletes from '@/components/delete.vue';

export default {
  components : { newproject, options, deletes },
  data () {
    return {
      headers : ['RAG ID','RAG명', '생성 시작 시간', '상태', '옵션', '생성 완료 시각', '데이터 갱신', 'Playground', '삭제'],
      data : [],
      dialog : false,
      option_dialog: false,
      delete_dialog: false,
      delete_id : null,
      option : {}
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
    delete_project(id, name) {
      this.delete_id = id
      this.delete_name = name
      this.delete_dialog = true
    },
    check_option(e) {
      this.option = e
      this.option_dialog = true
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