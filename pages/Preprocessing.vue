<template>
  <div>
    <p class="main-title">전처리</p>

    <div class="box-grid">
      <div class="box">
        <p class="box-title">데이터 업로드</p>
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
        <button class="nuxt-button" style="padding: 6px 36px; margin-top: 12px; float: right">업로드</button>
      </div>

      <div class="box">
        <table>
          <thead>
            <tr>
              <th>파일 이름</th>
              <th>종류</th>
              <th>파싱 방법</th>
              <th>상태</th>
              <th>결과보기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>창구초보자 실무가이드 STEP10_외국환</td>
              <td>pdf</td>
              <td>법령 문서</td>
              <td>파싱 대기중</td>
              <td>
                <div style="display: flex;">
                  <button class="table-button" style="margin-right: 12px;">추출 결과</button>
                  <button class="table-button">파싱 결과</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="nuxt-button" style="display: flex; float: right; margin-top: 24px;">
          <img src="@/assets/arrow_right.png" style="width: 22px; margin-right: 12px;">
          <span>시뮬레이션</span>
        </button>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      zipFileInput : null,
      zipFile : null
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
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  text-align: center;
  padding: 12px;
}
.file_upload img{
  width: 54px;
  object-fit: contain;
}
</style>