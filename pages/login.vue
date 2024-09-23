<template>
  <div class="login-box">
    <div style="text-align: center;" class="text-box">
      <p>Email</p>
      <v-text-field
        outlined
        label="이메일 주소를 입력해주세요"
        @keyup.enter="login"
        hide-details
        v-model="email">
      </v-text-field>
    </div>

    <div class="text-box">
      <p>password</p>
      <v-text-field
        outlined
        label="비밀번호를 입력해주세요"
        type='password'
        hide-details
        @keyup.enter="login"
        v-model="password">
      </v-text-field>
    </div>

    <div class="button-box">
      <button
        class="button"
        @click="login">
        회원가입
      </button>

      <button
        class="button"
        @click="login">
        로그인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email : '',
      password : ''
    }
  },
  methods: {
    login() {
      
    }
  }
}
</script>
<style>
.login-box {
  width: max-content;
  margin: auto;
  align-content: center;
}
.text-box {
  display: flex;
  padding: 12px 0px;
}
.text-box div {
  width: 400px;
}
.text-box p {
  width: 70px;
  align-content: center;
  margin-right: 24px;
  font-size: 14px;
}
.button-box {
  text-align: right;
  margin-top: 100px;
}
.button {
  background-color: rgba(101, 139, 255, 1);
  padding: 8px 36px;
  border-radius: 12px;
}
</style>