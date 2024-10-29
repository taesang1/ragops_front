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
        {'text' : 'passage', value: `(고객) 모든 수술에 보험금을 다 받을수있나요?
(상담사) 하시는 수술에대한 해당약관을 보셔야합니다.
(고객) 어떤 약관을 봐야하는거죠?
(상담사) 가입하신 보험에 약관을 확인하시면됩니다.
(고객) 약관에 해당되면 보험금을 받을수 있는건가요?
(상담사) 네.맞습니다
(고객) 재해수술특약도 보험금을 받을 수 있을까요?
(상담사) 재해수술특약은 안되시는걸로 알고있습니다.
(고객) 그럼 약관에 따라 지급된다는 말인가요?
(상담사) 네.
`},
        {'text' : 'key_sentence', value: `재해수술특약은 안되시는걸로 알고있습니다.`},
        {'text' : 'question', value: `재해수술특약도 보험금을 받을 수 있을까요?`}
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
      let body = {samples : []}
      let oj = {}
      for (let i of this.query_input) {
        oj[i.text] = i.value
      }
      body.samples.push(oj)
      this.is_query_loading = true
      this.$store.dispatch('create_query', body).then((res) => {
        this.get_query()
      })
    },
    get_query() {
      this.$store.dispatch('get_query').then((res) => {
        if (res['status']['msg'] != 'done') { 
          setTimeout(() => {
            this.get_query()
          }, 1000);
        }
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
  max-height: 510px;
  overflow: auto;
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