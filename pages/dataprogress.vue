<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/hwp.js@1.0.0/dist/hwp.js"></script>
    <p class="main-title">데이터 전처리 > <span class="main-sub-title">결과 확인</span></p>

    <div class="content">
      <div style="display: flex;margin-bottom: 24px;">
        <project/>
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
          <div class="box" style="min-height: 465px; max-width: 25vw; max-height: 24vw; overflow: auto;">
            <div v-html="htmlContent" ref="hwpContent" id="preview_file">

            </div>
            <!-- <iframe style="width: 100%; height: 400px;" v-if="view" :src="file_src" type="application/pdf">
            </iframe> -->
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
import * as XLSX from "xlsx"
import project from '@/components/project.vue';
// import { Viewer } from 'hwp.js';

export default {
  components : { project },
  data () {
    return {
      view: false,
      parsing : null,
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
      htmlContent : null,
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
    // hwp_viewer(file) {
    //   let new_file = new File([file], 'random')
    //   const reader = new FileReader();
    //   reader.onload = (result) => {
    //     const bstr = result.target?.result
    //     new Viewer(this.$refs.hwpContent, bstr)
    //   };
    //   reader.readAsBinaryString(new_file)
    // },
    renderHwpText(data) {
      this.$refs.hwpContent.innerHTML = data.text || '내용을 로드할 수 없습니다.';
    },
    test(e) {
      this.view = false
      this.parsing = null
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
      let type = this.file.split('.')[1]
      this.htmlContent = null
      if (type == 'hwp') {
        this.$store.dispatch('get_file_html', body).then((res) => {
          const reader = new FileReader();
            reader.onloadend = () => {
            this.htmlContent = reader.result;
          };
          reader.readAsText(res)
        })
      } else {
        this.$store.dispatch('get_file', body).then((res) => {
          switch (type) {
            case 'html':
              const reader = new FileReader();
              reader.onloadend = () => {
                this.htmlContent = reader.result;
              };
              reader.readAsText(res)
              break;
            case 'xlsx':
              this.gridExcelToWeb(res, document.querySelector('#preview_file'))
              break;
            }
        }) 
      }
        // this.file_src = 'http://is-web.intellisys.co.kr:58580/files/pdf/예금업무방법(제3권 상품)(20240401)_일부개정.pdf?view=FitH&toolbar=0'
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