<template>
  <div>
    <p class="main-title">프로젝트 목록</p>
    <div class="box">
      <table>
        <thead>
          <tr>
            <th>프로젝트</th>
            <th>생성 시작 시간</th>
            <th>생성 완료 시각</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>프로젝트 1</td>
            <td>2024-09-23 12:00</td>
            <td>2024-09-23 12:12</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button style="float: right;" class="nuxt-button">프로젝트 추가 ></button>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      window.location.href = '/test'
    }
  }
}
</script>