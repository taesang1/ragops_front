<template>
  <div>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">결과 확인</span></p>

    <div style="display: flex;margin-bottom: 24px;">
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
      <button class="next-button">
        <a>백터DB 저장</a>
        <img class="arrow-right" src="@/assets/arrow_right.png">
      </button>
    </div>

    <div class="box-grid">
      <div>
        <div class="sub-title">작업목록</div>
          <div class="box" style="min-height: 450px;">
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="server_file_list"
            activatable
            item-key="name"
            open-on-click
            @update:active="test"
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
          </v-treeview>
        </div>
      </div>

      <div>
        <div class="sub-title">원본파일</div>
        <div class="box" style="min-height: 450px;">
          <iframe style="width: 100%; height: 400px;" v-if="view" :src="''" type="application/pdf">

          </iframe>
        </div>
      </div>

      <div>
        <div class="sub-title">청킹 결과</div>
        <div class="box" style="min-height: 450px; max-height: 450px; overflow-y: scroll; padding: 0;">
          <p id="chunking" v-show="chunking">
          </p>
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
      chunking : null,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        hwp: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_nos : {},
      server_file_list: [
        {
          name: 'folder1',
        },
        {
          name: 'folder2',
          children: [
          ],
        },
      ]
    }
  },
  mounted() {
    let body = {project_id : this.project_id}
    this.$store.dispatch('get_project_file_list', body).then((res) => {
      let file = {}
      file['name'] = res.files[0].name
      file['file'] = res.files[0].file
      this.server_file_list[1]['children'].push(file)
      this.file_nos[file['name']] = res.files[0].file_no
    })
  },
  methods: {
    test(e) {
      if (e.length > 0) {
        this.view = false
        this.file = e[0]
        this.set_doc()
      }
    },
    set_doc() {
      let body = {project_id : this.project_id, file_no : this.file_nos[this.file]}
      this.$store.dispatch('get_file', body).then((res) => {
        this.view = true
      })
      this.$store.dispatch('get_file_chunk', body).then((res) => {
        let html = ''
        for (let i of res['chunks']) {
          html += `<div class='doc'>${i['text']}</div>`
        }
        document.querySelector('#chunking').innerHTML = html
        this.chunking = html
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
