<template>
  <div>
    <p class="main-title">Playground</p>
    <div class="box">
      <div id="target">
        <div v-show="is_doc_type == ''" style="width: 30vw; margin-left: auto;"></div>
        <div v-show="is_doc_type != ''" class="doc_html" style="width: 30vw; margin-left: auto; overflow: hidden; border: 1px solid #dddddd;">
          <h2 style="border-bottom: 1px solid #dddddd; margin: 0; padding: 20px;">참고 문서</h2>
          <div v-show="is_doc_type == 'doc'" class="content"></div>
          <iframe v-show="is_doc_type == 'url'" :src="doc_url" type="application/pdf"
            style="height: 100%; width: 600px;">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import INTELLISYS_CHATBOT_CREATE_CLASS from '@/static/chatbot.js'

export default {
  data () {
    return {
      is_doc_type : '',
      doc_url : ''
    }
  },
  mounted() {
    this.chatbot = INTELLISYS_CHATBOT_CREATE_CLASS
    this.chatbot.init()
  },
}
</script>
<style>
#target{
  height: 90%;
  display: flex;
}
</style>