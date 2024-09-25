<template>
  <div style="width: max-content;">
    <p class="main-title">프로젝트 생성</p>
    <div style="width: max-content; margin-left: auto;">
      <a href="/dataupload">
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
            <td>{{ row.start_dt }}</td>
            <td>{{ row.status }}</td>
            <td><a>보기</a></td>
            <td><a>보기</a></td>
            <td>{{ row.end_dt }}</td>
            <td><button class="table-button">데이터 갱신</button></td>
            <td><button @click="test" class="table-button">Playground</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headers : ['프로젝트', '생성 시작 시간', '상태', '옵션', '청킹 결과', '생성 완료 시각', '데이터 갱신', 'Playground'],
      data : []
    }
  },
  mounted() {
    this.$store.dispatch('get_project_list').then((res) => {
      this.data = res['projects']
    })
  },
  methods: {
    test() {
      window.location.href = '/Playground'
    }
  }
}
</script>