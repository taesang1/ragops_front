<template>
  <v-dialog persistent v-model="dialog" @click:outside="close">
    <v-card>
      <p class="main-title">시뮬레이션</p>

      <div class="box-grid">
        <div class="box" style="min-height: 643px;">
          <p class="box-title">청킹 옵션</p>
          <div class="option-box" v-for="option in Object.keys(chuncking)" :key="option.text">
            <label class="check-box-label">
              <input @click="check(chuncking, option)" name="chuncking_popup" type="checkbox" v-model="chuncking[option].value" class="check-box">
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

        <div>
          <div class="box">
            <p class="box-title">옵션 조합 정책</p>
            <div class="option-box" v-for="option in Object.keys(smp_1)" :key="option">
              <label class="check-box-label">
                <input @click="check(smp_1, option)" type="checkbox" name="smp1_popup" v-model="smp_1[option]['value']" class="check-box">
                <p class="option-title">{{ smp_1[option]['text'] }}</p>
                <hr style="width: 100px; margin: auto 12px; border: 1px solid rgba(197, 197, 197, 1)">
                <p> {{ smp_1[option]['sub'] }}</p>
              </label>
            </div>
          </div>

          <div class="box">
            <p class="box-title">임베딩 모델</p>
            <div class="option-box" v-for="option in Object.keys(model)" :key="option">
              <label class="check-box-label">
                <input @click="check(model, option)" type="checkbox" name="model_popup" v-model="model[option]['value']" class="check-box">
                <p class="option-title">{{ model[option]['text'] }}</p>
              </label>
            </div>
          </div>

          <div class="box">
            <p class="box-title">Augmentation 옵션</p>
            <div class="option-box" v-for="option in Object.keys(augmentation)" :key="option">
              <label class="check-box-label">
                <input @click="check(augmentation, option)" type="checkbox" name="augmentation_popup" v-model="augmentation[option]['value']" class="check-box">
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

          <div class="button-box">
            <button v-if="!is_chart" @click="close" class="prev-button">닫기</button>
            <button @click="set_chart" class="nuxt-button">시뮬레이션 실행</button>
          </div>
        </div>
      </div>

      <div v-show="is_chart" class="box-grid">
        <div class="box">
          <p class="box-title">시뮬레이션 결과 HR 그래프</p>
          <canvas id="chart"></canvas>
        </div>
        
        <div class="box">
          <p class="box-title">최적의 옵션</p>
          
          <div class="option-box">
            <p>청킹</p>
            <div class="option">
              <p>방법: Recursive</p>
            </div>
            <div class="option">
              <p>Chunk Size</p>
              <input value="500" type="text" class="text-field"/>
            </div>
            <div class="option">
              <p>Overlap Size</p>
              <input value="100" type="text" class="text-field"/>
            </div>
          </div>

          <div class="option-box">
            <p>AUGMENT</p>
            <div class="option">
              <p style="width: max-content;">방법: Chunk window</p>
            </div>
            <div class="option">
              <p>Window size: 3</p>
            </div>
          </div>
          

          <div class="button-box">
            <button v-if="is_chart" @click="close" class="prev-button">닫기</button>
            <button @click="close" class="nuxt-button">옵션 적용</button>
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
        1 : {value : false, text : '최고 성능', sub :'420개 조합'},
        2 : {value : false, text : '중간', sub :'280개 조합'},
        3 : {value : true, text : '최소 조합', sub :'84개 조합'},
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
  props: {
    dialog : false
  },
  methods: {
    check(e, ch) {
      console.log(e)
      for (var i of Object.keys(e)) {
        if (i != ch) {
          e[i].value = false
        }
      }
    },
    close() {
      this.$emit('input', false)
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