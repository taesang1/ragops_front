<template>
  <v-dialog fullscreen @keydown.esc="close" @click:outside="close" width="550" v-model="dialog">
    <v-card style="padding: 24px !important">
      <p class="main-title" style="margin-top: 0px;">벡터 DB 생성 > <span class="main-sub-title">AI 자동 최적화</span> > <span class="main-sub-title">AI 질의 생성</span></p>

      <div style="display: flex; margin-bottom: 24px;">
        <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
          <button @click="close" class="query-button" style="background-color: rgba(160, 157, 255, 1); margin-left: auto;">취소</button>
          <button @click="close" class="query-button" style="background-color: rgba(58, 54, 219, 1); margin-left: 24px;">저장</button>
      </div>

      <div class="box-grid">
        <div class="box" style="width: 40%;">
          <div class="sub-title" style="margin-left: 0">데이터 설정</div>
          <span class="query-sub-title">쿼리 생성에 이용할 작업목록 데이터의 비율을 입력해 주세요</span>
          <label class="query-option-box" for="inputName">활용 비율 설정
            <input style="width: 45px; margin-left: 12px; height: 30px; text-align: left; padding: 6px;" placeholder="5%" id="inputName" type="text">
          </label>

          <div style="display: flex; margin-top: 50px;">
            <div>
              <div class="sub-title" style="margin-left: 0">데이터 설정</div>
              <span class="query-sub-title">AI가 참고할 쿼리의 예시를 입력해주세요</span>
            </div>
            <button class="create-query" style="margin-left: auto;">자동 생성</button>
          </div>


          <div v-for="i in query_input" :key="i" class="query-option-box">
            <p style="width: 100px;">{{ i.text }}</p>
            <input style="width: 100%; margin : 6px 0px 24px 0px; height: 30px; text-align: left; padding: 6px;" v-model="i.value" placeholder="Placeholder" type="text">
          </div>
        </div>

        <div class="box" style="width: 60%;">

        </div>
        
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  emits: ['input'],
  data () {
    return {
      query_input: [
        {'text' : '문단', value: ''},
        {'text' : '핵심 문장', value: ''},
        {'text' : '질문 예시', value: ''}
      ]
    }
  },
  props: {
    dialog : false
  },
  methods: {
    close() {
      this.$emit('input',false)
    },
  },
  mounted() {
  }
}
</script>
<style>
.query-button {
  color : white;
  padding: 12px 60px;
  border-radius: 12px;
}
.query-sub-title{
  color : rgba(80, 72, 176, 1);
  font-size: 12px;
  margin-bottom: 12px;
  margin-top: 6px;
  display: block;
}
.query-option-box{
  font-size: 16px;
  font-weight: 700;
}
.query-option-box input{
  font-size: 14px;
}
.query-option-box input:focus {
  outline: none;
}
.query-option-box input {
  border-radius: 6px;
  border: 0.5px solid rgba(102, 112, 133, 1);
  margin: 0px 12px;
  font-size: 12px;
  text-align: center;
}
.create-query {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  font-size : 12px;
  color : white;
  background-color: rgba(71, 66, 253, 1);
}
</style>