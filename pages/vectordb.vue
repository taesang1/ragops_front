<template>
  <div>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">결과 확인</span></p>

    <div style="display: flex;margin-bottom: 24px;">
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 1</div>
      <button class="next-button">
        <a>백터DB 저장</a>
        <img class="arrow-right" src="@/assets/arrow_right.png">
      </button>
    </div>
    <!-- <v-progress-linear
      v-model="knowledge"
      :active="true"
      style="width: 100px; margin-left: 16px;"
      height="25"
    >
      <strong>24%</strong>
    </v-progress-linear> -->

    <div class="box-grid">
      <div>
        <div class="sub-title">작업목록</div>
          <div class="box" style="min-height: 450px;">
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

      <div>
        <div class="sub-title">원본파일</div>
        <div class="box" style="min-height: 450px;">
          <iframe style="width: 100%; height: 90%;" v-if="view" :src="file_data[file]['src']" type="application/pdf">

          </iframe>
        </div>
      </div>

      <div>
        <div class="sub-title">청킹 결과</div>
        <div class="box" style="min-height: 450px; overflow-y: scroll;">
          <p v-if="view">
            샘플
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import data from "../static/data.json"

export default {
  data () {
    return {
      knowledge : 22,
      view: false,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_data : {},
      items: [
        {
          name: 'folder1',
        },
        {
          name: 'folder2',
          children: [
            {
              name: '예금업무방법(제3권 상품)(20240401)_일부개정',
              file: 'pdf',
            }
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
  },
  mounted() {
    this.file_data = data
  }
}
</script>