<template>
  <v-app>
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
    <div class='main'>
      <div class="navigation">
        <div style="width: max-content; margin: 0 auto;">
          <h2 class="logo-title" >RagBuilder</h2>
        </div>
        <div class="page-list">
          <div :style="`${i['style']}`" :id="path.includes(i.link) || path.includes(i.text) ? 'activate' : ''" :key="i.name" v-for="i in page_list" class="page">
            <a v-if="i.link != null" :href="i.link">{{ i.name }}</a>
            <a v-else>{{ i.name }}</a>
          </div>
        </div>
        <img class="logo" src="@/assets/logo.png">        
      </div>
      <div style="position: relative; width: 100%;">
        <client-only>
          <nuxt style="height: calc(100% - 115px); padding: 0px 36px;"/>
        </client-only>
        <v-footer style="align-items: baseline; margin-left: 50px; background-color: transparent">
          <p style="font-size: 16px; color: rgba(155, 155, 155, 1);">Intellisys  ⓒ 2023 IntelliSys All Rights Reserved.</p>&nbsp;&nbsp;
          <p style="font-size: 14px; color: rgba(11, 11, 11, 1);">(주)인텔리시스  ㅣ 대표이사 : 박은영 ㅣ 서울 관악구 관악로 1, 138동 111 -  113 호 (신림동, 서울대학교) <br>
            사업자등록번호 329-81-00803  ㅣ 문의: 02-6959-8676  contact@intellisys.co.kr</p>
          </v-footer>
      </div>
    </div>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      page_list : [
        {name: '프로젝트 목록', link: '/project'},
        {name: '데이터 전처리', link: null,  text: 'data'},
        {name: '데이터 업로드', link: '/dataupload', style : 'margin-left : 24px'},
        {name: '진행현황', link: '/dataprogress', style : 'margin-left : 24px'},
        {name: '벡터DB 생성', link: null, text: 'vector'},
        {name: 'AI 자동최적화', link: '/vectorai', style : 'margin-left : 24px'},
        {name: '파라미터 수동 설정', link: '/vectorhuman', style : 'margin-left : 24px'},
        {name: '결과확인', link: '/vectordb', style : 'margin-left : 24px'}
      ],
      path : '/'
    }
  },
  mounted() {
    this.path = window.location.pathname
  },
}
</script>
<style>
* {
  font-family: 'Pretendard' !important  
}
p {
  margin-bottom: 0px !important;
  line-height: 1.5;
}
.main {
  display: flex;
  height: 100%;
  overflow: auto;
}
.logo-title {
  color: white;
  text-align: right;;
  margin-top: 24px;
  font-size: 24px;
}
.logo {
  width: 50%;
  object-fit: contain;
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  margin: auto;
}
.navigation {
  position: relative;
  min-width: 284px;
  height: 100%;
  background: rgba(57, 57, 75, 1)
}
.page-list {
  padding: 0px 50px;
  margin-top: 50px;
}
.page {
  color: gray;
  display: flex;
  padding: 12px 0px
}
#activate a{
  color: rgba(98, 84, 255, 1);
}
.page_icon {
  width: 26px;
  object-fit: contain;
  margin-left: 6px;
}
.page a {
  font-size: 18px;
  text-decoration-line : none;
  color: rgb(224, 224, 224);;
}
.next-button a {
  text-decoration-line : none;
  color: white;
  font-size: 16px;
  min-width: max-content
}
.main-title {
  font-size: 20px;
  padding: 24px 16px;
  text-align: left;
  font-weight: 700;
  margin-top: 40px;
}
.main-sub-title {
  font-size: 16px;
  font-weight: 500
}
.sub-title {
  color: white;
  background-color: rgba(57, 57, 75, 1);
  width: 200px;
  padding: 6px 24px;
  border-radius: 12px;
  margin-left: 16px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0px 5px 6px #a7a3a3;
  min-width: max-content
}
.box-grid {
  display: flex;
}
.box {
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 24px;
  margin: 16px;
  min-width: 390px;
}
.box-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px !important;
}
.button-box {
  text-align: right;
  margin-bottom: 24px;
}
.next-button, .prev-button{
  padding: 12px 24px;
  margin: 0 12px;
  border-radius: 12px;
  font-size: 16px;
}
.next-button {
  display: flex;
  background-color: rgba(96, 92, 255, 1);
  color : white;
  border-radius: 24px;
}
.prev-button {
  background-color: rgba(226, 233, 255, 1);
}
.arrow-right {
  width: 24px;
  margin-left: 12px;
  object-fit: contain;
}
.project-name {
  background-color: rgba(224, 224, 224, 1);
  padding: 6px;
  height: max-content;
  width: max-content;
  font-size: 12px;
  border-radius: 8px;
}
.load-project {
  display: flex;
  padding: 6px 30px;
  background-color: rgba(160, 157, 255, 1);
  color: white;
  font-size: 14px;
  height: max-content;
  border-radius: 12px;
  margin: auto 0;
}
.add-icon {
  width: 16px;
  object-fit: contain;
  margin: auto 8px auto 0px
}
table {
  font-size: 12px;
}
thead {
  table-layout: fixed;
  margin-bottom: 24px;
}
th {
  padding: 0px 36px;
  padding-bottom: 24px;
}
td {
  padding: 12px 0px;
  text-align: center;
  border-bottom: 1px solid rgba(224, 232, 255, 1);
}
.table-button {
  background-color: rgba(101, 139, 255, 1);
  padding: 6px 16px;
  border-radius: 24px;
  color: white;
}
.option {
  display: flex;
  margin: 12px 30px;
}
.option p {
  width: 100px;
}
.option .text-field {
  width: 45px;
  background-color: rgba(231, 235, 244, 1);
  border-radius: 6px;
  margin: 0px 12px;
  font-size: 12px;
  text-align: center;
}
.option .text-field:focus {
  outline: none;
}
.search-field {
  width: 100%;
  background-color: rgba(224, 224, 224, 1);
  padding: 6px;
}
.option-box {
  font-size: 12px;
}
.option-title {
  font-weight: 700;
}
.check-box-label {
  display: flex;
  /* margin-top: 36px; */
}
.check-box {
  margin-right: 12px;
  width: 18px;
}
.loading {
  width: 24px;
  object-fit: contain;
}
.server_file {
  padding: 6px 12px;
  margin-bottom: 12px;
}
#pdf {
  border: 1px solid red;
}
#hwp {
  border: 1px solid blue
}
</style>
