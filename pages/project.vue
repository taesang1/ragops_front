<template>
  <div style="width: max-content;">
    <p class="main-title">프로젝트 생성</p>
    <div style="width: max-content; margin-left: auto;">
      <a href="/dataupload">
        <button style="margin-bottom: 50px;" class="next-button">
        <a>프로젝트 생성</a>
        <img class="arrow-right" src="@/assets/arrow_right.png"></button>
      </a>
    </div>

    <div class="sub-title">
      프로젝트 목록
    </div>
    <div class="box">
      <table>
        <thead>
          <tr>
            <th>프로젝트</th>
            <th>생성 시작 시간</th>
            <th>상태</th>
            <th>옵션</th>
            <th>청킹 결과</th>
            <th>생성 완료 시각</th>
            <th>데이터 갱신</th>
            <th>테스트</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2024-09-23 12:00</td>
            <td>생성완료</td>
            <td><a>보기</a></td>
            <td><a>보기</a></td>
            <td>2024-09-23 12:12</td>
            <td><button class="table-button">데이터 갱신</button></td>
            <td><button @click="test" class="table-button">테스트</button></td>
          </tr>
        </tbody>
      </table>
    </div>
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