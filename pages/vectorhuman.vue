<template>
  <div>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">파라미터 수동 설정</span></p>  

    <div class="project-name" style="margin-left: 16px; margin-bottom: 24px;">#프로젝트 1</div>

    <div style="border: 1px solid rgba(228, 228, 228, 1); padding: 24px 0px;">
      <div style="width: max-content; margin-left: auto; margin-bottom: 24px;">
        <a href="/vectordb" style="margin-left: auto;">
          <button class="next-button">
            <a>백터DB 생성</a>
            <img class="arrow-right" src="@/assets/arrow_right.png">
          </button>
        </a>
      </div>
      <div class="box-grid">

        <div>
          <div class="sub-title">청킹옵션 설정</div>
          <div class="box">
            <div class="option-box" v-for="option in [overlap, recursive, semantic]" :key="option.text">
              <label class="check-box-label">
                <input type="radio" :value="option.text" name="chuncking" v-model="option.text" class="check-box">
                <p class="option-title">{{ option.text }}</p>
              </label>
              <template v-for="key in Object.keys(option)">
                <div :key="key" v-if="key != 'text' && key !='value'" class="option">
                  <p>{{ key }}</p>
                  <input v-model="option[key]['min']" type="text" class="text-field"/>
                </div>
              </template>
            </div>
          </div>
        </div>

        <div>
          <div class="sub-title">임베딩모델 선택</div>
          <div class="box">
            <div class="option-box" v-for="option in Object.keys(model)" :key="option">
              <label class="check-box-label" style="margin-bottom: 16px;">
                <input type="radio" name="model" :value="option" v-model="model[option]['value']" class="check-box">
                <p class="option-title">{{ model[option]['text'] }}</p>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div class="sub-title">Augmentation 옵션 설정</div>
          <div class="box">
            <div class="option-box" v-for="option in Object.keys(augmentation)" :key="option">
              <label class="check-box-label" style="margin-bottom: 16px;">
                <input type="radio" name="augmentation" :value="option" v-model="augmentation[option]['value']" class="check-box">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog : false,
      overlap : {
        value : true,
        text : 'OVERLAP',
        chunk_size : {text : 'Chunk Size', min : '', max : '', step: ''},
        overlap_size : {text: 'Overlap Size', min : '', max : '', step: ''},
      },
      recursive : {
        value : false,
        text : 'RECURSIVE',
        chunk_size : {text : 'Chunk Size', min : '', max : '', step: ''},
        overlap_size : {text: 'Overlap Size', min : '', max : '', step: ''},
      },
      semantic : {
        value : false,
        text : 'SEMANTIC',
        threshold : {text: 'Threshold' ,min : '', max : '', step: ''}
      },
      model : {
        1 : {value : 1, text : '모델 1'},
        2 : {value : 2, text : '모델 2'},
      },
      augmentation : {
        no_augmentation : {text : 'No augmentation', value : 'no_augmentation'},
        chunk_window : {text: 'Chunk window', value: 'chunk_window', size: ''}
      }
    }
  },
}
</script>