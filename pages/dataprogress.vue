<template>
  <div>
    <p class="main-title">데이터 전처리 > <span class="main-sub-title">진행현황</span></p>

    <div class="content">
      <div style="display: flex;margin-bottom: 24px;">
        <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
        <a href="/vectorai" style="margin-left: auto;">
          <button class="next-button">
            <a>백터DB 생성</a>
            <img class="arrow-right" src="@/assets/arrow_right.png">
          </button>
        </a>
      </div>

      <div class="box-grid">
        <div style="width: 100%;">
          <div class="sub-title">
            작업 목록
          </div>
          <div class="box" style="min-height: 465px; max-height: 465px; overflow-y: auto; max-width: 25vw;">
            <div @click="test(i.name)" :id="i.type" v-for="i in server_file_list" :key="i" class="server_file">{{ i.name }}</div>
          </div>
        </div>

        <div style="width: 100%;">
          <div class="sub-title">
            원본파일
          </div>
          <div class="box" style="min-height: 465px; max-width: 25vw;">
            <iframe style="width: 100%; height: 400px;" v-if="view" :src="''" type="application/pdf">
            </iframe>
          </div>
        </div>

        <div style="width: 100%;">
          <div class="sub-title">
            파싱결과
          </div>
          <div class="box" style="min-height: 465px; max-height: 465px; overflow-y: auto; max-width: 25vw;">
            <p id="parsing" v-show="parsing">
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      view: false,
      parsing : null,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        hwp: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_nos : {},
      server_file_list: []
    }
  },
  mounted() {
    let body = {project_id : this.project_id}
    this.$store.dispatch('get_project_file_list', body).then((res) => {
      for (let i of res.files) {
        let file = {}
        file['name'] = i.name
        file['type'] = i.file
        this.server_file_list.push(file)
        this.file_nos[file['name']] = i.file_no
      }
    })
  },
  methods: {
    test(e) {
      this.view = false
      this.parsing = null
      this.file = e
      this.set_doc()
    },
    set_doc() {
      let body = {project_id : this.project_id, file_no : this.file_nos[this.file]}
      this.$store.dispatch('get_file', body).then((res) => {
        this.view = true
      })
      this.$store.dispatch('get_file_parsing', body).then((res) => {
        let html = ''
        for (let i of res['docs']) {
          html += `<div class='doc'>${i['text']}</div>`
        }
        document.querySelector('#parsing').innerHTML = html
        this.parsing = html
      })
    }
  },
  computed: {
    project_id() {
      return this.$store.state.project_id
    }
  }
}
</script>
<style>
.doc {
  background-color: #e0e0e0;
  margin-bottom: 12px;
  padding: 24px;
}
</style>
