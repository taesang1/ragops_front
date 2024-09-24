<template>
  <div>
    <p class="main-title">데이터업로드</p>

    <div class="box-grid">

      <div class="box">
        <p class="box-title">서버 파일 시스템 검색</p>
        <v-treeview
          v-model="tree"
          :open="initiallyOpen"
          :items="items"
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

      <div>
        <div class="box" style="min-height: 400px;">
          <p class="box-title">작업 목록 리스트</p>
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
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
          <div class="file_upload"
            @dragover.prevent="onDragOver"
            @dragleave="onDragLeave"       
            @drop="onDrop"
            @click="triggerZipFileInput">
            <img src="@/assets/file_upload.png">
            <p style="padding: 8px 0px;">드래그 앤 드롭으로 파일 업로드</p>
            <p style="color: gray;">(HWP, PDF)</p>
          </div>
          <input type="file" id="zipFile" accept=".pdf, .hwp" style="display:none;">
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zipFileInput : null,
      zipFile : null,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
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
    onDrop(e) {
      const files = e.dataTransfer.files
      console.log(files)
      if (files.length > 0) {
        const file = files[0];
        if (file.type === 'application/pdf' || file.name.split('.')[1] === 'hwp') {
          this.zipFile = files[0];
        } else {
          alert(".pdf 또는 .hwp 파일을 선택해주세요.")
        }
        e.preventDefault();
        e.stopPropagation();
      }
    },
    triggerZipFileInput(){
      document.querySelector('#zipFile').click()
    },
    onDragLeave(){

    },
    onDragOver(){
      
    }
  }
}
</script>
<style>
.file_upload {
  border: 1px solid rgba(224, 232, 255, 1);
  font-size: 14px;
  text-align: center;
  padding: 12px;
}
.file_upload img{
  width: 54px;
  object-fit: contain;
}
</style>