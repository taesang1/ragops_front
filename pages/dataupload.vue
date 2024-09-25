<template>
  <div style="width: max-content;">
    <loadproject :dialog="dialog" v-model="dialog"/>
    <p class="main-title">데이터 전처리 > <span class="main-sub-title">데이터 업로드</span></p>

    <div style="display: flex; padding-left: 16px; margin-bottom: 24px;">
      <button @click="dialog = true" class="load-project">
        <img class="add-icon" src="@/assets/add.png">
        프로젝트 불러오기
      </button>
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
      <a href="/dataprogress" style="margin-left: auto;">
        <button class="next-button">
          <a>전처리 실행</a>
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
        <div class="box" style="min-height: 300px;">
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="server_file_list"
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

        <div class="box">
          <div class="file-upload"
            @dragover.prevent="onDragOver"
            @dragleave="onDragLeave"       
            @drop="onDrop"
            @click="triggerZipFileInput">
            <img src="@/assets/file_upload.png">
            <p style="padding: 8px 0px;">Drag your file here, of Click here to browse</p>
          </div>
          <input @change="upload_files" type="file" id="upload_file" accept=".pdf, .hwp" style="display:none;">
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
            {
              name : '예금업무방법 제1권',
              file : 'pdf'
            }
          ],
        },
      ],
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
    this.$store.dispatch('get_server_file_base_list', body).then((res) => {
      console.log(res)
    })
    body = {project_id : this.project_id, path: 'test'}
    this.$store.dispatch('get_server_file_list', body).then((res) => {
      let file = {}
      file['name'] = res.files[0].file_name
      file['file'] = res.files[0].file_type
      this.server_file_list[1]['children'].push(file)
      this.file_nos[file['name']] = res.files[0].file_no
    })
  },
  methods: {
    onDrop(e) {
      const files = e.dataTransfer.files
      if (files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf' || file.name.split('.')[1] === 'hwp') {
          this.upload_file = files[0];
        } else {
          alert(".pdf 또는 .hwp 파일을 선택해주세요.")
        }
        e.preventDefault();
        e.stopPropagation();
      }
    },
    triggerZipFileInput(){
      document.querySelector('#upload_file').click()
    },
    upload_files(e) {
      this.upload_file = e
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