<template>
  <div>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">결과 확인</span></p>

    <div class="content">
      <div style="display: flex;margin-bottom: 24px;">
        <project/>
        <button class="next-button" style="margin-left: auto;">
          <a>백터DB 저장</a>
          <img class="arrow-right" src="@/assets/arrow_right.png">
        </button>
      </div>

      <div class="box-grid">
        <div>
          <div class="sub-title">작업목록</div>
            <div class="box" style="min-height: 450px; max-height: 450px; overflow-y: auto; max-width: 25vw;">
              <div @click="test(i.name)" :id="i.type" v-for="i in server_file_list" :key="i" class="server_file">{{ i.name }}</div>
          </div>
        </div>

        <div>
          <div class="sub-title">원본파일</div>
          <div class="box" style="min-height: 450px; max-width: 25vw; max-height: 24vw; overflow: auto;">
            <div id="preview_file">

            </div>
            <!-- <iframe style="width: 100%; height: 400px;" v-if="view" :src="file_src" type="application/pdf">

            </iframe> -->
          </div>
        </div>

        <div>
          <div class="sub-title">청킹 결과</div>
          <div class="box" style="min-height: 450px; max-height: 450px; overflow-y: auto; padding: 0; max-width: 25vw;">
            <p id="chunking" v-show="chunking">
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import * as XLSX from "xlsx"
import project from '@/components/project.vue';

export default {
  components : { project },
  data () {
    return {
      view: false,
      chunking : null,
      file_src : null,
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
      this.file = e
      this.set_doc()
    },
    gridExcelToWeb(file, target) {
      var reader = new FileReader();
      reader.onload = function (evt) {
          if (evt.target.readyState == FileReader.DONE) {
              var data = evt.target.result;
              data = new Uint8Array(data);
              var workbook = XLSX.read(data, { type: 'array' });
              var sheetName = '';
              workbook.SheetNames.forEach( function(data, idx){
                  if(idx == 0){
                      sheetName = data;
                  }
              });
              var toHtml = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName], { header: '' });
              target.innerHTML = toHtml;
          }
      };
      reader.readAsArrayBuffer(file);
    },
    set_doc() {
      let body = {project_id : this.project_id, file_no : this.file_nos[this.file]}
      this.view = true
      this.$store.dispatch('get_file', body).then((res) => {
        this.gridExcelToWeb(res, document.querySelector('#preview_file'))
          // console.log()
      })
      // this.file_src = 'http://is-web.intellisys.co.kr:58580/files/pdf/예금업무방법(제3권 상품)(20240401)_일부개정.pdf?view=FitH&toolbar=0'
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