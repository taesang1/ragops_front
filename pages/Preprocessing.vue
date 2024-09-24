<template>
  <div>
    <p class="main-title">전처리</p>

    <div class="box-grid">
      <div class="box" style="min-width: 350px;">
        <p class="box-title">데이터 업로드</p>
        <v-treeview
          v-model="tree"
          :open="initiallyOpen"
          :items="items"
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

      <div class="box" style="min-width: 350px;">
        <p class="box-title">원본파일</p>
        <iframe style="width: 100%; height: 90%;" v-if="view" :src="file_link[file]" type="application/pdf">

        </iframe>
      </div>

      <div class="box" style="min-width: 350px;">
        <p class="box-title">추출 결과</p>
        <p v-if="view">
          샘플
        </p>
      </div>

      <div class="box" style="min-width: 350px;">
        <p class="box-title">파싱 결과</p>
        <p v-if="view">
          샘플
        </p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      view: false,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_link : {
        'pdf1' :'https://cdn.intellisys-saas.co.kr/pdf/sample_1.pdf?view=FitH&toolbar=0',
        'pdf2' :'https://cdn.intellisys-saas.co.kr/pdf/sample_2.pdf?view=FitH&toolbar=0'
      },
      items: [
        {
          name: 'folder1',
        },
        {
          name: 'folder2',
          children: [
            {
              name: 'pdf1',
              file: 'pdf',
            },
            {
              name: 'pdf2',
              file: 'pdf',
            },
            {
              name: 'hwp1',
              file: 'word',
            },
          ],
        },
      ]
    }
  },
  methods: {
    test(e) {
      if (e.length > 0) {
        this.view = false
        this.file = e[0]
        if (e[0].includes('pdf')) {
          this.view = true
        }
      }
    }
  }
}
</script>
