<template>
  <v-dialog content-class="simulate-opt" @keydown.esc="close" @click:outside="close" v-model="dialog">
    <v-card style="padding: 24px !important; background-color: rgba(241, 244, 250, 1); height: 100%;">
      <p class="main-title" style="margin-top: 0px;">설정 옵션</p>
      <div v-if="Object.keys(simulate_opt).length > 0" class="box" style="margin-left: 0; margin-top: 0px; margin-bottom: 0px; padding: 12px 24px;">
        <div class="option-box">
          <p class="box-title">청킹 옵션 : <span style="color: rgba(96, 92, 255, 1);">{{ simulate_opt['chuncking'][1] }}</span></p>
          <div v-if="simulate_opt['chuncking'][1] != 'SEMANTIC'" class="option">
            <div style="display: flex; width: 100%;">
              <p style="width: 70px;">Chunk Size</p>
              <input style="color: rgba(96, 92, 255, 1);" :value="simulate_opt['chuncking'][0]" type="text" class="text-field"/>
            </div>
          </div>
          <div v-else class="option">
            <div style="display: flex; width: 100%;">
              <p style="width: 70px;">threshold</p>
              <input style="color: rgba(96, 92, 255, 1);" :value="simulate_opt['chuncking'][0]" type="text" class="text-field"/>
            </div>
          </div>
        </div>

        <div class="option-box">
          <p class="box-title">임베딩 모델 : <span style="color: rgba(96, 92, 255, 1);">{{ simulate_opt['model'] }}</span></p>
          <div class="option" style="opacity: 0;">
            <div style="display: flex; width: 100%;">
              <p style="width: 70px;">Chunk Size</p>
              <input readonly value="500" type="text" class="text-field"/>
            </div>
          </div>
        </div>

        <div class="option-box">
          <p class="box-title">AUGMENT : 
            <template v-if="simulate_opt['augmentation'][0] != null">
              <span v-if="simulate_opt['augmentation'][0].includes('Chunk')" style="color: rgba(96, 92, 255, 1);">Chunk window Window size: {{ simulate_opt['augmentation'][1] }}</span>
            </template>
            <span v-else style="color: rgba(96, 92, 255, 1);">{{ simulate_opt['augmentation'][1] }}</span>
          </p>
          <div class="option" style="opacity: 0;">
            <div style="display: flex; width: 100%;">
              <p style="width: 70px;">Chunk Size</p>
              <input readonly value="500" type="text" class="text-field"/>
            </div>
          </div>
        </div>

        <div class="option-box">
          <p class="box-title">top_k : <span style="color: rgba(96, 92, 255, 1);">{{ simulate_opt['top_k'][0] }}</span>
          </p>
        </div>
        
      </div>

      <div v-else style="height: 248px; text-align: center; align-content: center; font-size: 22px;">설정한 옵션이 없습니다</div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="rgba(160, 157, 255, 1)"
          @click="close"
        >
        <span style="color: white;">닫기</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>  
export default {
  emits: ['input'],
  data () {
    return {
      simulate_opt_text : {
        MD01:'모델 1',
        MD02:'모델 2',
        aug_noaug_use: 'No augmentation',
        aug_chwin_use: "Chunk window",
        char_use: 'OVERLAP',
        recu_use: "RECURSIVE",
        sema_use: 'SEMANTIC'
      },
      simulate_opt : {}
    }
  },
  props: {
    dialog : false,
    option : {}
  },
  watch: {
    option() {
      if (this.option == null) {
        this.simulate_opt = {}
        return
      }
      let simulate_opt = {augmentation : [], top_k:[], chuncking: [], model: ''}
      for (let i of Object.keys(this.option)) {
        console.log(i, this.option)
        if (i == 'model_name') {
          console.log('adad')
          simulate_opt['model'] = this.simulate_opt_text[this.option[i]]
        } else if (i.includes('aug')) {
          let data = this.option[i]
          if (i.includes('use')) data = this.simulate_opt_text[this.option[i]]
          simulate_opt['augmentation'].push(data)
        } else if (i.includes('chunk')) {
          let data = this.option[i]
          if (i.includes('use')) data = this.simulate_opt_text[this.option[i]]
          simulate_opt['chuncking'].push(data)
        } else {
          let data = this.option[i]
          simulate_opt['top_k'].push(data)
        }
      }
      this.simulate_opt = simulate_opt
    }
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
.v-dialog.simulate-opt{
  width: 500px;
  margin: auto;
  right: 0;
  bottom: 0;
  height: 450px;
}
</style>