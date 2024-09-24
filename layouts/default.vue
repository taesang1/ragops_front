<template>
  <v-app>
    <div class='main'>
      <script src="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"></script>
      <div class="navigation">
        <div style="width: max-content; margin: 0 auto;">
          <h2 class="logo" >Generation <br> Wons</h2>
        </div>
        <div class="page-list">
          <div :style="`${i['style']}`" :id="path.includes(i.link) || path.includes(i.text) ? 'activate' : ''" :key="i.name" v-for="i in page_list" class="page">
            <a v-if="i.link != null" :href="i.link">{{ i.name }}</a>
            <a v-else>{{ i.name }}</a>
          </div>
        </div>
      </div>
      <Nuxt style="width: 100%; padding: 0px 36px;"/>
    </div>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      page_list : [
        {name: '프로젝트 목록', link: '/project'},
        {name: '데이터업로드', link: '/dataupload'},
        {name: '전처리', link: '/Preprocessing'},
        {name: 'rag 설정', link: null, text: 'rag'},
        {name: 'AI 자동최적화', link: '/ragai', style : 'margin-left : 24px'},
        {name: '수동 설정', link: '/raghuman', style : 'margin-left : 24px'},
        {name: '벡터DB 생성', link: '/vectordb'},
        {name: 'DB관리', link: '/Dblist'}
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
  font-family: 'Pretendard'
}
p {
  margin-bottom: 0px !important;
  line-height: 1.5;
}
.main {
  display: flex;
  height: 100%;
}
.logo {
  color: white;
  text-align: right;;
  margin-top: 24px;
  font-size: 24px;
}
.navigation {
  width: 284px;
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
  color: black;
}
.main-title {
  color : rgba(80, 72, 176, 1);
  font-size: 18px;
  padding: 24px 16px;
  text-align: left;
  font-weight: 700;
  margin-top: 134px;
}
.box-grid {
  display: flex;
}
.box {
  border: 1px solid rgba(195, 194, 194, 1);
  padding: 24px;
  margin: 16px;
  min-width: 460px;
}
.box-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px !important;
}
.button-box {
  text-align: right;
  margin-bottom: 24px;
}
.nuxt-button, .prev-button{
  padding: 12px 24px;
  margin: 0 12px;
  border-radius: 12px;
  font-size: 16px;
}
.nuxt-button {
  background-color: rgba(96, 92, 255, 1);
  color : white;
  border-radius: 24px;
}
.prev-button {
  background-color: rgba(226, 233, 255, 1);
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
  margin: 24px 30px;
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
.option-box {
  font-size: 14px;
}
.option-title {
  font-weight: 700;
}
.check-box-label {
  display: flex;
  margin-top: 36px;
}
.check-box {
  margin-right: 12px;
  width: 18px;
}
</style>
