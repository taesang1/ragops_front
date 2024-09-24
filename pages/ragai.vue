<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <p class="main-title">AI 자동최적화</p>

    <div class="box-grid">
      <div>
        <div class="box">
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
      </div>

      <div>
        <div class="box">
          <p class="box-title">임베딩 모델 선택</p>
          <div class="option-box" v-for="option in Object.keys(model)" :key="option">
            <label class="check-box-label">
              <input type="checkbox" name="model_popup" v-model="model[option]['value']" class="check-box">
              <p class="option-title">{{ model[option]['text'] }}</p>
            </label>
          </div>
        </div>

        <div class="box">
          <p class="box-title">Augmentation 옵션</p>
          <div class="option-box" v-for="option in Object.keys(augmentation)" :key="option">
            <label class="check-box-label">
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

      <div v-show="is_chart">
        <div class="box">
          <p class="box-title">시뮬레이션 결과 HR 그래프</p>
          <canvas id="chart"></canvas>
        </div>
        
        <div class="box">
          <p class="box-title">최적의 옵션</p>
          
          <div class="option-box">
            <p>청킹 옵션 : Recursive</p>
            <div class="option">
              <p>Chunk Size</p>
              <input value="500" type="text" class="text-field"/>
              <p>Overlap Size</p>
              <input value="100" type="text" class="text-field"/>
            </div>
          </div>

          <div class="option-box">
            <p>임베딩 모델 : 모델1</p>
          </div>

          <div class="option-box" style="padding: 24px 0px;">
            <p>AUGMENT : Chunk window Window size: 3</p>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <p class="box-title">실행모델</p>
      <div class="option-box" style="display: flex;">
        <label v-for="option in Object.keys(smp_1)" :key="option" class="check-box-label" style="margin: 0 12px;">
          <input @click="check(smp_1, option)" type="checkbox" name="smp1_popup" v-model="smp_1[option]['value']" class="check-box">
          <p style="margin: auto !important;" class="option-title">{{ smp_1[option]['text'] }}</p>
          <hr style="width: 100px; margin: auto 12px; border: 1px solid rgba(197, 197, 197, 1)">
          <p style="margin: auto !important;">{{ smp_1[option]['sub'] }}</p>
        </label>
        <button @click="set_chart" class="nuxt-button">시뮬레이션 실행</button>
        <button v-if="is_chart" class="nuxt-button">옵션 적용</button>
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
          value : false,
          text : 'RECURSIVE',
          chunk_size : {text : 'Chunk Size', min : 300, max : 500, step: 100},
          overlap_size : {text: 'Overlap Size', min : 50, max : 100, step: 50},
        },
        semantic : {
          value : false,
          text : 'SEMANTIC',
          threshold : {text: 'Threshold' ,min : 40, max : 90, step: 10}
        }
      },
      smp_1 : {
        1 : {value : false, text : 'greedy algorithm', sub :'420개 조합'},
        2 : {value : false, text : 'AI 최적화', sub :'280개 조합'},
        3 : {value : true, text : '빠른 최적화', sub :'84개 조합'},
      },
      model : {
        1 : {value : false, text : '모델 1'},
        2 : {value : true, text : '모델 2'},
      },
      augmentation : {
        no_augmentation : {text : 'No augmentation', value : false},
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