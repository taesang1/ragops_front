<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">AI 자동 최적화</span></p>

    <div class="project-name" style="margin-left: 16px;">#프로젝트 1</div>

    <div class="box-grid">
      <div style="width: 57%; padding: 24px; margin: 16px;">
        <div style="display: flex;">
          <div class="sub-title" style="margin-left: 0px;  height: max-content; margin-bottom: 24px;">테스트 쿼리 입력</div>
          <button @click="set_chart" class="next-button" style="margin-left: auto; height: max-content;">
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
          <label v-for="option in Object.keys(smp_1)" :key="option" class="check-box-label" style="width: 100%; font-size: 14px;">
            <input style="margin-bottom: 18px;" @click="check(smp_1, option)" type="checkbox" name="smp1_popup" v-model="smp_1[option]['value']" class="check-box">
            <div>
              <p class="option-title">{{ smp_1[option]['text'] }}</p>
              <p style="font-size: 11px;">수행예정시간 : {{ smp_1[option]['sub'] }}</p>
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
                <div :key="key" v-if="key != 'text' && key !='value'" class="option">
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
          <a href="/vectordb" style="width: max-content; margin: 0px 0px 12px auto; display: block;">
            <button @click="set_chart" class="next-button">
              <a>백터DB 생성하기</a>
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
          text : 'OVERLAP',
          chunk_size : {text : 'Chunk Size', min : 300, max : 500, step: 100},
          overlap_size : {text: 'Overlap Size', min : 50, max : 100, step: 50},
        },
        recursive : {
          value : true,
          text : 'RECURSIVE',
          chunk_size : {text : 'Chunk Size', min : 300, max : 500, step: 100},
          overlap_size : {text: 'Overlap Size', min : 50, max : 100, step: 50},
        },
        semantic : {
          value : true,
          text : 'SEMANTIC',
          threshold : {text: 'Threshold' ,min : 40, max : 90, step: 10}
        }
      },
      smp_1 : {
        1 : {value : true, text : 'Full Search', sub :'10분'},
        2 : {value : true, text : 'Adaptive Alg.', sub :'5분'},
        3 : {value : true, text : 'Greedy Alg.', sub :'1분'},
      },
      model : {
        1 : {value : true, text : '모델 1'},
        2 : {value : true, text : '모델 2'},
      },
      augmentation : {
        no_augmentation : {text : 'No augmentation', value : true},
        chunk_window : {text: 'Chunk window', value: true, size: 3}
      },
      is_chart : false
    }
  },
  methods: {
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
  }
}
</script>