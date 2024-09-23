<template>
  <v-app>
    <div v-if="path.includes('login')">
      <h2 class='logo' >RAGOps</h2>
      <Nuxt />
    </div>
    <div v-else class='main'>
      <div class="navigation">
        <h2 class="logo" >RAGOps</h2>
        <div class="page-list">
          <div :key="i.name" v-for="i in page_list" class="page">
            <a :href="i.link">{{ i.name }}</a>
            <img v-if="path.includes(i.link)" src="@/assets/page_icon.png" class="page_icon">
          </div>
        </div>
      </div>
      <Nuxt style="width: 100%;"/>
    </div>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      page_list : [
        {name: '전처리', link: '/Preprocessing'},
        {name: '시뮬레이션', link: '/Simulation'},
        {name: '결과', link: '/Result'},
        {name: 'DB목록', link: '/Dblist'}       
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
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'SF_HailSnow';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_HailSnow.woff') format('woff');
    font-weight: 400;
    font-style: normal;
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
  text-align: center;
  font-family: 'Pretendard-Regular' !important;
  margin-top: 24px;
  font-size: 24px;
}
.navigation {
  width: 284px;
  height: 100%;
  background: var(--Light-blue, rgba(242, 245, 249, 1));
}
.page-list {
  font-family: 'SF_HailSnow' !important;
  padding: 0px 50px;
  margin-top: 150px;
}
.page {
  display: flex;
  padding: 12px 0px
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
  font-family: 'SF_HailSnow' !important;
  font-size: 18px;
  padding: 24px 40px;
  margin-left: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  font-weight: 700;
}
.box-grid {
  display: flex;
}
.box {
  border-radius: 12px;
  border: 1px solid rgba(224, 232, 255, 1);
  padding: 24px;
  margin: 16px;
  min-width: 460px;
}
.box-title {
  font-family: 'SF_HailSnow' !important;
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
  font-family: 'Pretendard-Regular' !important;
}
.nuxt-button {
  background-color: rgba(101, 139, 255, 1);
}
.prev-button {
  background-color: rgba(226, 233, 255, 1);
}
table {
  font-size: 12px;
  font-family: 'Pretendard-Regular'
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
</style>
