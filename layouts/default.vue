<template>
  <v-app>
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
    <div class='main'>
      <div class="navigation">
        <div style="width: max-content; margin: 0 auto;">
          <h2 class="logo-title" >RagBuilder</h2>
        </div>
        <div class="page-list">
          <div style="border-bottom: 1px solid burlywood;" v-for="key in Object.keys(page_list)" :key="key">
            <div class="page-type" @click="check_page_type(key)">
              {{ key }}
            </div>

            <template v-for="i in page_list[key]">
              <div :style="`${i['style']}`" :id="path.includes(i.link) || path.includes(i.text) ? 'activate' : ''"  v-if="check_page[key]" :key="i.name" class="page">
                <a v-if="i.link != null" :href="i.link">{{ i.name }}</a>
                <a v-else>{{ i.name }}</a>
              </div>
            </template>
          </div>
        </div>
        <img class="logo" src="@/assets/logo.png">        
      </div>
      <div style="position: relative; width: 100%; background-color: rgba(241, 244, 250, 0.5);">
        <client-only>
          <nuxt style="height: calc(100% - 115px); margin: 0px 36px;"/>
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
      page_list : {
        Online :  [
          {name: 'RAG 목록', link: '/project'},
          {name: '백터DB 생성', link: null,},
          {name: '데이터 전처리', style : 'margin-left : 12px',  text: 'data'},
          {name: '데이터 업로드', link: '/dataupload', style : 'margin-left : 24px'},
          {name: '결과 확인', link: '/dataprogress', style : 'margin-left : 24px'},
          {name: '옵션 설정', link: null, style : 'margin-left : 12px', text: 'vector'},
          {name: 'AI 자동최적화', link: '/vectorai', style : 'margin-left : 24px'},
          {name: '파라미터 수동 설정', link: '/vectorhuman', style : 'margin-left : 24px'},
          {name: '결과 확인', link: '/result', style : 'margin-left : 12px'},
          {name: '배포', link: null, style : 'margin-left : 12px'}],
        Offline : [
          {name: '검색설정', link: null, style : 'color: gray'},
        ]
      },
      path : '/',
      check_page : {
        Online: true,
        Offline : false,
      }
    }
  },
  methods: {
    check_page_type(key) {
      this.check_page[key] = !this.check_page[key]
    }
  },
  mounted() {
    if (window.location.pathname == '/') return
    let project_id = JSON.parse(localStorage.getItem('check_project'))
    if (project_id == null) {
      if (!window.location.pathname.includes('project')) {
        alert('프로젝트를 선택해주세요')
        window.location.href = '/project'
      }
    } else {
      this.$store.commit('check_project_id', project_id)  
    }
    this.$store.dispatch('get_project_list')
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
.content {
  background-color: white;
  padding-top: 24px;
  margin-bottom: 12px;
  box-shadow: 0px 4px 4px #a7a3a3;
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
  bottom: 18px;
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
  padding: 0px 25px;
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
.page-type {
  font-size: 24px;
  text-decoration-line : none;
  cursor: pointer;
  color: rgb(233, 184, 184) !important;
}
.page a {
  font-size: 18px;
  text-decoration-line : none;
  color: rgb(224, 224, 224);
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
  width: max-content;
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
  overflow: hidden;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
}
.doc {
  background-color: rgba(241, 244, 250, 0.5);
  margin-bottom: 12px;
  padding: 24px;
}
.project-box {
  position: relative;
}
.project-name {
  background-color: rgba(224, 224, 224, 1);
  padding: 6px;
  height: max-content;
  width: max-content;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
}
.project-list{
  cursor: pointer;
  max-height: 100px;
  overflow: auto;
  position: absolute;
  width: 100px;
  left: 12px;
  border: 1px solid black;
  background-color: white;
}
.project-list::-webkit-scrollbar {
  width: 5px;  
}
.project-list p:hover {
  background-color: rgba(224, 224, 224, 1)
}
.project-list::-webkit-scrollbar-thumb {
  background: #b2adad;
  border-radius: 10px;
}
.project-list::-webkit-scrollbar-track {
  background: rgba(220, 20, 60, .1);
}
</style>
