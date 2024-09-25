<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">AI 자동 최적화</span></p>

    <div class="project-name" style="margin-left: 16px;">#프로젝트 {{ project_id }}</div>

    <div class="box-grid">
      <div style="width: 57%; padding: 24px; margin: 16px;">
        <div style="display: flex;">
          <div class="sub-title" style="margin-left: 0px;  height: max-content; margin-bottom: 24px;">테스트 쿼리 입력</div>
          <button @click="simulate_run" class="next-button" style="margin-left: auto; height: max-content;">
            <a>AI 분석 실행</a>
            <img class="arrow-right" src="@/assets/arrow_right.png">
          </button>
        </div>
        <div style="display: flex;">
          <button style="padding: 8px 24px; color: white; font-size: 14px; background-color: rgba(255, 105, 180, 1)">AI 쿼리</button>
          <button style="margin-left: 12px; padding: 8px 24px; color: black; font-size: 14px; background-color: #e0e0e0">직접입력</button>
        </div>

        <div class="sub-title" style="margin: 48px 0 24px 0px;">알고리즘 선택</div>
          <div class="option-box" style="display: flex; margin-bottom: 12px">
          <label v-for="option in Object.keys(expected)" :key="option" class="check-box-label" style="width: 100%; font-size: 14px;">
            <input style="margin-bottom: 18px;" @click="check(expected, option)" type="checkbox" name="smp1_popup" v-model="expected[option]['value']" class="check-box">
            <div>
              <p class="option-title">{{ expected[option]['text'] }}</p>
              <p style="font-size: 11px;">수행예정시간 : {{ expected[option]['sub'] }}</p>
            </div>
          </label>
        </div>
  
        <div class="sub-title" style="margin: 48px 0 24px 0px;">범위 설정</div>
        <div style="display: flex;">
          <div class="box" style="margin-left: 0;">
            <p class="box-title">청킹 옵션 설정</p>
            <div class="option-box" v-for="option in Object.keys(chuncking)" :key="option.text">
              <label class="check-box-label">
                <input name="chuncking_popup" type="checkbox" v-model="chuncking[option].value" class="check-box">
                <p class="option-title">{{ chuncking[option].text }}</p>
              </label>
              <template v-for="key in Object.keys(chuncking[option])">
                <div :key="key" v-if="key != 'text' && key !='value' && key != 'param'" class="option">
                  <p>{{ key }}</p>
                  <span>Min</span>
                  <input v-model="chuncking[option][key]['min']" type="text" class="text-field"/>
                  <span>Max</span>
                  <input v-model="chuncking[option][key]['max']" type="text" class="text-field"/>
                  <span>Step</span>
                  <input v-model="chuncking[option][key]['step']" type="text" class="text-field"/>
                </div>
              </template>
            </div>
          </div>

          <div style="margin-left: auto;">
            <div class="box" style="min-width: 300px">
              <p class="box-title">임베딩 모델 선택</p>
              <div class="option-box" v-for="option in Object.keys(model)" :key="option">
                <label class="check-box-label" style="margin-bottom: 12px;">
                  <input type="checkbox" name="model_popup" v-model="model[option]['value']" class="check-box">
                  <p class="option-title">{{ model[option]['text'] }}</p>
                </label>
              </div>
            </div>

            <div class="box" style="min-width: 300px">
              <p class="box-title">Augmentation 옵션</p>
              <div class="option-box" v-for="option in Object.keys(augmentation)" :key="option">
                <label class="check-box-label" style="margin-bottom: 12px;">
                  <input type="checkbox" name="augmentation_popup" v-model="augmentation[option]['value']" class="check-box">
                  <p class="option-title">{{ augmentation[option]['text'] }}</p>
                </label>
                <div v-if="option == 'chunk_window'" class="option">
                  <p style="width: max-content;">
                    Max window size
                  </p>
                  <input v-model="augmentation[option]['size']" type="text" class="text-field"/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-show="is_chart" style="width: 40%; padding: 24px; margin: 16px;">
        <div style="display: flex;">
          <div class="sub-title" style="margin-left: 0px; margin-bottom: 24px; height: max-content;">추천 파라미터</div>
          <a style="width: max-content; margin: 0px 0px 12px auto; display: block;">
            <button class="next-button">
              <a>벡터DB 생성하기</a>
              <img class="arrow-right" src="@/assets/arrow_right.png">
            </button>
          </a>
        </div>
        <div class="box" style="margin-left: 0; margin-top: 0px; margin-bottom: 0px; padding: 12px 24px;">
          <div class="option-box">
            <p class="box-title">청킹 옵션 : <span style="color: rgba(96, 92, 255, 1);">Recursive</span></p>
            <div class="option">
              <div style="display: flex; width: 100%;">
                <p style="width: 70px;">Chunk Size</p>
                <input style="color: rgba(96, 92, 255, 1);" value="500" type="text" class="text-field"/>
              </div>
              <div style="display: flex; width: 100%;">
                <p style="width: 70px;">Overlap Size</p>
                <input style="color: rgba(96, 92, 255, 1);" value="100" type="text" class="text-field"/>
              </div>
            </div>
          </div>

          <div class="option-box">
            <p class="box-title">임베딩 모델 : <span style="color: rgba(96, 92, 255, 1);">모델1</span></p>
            <div class="option" style="opacity: 0;">
              <div style="display: flex; width: 100%;">
                <p style="width: 70px;">Chunk Size</p>
                <input readonly value="500" type="text" class="text-field"/>
              </div>
            </div>
          </div>

          <div class="option-box">
            <p class="box-title">AUGMENT : Chunk window Window size: 3</p>
          </div>
          
        </div>

        <div class="sub-title" style="margin: 40px 0px 40px">성능 비교</div>
        <div class="box" style="margin-left: 0;">
          <canvas id="chart"></canvas>
          
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chuncking : {
        overlap : {
          value : true,
          param : 'char',
          text : 'OVERLAP',
          chunk_size : {text : 'Chunk Size', min : 300, max : 500, step: 100},
          overlap_size : {text: 'Overlap Size', min : 50, max : 100, step: 50},
        },
        recursive : {
          value : true,
          param : 'recu',
          text : 'RECURSIVE',
          chunk_size : {text : 'Chunk Size', min : 300, max : 500, step: 100},
          overlap_size : {text: 'Overlap Size', min : 50, max : 100, step: 50},
        },
        semantic : {
          value : true,
          param : 'smea',
          text : 'SEMANTIC',
          threshold : {text: 'Threshold' ,min : 40, max : 90, step: 10}
        }
      },
      expected : {
        CP01 : {value : true, text : 'Full Search', sub :'10분'},
        CP02 : {value : false, text : 'Adaptive Alg.', sub :'5분'},
        CP03 : {value : false, text : 'Greedy Alg.', sub :'1분'},
      },
      model : {
        MO01 : {value : true, text : '모델 1'},
        MD02 : {value : true, text : '모델 2'},
      },
      augmentation : {
        no_augmentation : {text : 'No augmentation', value : true, param : 'aug_noaug_use'},
        chunk_window : {text: 'Chunk window', value: true, size: 3, param : 'aug_chwin_use'}
      },
      is_chart : false
    }
  },
  mounted() {
    this.simulate_expected_time()
  },
  methods: {
    simulate_expected_time() {
      let body = this.make_body()
      this.$store.dispatch('simulate_expected_time', body).then((res) => {
        for (let i of Object.keys(res['expected'])) {
          this.expected[i]['sub'] = `${res['expected'][i]['duration_min']}분`
        }
      })
    },
    simulate_run() {
      let body = this.make_body()
      for (let i of Object.keys(this.expected)) {
        if (this.expected[i].value) {
          body['combi_policy'] = i
          break
        }
      }
      this.$store.dispatch('simulate_run', body).then((res) => {
        this.get_simulate_result(body)
      })
    },
    get_simulate_result(body) {
      setTimeout(() => {
        this.$store.dispatch('get_simulate_result', body).then((res) => {
          if (res['sims'][0] != 'done') {
            this.get_simulate_result(body)
          } else {
            this.set_chart()
          }
        })
      }, "1000")
    },
    make_body() {
      let body = {project_id : this.project_id}
      for (let i of Object.keys(this.chuncking)) {
        if (this.chuncking[i].value) {
          body[`${this.chuncking[i]['param']}_use`] = 'Y'
          if (this.chuncking[i]['param'] != 'smea') {
            let chunk_size = this.chuncking[i]['chunk_size']
            let overlap_size = this.chuncking[i]['overlap_size']
            body[`${this.chuncking[i]['param']}_opt`] = 
              `${chunk_size['min']},${chunk_size['max']},${chunk_size['step']},${overlap_size['min']},${overlap_size['max']},${overlap_size['step']}`
          } else {
            let threshold = this.chuncking[i]['threshold']
            body[`${this.chuncking[i]['param']}_opt`] = `${threshold['min']},${threshold['max']},${threshold['step']}`
          }
        }
      }
      for (let i of Object.keys(this.model)) {
        let model = ''
        if (this.model[i].value) {
          if (model == '') {
            model += i
          } else {
            model += ',' + i
          }
        }
        body['emb_model'] = model
      }

      for (let i of Object.keys(this.augmentation)) {
        if (this.augmentation[i].value) {
          body[this.augmentation[i]['param']] = 'Y'
          if (this.augmentation[i]['param'] == 'aug_chwin_use') {
            body['aug_chwin_opt'] = this.augmentation[i].size
          }
        }
      }
      return body
    },
    check(e, ch) {
      for (var i of Object.keys(e)) {
        if (i != ch) {
          e[i].value = false
        }
      }
    },
    set_chart() {
      if (this.is_chart) return
      var ctx = document.querySelector('#chart')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3'],
          datasets: [{
            data: [0.781231, 0.740987, 0.7098],
            borderWidth: 1,
            backgroundColor: '#FF7DA8',
            maxBarThickness: 30
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              min: 0,
              max: 1,
            }
          }
        }
      });
      this.is_chart = true
    }
  },
  computed: {
    project_id() {
      return this.$store.state.project_id
    }
  }
}
</script>