<template>
  <div style="width: max-content;">
    <loadproject :dialog="dialog" v-model="dialog"/>
    <p class="main-title">데이터 전처리</p>

    <div style="display: flex; padding-left: 16px; margin-bottom: 24px;">
      <button @click="dialog = true" class="load-project">
        <img class="add-icon" src="@/assets/add.png">
        프로젝트 불러오기
      </button>
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
      <a v-if="is_loading" style="margin-left: auto;">
        <button class="next-button">
          <img class="loading" src="@/assets/loading.gif">
        </button>
      </a>
      <a v-else-if="!is_vector" @click="[check_project_file(), is_loading = true]" style="margin-left: auto;">
        <button class="next-button">
          <a>전처리 실행</a>
          <img class="arrow-right" src="@/assets/arrow_right.png">
        </button>
      </a>
      <a v-else-if="is_vector" href="/vectorai" style="margin-left: auto;">
        <button class="next-button">
          <a>벡터 DB 생성</a>
          <img class="arrow-right" src="@/assets/arrow_right.png">
        </button>
      </a>
    </div>

    <div class="box-grid">

      <div style="width: 100%;">
        <div class="sub-title">
          파일 검색
        </div>
        <div style="min-height: 450px;" class="box">
          <input v-model="path" type="text" class="search-field">

          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="server_base_file_list"
            activatable
            item-key="name"
            open-on-click
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


      <div style="width: 100%;">
        <div class="sub-title">
          작업 목록
        </div>
        <div class="box" style="min-height: 300px; max-height: 300px; overflow-y: auto;">
          <div :id="i.type" v-for="i in server_file_list" :key="i" class="server_file">{{ i.name }}</div>
        </div>

        <div class="box">
          <div class="file-upload"
            @dragover.prevent="onDragOver"
            @dragleave="onDragLeave"       
            @drop="onDrop"
            @click="triggerZipFileInput">
            <img src="@/assets/file_upload.png">
            <p style="padding: 8px 0px;">Drag your file here, of Click here to browse</p>
          </div>
          <input multiple @change="input_files" type="file" id="upload_file" accept=".pdf, .hwp" style="display:none;">
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import loadproject from '@/components/loadproject.vue';

export default {
  components : { loadproject },
  data () {
    return {
      count : 0,
      path : '',
      is_vector : false,
      is_loading : false,
      dialog : false,
      upload_file : null,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file_nos : {},
      server_base_file_list: [
        {
          name: 'folder1',
        },
        {
          name: 'folder2',
          children: [
          ],
        },
      ],
      server_file_list: []
    }
  },
  mounted() {
    let body = {project_id : this.project_id}
    this.$store.dispatch('get_server_file_base_list', body).then((res) => {
      body['path'] = res
      this.path = res
      this.$store.dispatch('get_server_file_list', body).then((res) => {
        let file = {}
        file['name'] = res.files[0].file_name
        file['file'] = res.files[0].file_type
        this.server_base_file_list[1]['children'].push(file)
        this.file_nos[file['name']] = res.files[0].file_no
      })
    })
    this.get_project_file_list()
  },
  methods: {
    onDrop(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length > 0) {
        for (let i of files) {
          if (i.type != 'application/pdf' && i.name.split('.')[1] != 'hwp') {
            alert(".pdf 또는 .hwp 파일을 선택해주세요.")
            e.preventDefault();
            e.stopPropagation();
            return
          }
        }
        this.upload_file = files;
        this.upload_files()
      }
    },
    triggerZipFileInput(){
      document.querySelector('#upload_file').click()
    },
    input_files(e) {
      this.upload_file = e.target.files || e.dataTransfer.files;
      if (!this.upload_file.length) return
      this.upload_file = this.upload_file
      this.upload_files()
    },
    upload_files() {
      const body = new FormData();
      for (let i of this.upload_file) {
        body.append("files", i);
      }
      this.$store.dispatch('upload_project_file', body).then((res) => {
        this.get_project_file_list()
      })
    },
    get_project_file_list() {
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
    check_project_file() {
      if (this.count >= 10) {
        setTimeout(() => {
          let body = {project_id : this.project_id}
          this.$store.dispatch('get_project_file_list', body).then((res) => {
            if (res.files[0].status == 'FS06') {
              this.is_loading = false
              this.is_vector = true
            } else {
              this.check_project_file()
            }
          })
        }, "1000") 
      } else {
        this.check_count()
      }
    },
    check_count() {
      if (this.count < 10) {
        setTimeout(() => {
          this.count += 1
          this.check_count()
        }, "1000")
      } else {
        this.check_project_file()
      }
    },
    onDragLeave(){
    },
    onDragOver(){
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
.file-upload {
  font-size: 14px;
  text-align: center;
}
.file-upload img{
  width: 40px;
  object-fit: contain;
}
</style>