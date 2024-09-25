<template>
  <div>
    <p class="main-title">데이터 전처리 > <span class="main-sub-title">진행현황</span></p>

    <div style="display: flex;margin-bottom: 24px;">
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 1</div>
      <a href="/ragai" style="margin-left: auto;">
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
        <div class="box" style="min-height: 465px;">
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
      </div>

      <div style="width: 100%;">
        <div class="sub-title">
          원본파일
        </div>
        <div class="box" style="min-height: 465px;">
          <iframe style="width: 100%; height: 400px;" v-if="view" :src="file_data[file].src" type="application/pdf">
          </iframe>
        </div>
      </div>

      <div style="width: 100%;">
        <div class="sub-title">
          추출결과
        </div>
        <div class="box" style="min-height: 200px;">
          <p v-if="view">
            샘플
          </p>
        </div>

        <div class="sub-title">
          파싱결과
        </div>
        <div class="box" style="min-height: 200px;">
          <p v-if="view">
            샘플
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
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_data : {
        'pdf1' :{src : 'https://cdn.intellisys-saas.co.kr/pdf/sample_1.pdf?view=FitH&toolbar=0'},
        'pdf2' :{src : 'https://cdn.intellisys-saas.co.kr/pdf/sample_2.pdf?view=FitH&toolbar=0'}
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
