<template>
  <div>
    <p class="main-title">시뮬레이션</p>

    <div class="box-grid">
      <div class="box" style="min-height: 643px;">
        <p class="box-title">청킹 옵션</p>
        <div class="option-box" v-for="option in [overlap, recursive, semantic]" :key="option.text">
          <label class="check-box-label">
            <input type="checkbox" v-model="option.value" class="check-box">
            <p class="option-title">{{ option.text }}</p>
          </label>
          <template v-for="key in Object.keys(option)">
            <div :key="key" v-if="key != 'text' && key !='value'" class="option">
              <p>{{ key }}</p>
              <span>Min</span>
              <input v-model="option[key]['min']" type="text" class="text-field"/>
              <span>Max</span>
              <input v-model="option[key]['max']" type="text" class="text-field"/>
              <span>Step</span>
              <input v-model="option[key]['step']" type="text" class="text-field"/>
            </div>
          </template>
        </div>
      </div>

      <div>
        <div class="box">
          <p class="box-title">옵션 조합 정책</p>
          <div class="option-box" v-for="option in Object.keys(smp_1)" :key="option">
            <label class="check-box-label">
              <input type="radio" name="smp1" :value="option" v-model="smp_1[option]['value']" class="check-box">
              <p class="option-title">{{ smp_1[option]['text'] }}</p>
              <hr style="width: 100px; margin: auto 12px; border: 1px solid rgba(197, 197, 197, 1)">
              <p>개 조합</p>
            </label>
          </div>
        </div>

        <div class="box">
          <p class="box-title">임베딩 모델</p>
          <div class="option-box" v-for="option in Object.keys(model)" :key="option">
            <label class="check-box-label">
              <input type="radio" :value="option" v-model="model[option]['value']" class="check-box">
              <p class="option-title">{{ model[option]['text'] }}</p>
            </label>
          </div>
        </div>

        <div class="box">
          <p class="box-title">Augmentation 옵션</p>
          <div class="option-box" v-for="option in Object.keys(augmentation)" :key="option">
            <label class="check-box-label">
              <input type="radio" :value="option" v-model="augmentation[option]['value']" class="check-box">
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
          <button class="prev-button">< 뒤로</button>
          <button class="nuxt-button">시뮬레이션 실행</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      },
      smp_1 : {
        1 : {value : 1, text : '최고 성능'},
        2 : {value : false, text : '중간'},
        3 : {value : false, text : '최소 조합'},
      },
      model : {
        1 : {value : 1, text : '모델 1'},
        2 : {value : 2, text : '모델 2'},
      },
      augmentation : {
        no_augmentation : {text : 'No augmentation', value : 'no_augmentation'},
        chunk_window : {text: 'Chunk window', value: 'chunk_window', size: 3}
      }
    }
  },
}
</script>
<style>
.check-box-label {
  margin-top: 36px;
  display: flex;
}
.check-box {
  width: 18px;
  margin-right: 12px;
}
</style>