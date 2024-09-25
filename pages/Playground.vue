<template>
  <div>
    <p class="main-title">Playground</p>
    <div class="box">
      <div id="target"></div>
    </div>
  </div>
</template>
<script>
import INTELLISYS_CHATBOT_CREATE_CLASS from '@/static/chatbot_46102.js'

export default {
  mounted() {
    this.chatbot = INTELLISYS_CHATBOT_CREATE_CLASS
    this.chatbot.init()
  },
}
</script>