<template>
  <v-dialog content-class="aiquery" @keydown.esc="close" @click:outside="close" v-model="dialog">
    <v-card style="padding: 24px !important; background-color: rgba(241, 244, 250, 1);">
      <p class="main-title" style="margin-top: 0px;">벡터 DB 생성 > <span class="main-sub-title">AI 자동 최적화</span> > <span class="main-sub-title">AI 질의 생성</span></p>

      <div style="display: flex; margin-bottom: 24px;">
        <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 {{ project_id }}</div>
          <button @click="close" class="query-button" style="background-color: rgba(160, 157, 255, 1); margin-left: auto;">취소</button>
          <button @click="close" class="query-button" style="background-color: rgba(58, 54, 219, 1); margin-left: 24px;">저장</button>
      </div>

      <div class="box-grid">
        <div class="box" style="width: 40%; background-color: white">
          <div class="sub-title" style="margin-left: 0">데이터 설정</div>
          <span class="query-sub-title">쿼리 생성에 이용할 작업목록 데이터의 비율을 입력해 주세요</span>
          <label class="query-option-box" for="inputName">활용 비율 설정
            <input style="width: 45px; margin-left: 12px; height: 30px; text-align: left;" value="5" id="inputName" type="text">
          </label>

          <div style="display: flex; margin-top: 50px;">
            <div>
              <div class="sub-title" style="margin-left: 0">질의 생성  Prompt</div>
              <span class="query-sub-title">AI가 참고할 쿼리의 예시를 입력해주세요</span>
            </div>
            <button class="create-query" style="margin-left: auto;">자동 생성</button>
          </div>


          <div v-for="i in query_input" :key="i" class="query-option-box">
            <p style="width: 100px;">{{ query_input_text[i.text] }}</p>
            <input style="width: 100%; margin : 6px 0px 24px 0px;" v-model="i.value" placeholder="Placeholder" type="text">
          </div>

          <button v-if="!is_query_loading" @click="create_query" class="next-button" style="margin-left: auto; margin-right: 0; height: max-content;">
            <a>쿼리 생성</a>
            <img class="arrow-right" src="@/assets/arrow_right.png">
          </button>
          <button v-else class="next-button" style="margin-left: auto; margin-right: 0; height: max-content;">
            <img class="loading" src="@/assets/loading.gif">
          </button>
        </div>

        <div class="box" style="width: 60%; background-color: white">
          <div class="sub-title" style="margin-left: 0">추천 질의</div>
          <div v-for="row of query_list" :key="row.name" class="query-box query-option-box">
            <div>{{row.name}}</div>
            <input v-for="querie of row.queries" :key="querie" :value="querie" readonly>
          </div>
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
      is_query_loading : false,
      query_input_text : {
        'passage':'문단',
        'key_sentence':'핵심 문장',
        'question':'질문 예시'

      },
      query_input: [
        {'text' : 'passage', value: `예금업무방법(제3권 상품)
제1편 일반상품
제1장 입출금이자유로운예금
제1절 당좌예금
제1관 일반사항
제2조(거래대상자)
① 거래대상자는 아래의 거래실적을 충족한 법인 또는 개인사업자로 한다.<개정 2021.03.25.>
1. 당좌예금 개설신청일 현재 본인명의의 예금 또는 신탁 거래기간이 6개월 이상이고, 최근 6개월간의 예금 및 신탁 평균잔액 합계액이 1억원 이상인 자. 다만, 관련대출이 있는 예금계좌의 경우에는 대출금액 해당액을 거래실적에서 제외하고 산정한다.<개정 2021.03.25.>
2. 제1호의 거래실적은 다음의 기준에 따라 처리한다.<개정 2021.03.25.>
가. 거래실적은 당행 거래실적으로 한다.<개정 2021.03.25.>
나. 하나 이상의 계좌가 6개월 이상 거래가 있어야 하며, 6개월 미만 거래한 계좌는 6개월 평잔으로 환산하여 실적에 포함할 수 있다.<개정 2021.03.25>
다. 해지계좌도 대상기간 내에 실적이 있는 경우 합산할 수 있다.
`},
        {'text' : 'key_sentence', value: `① 거래대상자는 아래의 거래실적을 충족한 법인 또는 개인사업자로 한다.<개정 2021.03.25.>
1. 당좌예금 개설신청일 현재 본인명의의 예금 또는 신탁 거래기간이 6개월 이상이고, 최근 6개월간의 예금 및 신탁 평균잔액 합계액이 1억원 이상인 자.
`},
        {'text' : 'question', value: `입출금자유로운예금 개설 조건이 뭐야?`}
      ],
      query_list : []
    }
  },
  props: {
    dialog : false
  },
  watch: {
    dialog() {
      if (this.dialog) {
        document.querySelector('.v-application--wrap').style.display = 'none'
      }
    }
  },
  methods: {
    close() {
      document.querySelector('.v-application--wrap').style.display = 'block'
      this.$emit('input',false)
    },
    create_query() {
      // let body = {samples : {}}
      // for (let i of this.query_input) {
      //   body['samples'][i.text] = i.value
      // }
      // this.is_query_loading = true
      this.$store.dispatch('create_query').then((res) => {
        this.query_list = []
        for (let i of res['files']) {
          let query_list = {}
          query_list['name'] = i.name
          query_list['queries'] = []
          for (let j of i['queries']) {
            query_list['queries'].push(j.question)
          }
          this.query_list.push(query_list)
        }
        this.is_query_loading = false
      })
    }
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
.query-option-box input:focus {
  outline: none;
}
.query-option-box input {
  border: 0.5px solid rgba(102, 112, 133, 1);
  background-color: white;
  font-size: 14px;
  height: 34px;
  border-radius: 6px;
  margin: 0px 12px;
  font-size: 12px;
  padding: 6px;
}
.create-query {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  font-size : 12px;
  color : white;
  background-color: rgba(71, 66, 253, 1);
}
.v-dialog.aiquery{
  width: 80vw;
  margin: auto;
  right: 0;
  bottom: 0;
  height: 80vh;
}
.query-box {
  background-color: rgba(241, 244, 250, 0.5);
  padding: 12px;
  margin: 24px 0;
}
.query-box input {
  border: 0.5px solid rgba(102, 112, 133, 1);
  background-color: white;
  width: 100%;
  margin: 6px 0px 6px 12px;
  height: 34px;
  text-align: left;
  padding: 6px;
}
</style>