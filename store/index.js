export const state = () => ({
  session_id: 'hallym',
  is_default : true,
  sample : {},
  gen_type : null,
  uuid : null,
  user_info : [{record: ["입원기록지", "뇌졸중입원기록지", "응급센터진료기록2.0", "외래기록지", "간호기록지", "응급간호기록지", "검사결과", "검사소견"], text : "1일차"}],
  patient_id : null,
  gen : {soap: {}, docs: {}},
  is_gen_count : {},
  time: {
    'end' : {},
    'start' : {},
    'req' : {}
  },
  datas : [],
  user_id: ''
})

export const mutations = {
  set_session_id(state, data) {
    state.session_id = data
  },
  set_user_id(state, data) {
    state.user_id = data
  },
  update_gen_count(state, data) {
    let oj = Object.assign({}, state.is_gen_count)
    if (state.is_gen_count[data['day']] == null) {
      oj[data['day']] = []
      state.is_gen_count = oj
    } 
    if (state.is_gen_count[data['day']].indexOf(data['target']) == -1) {
      oj[data['day']].push(data['target'])
      state.is_gen_count = oj
    }
  },
  set_user_info(state, data) {
    state.is_default = false
    state.uuid = data['uuid']
    state.user_info = data['day']
    state.patient_id = data['patient_id']
    state.gen_type = 'gen'
    state.sample = {}
    state.gen = {soap: {}, docs: {}}
    state.time ={
      'end' : {},
      'start' : {},
      'req' : {}
    }
    state.is_gen_count = {}
    state.datas = data['tg_dates']
  },
  set_sample(state, data) {
    state.user_info = data['user_info']['day']
    state.patient_id = data['user_info']['id']
    state.gen_type = 'sample'
    state.sample.soap = data['soap']
    state.sample.docs = data['docs']
    state.gen = {soap: {}, docs: {}}
  },
  set_soap(state, data) {
    if (state.gen_type == 'sample') {
      state.gen.soap = state.sample.soap
      state.gen.docs = state.sample.docs
    } else {
      let soap = {}
      soap[data['day']] = Object.assign({}, state.gen.soap[data['day']], data['text'][data['day']])
      state.gen.soap = Object.assign({}, state.gen.soap, soap)
      
      if (data['docs'] != null) {
        let docs = {}
        docs[data['day']] = Object.assign({}, state.gen.docs[data['day']], data['docs'][data['day']])
        state.gen.docs = Object.assign({}, state.gen.docs, docs)
      }
    }
  },
  check_req_time(state, data) {
    if (state.time['req'][data['day']] == null) state.time['req'][data['day']] = {}
    state.time['req'][data['day']][data['type']] = 
      state.time['end'][data['day']][data['type']] - state.time['start'][data['day']][data['type']]
    // if (data['type'] != 'S') {
    //   state.time['req'][data['day']][data['type']] += state.time['req'][data['day']]['S']
    // }
  },
  check_time(state, data) {
    if (state.time['start'][data['day']] == null) state.time['start'][data['day']] = {}
    if (state.time['end'][data['day']] == null) state.time['end'][data['day']] = {}
    state.time[data['key']][data['day']][data['type']] = Date.now() / 1000
  }
}

export const actions = {
  upload_file( {state, commit}, file ) {
    const body = new FormData();
    body.append("excelFile", file);
    return this.$axios.post(`data?session_id=${state.session_id}`, body)
    .then((res) => {
      commit('set_user_info',res.data)
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  get_sample( {state, commit}, num) {
    const body = {sample_num : num * 1}
    return this.$axios.post(`sample`, body)
    .then((res) => {
      commit('set_sample',res.data)
      commit('set_soap',res.data)
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  revise_record( {state, commit}, day) {
    const body = {
      session_id : state.session_id,
      uid : state.uuid,
      record : state.gen.soap[day],
      tg_dates : state.datas,
      day : day.replaceAll('일차','')
    }
    return this.$axios.post(`revise_record`, body)
    .then((res) => {
      alert('저장되었습니다.')
    })
    .catch((res) => {
      alert('예상치 못한 에러가 발생했습니다. 잠시후 다시 시도해주세요.')
    })
  },
  req_generate( {state, commit, dispatch}, data ) {
    let body = {
      uuid : state.uuid,
      target : data.target,
      session_id : state.session_id,
      day : data.day,
      tg_dates : state.datas
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST','http://is-gpu.intellisys.co.kr:65522/generate');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      if (this.readyState >= 3 && this.status == 200) {
        if (state.time['end'][data.day][data.target] == null) {
          commit('check_time', {key:'end', type:data.target, day:data.day})
          commit('check_req_time', {type: data.target, day:data.day})
          if (data.target == 'S') {
            for (let type of ['P', 'A','O']) {
              let body = {
                target : type,
                day : data.day
              }
              dispatch('req_generate', body)
            }
          }
        }
        var res_text = this.responseText.split('}{')
        let content = ''
        let text = {}
        text[data['day']] = {}
        text[data['day']][data.target] = ''
        let docs = {}
        docs[data['day']] = {}
        docs[data['day']][data.target] = {}
        for (var i of res_text) {
          if (i[0] == '{' && i[i.length -1] !='}') {
            i = i + '}'
          } else if (i[0] != '{' && i[i.length -1] =='}') {
            i = '{' + i 
          } else if (i[0] != '{' && i[i.length -1] !='}'){
            i = '{' + i + '}'
          }
          
          if (i.includes('view_info')) {
            i = i.replaceAll('\n',"new_line")
          }
          content = JSON.parse(i)
          if (content['answer'] != null && content['answer'] != 'null') {
            text[data['day']][data.target] += content['answer']
          }
        }
        if (content['view_info'] != null) {
          for (let key of Object.keys(content['view_info'])) {
            content['view_info'][key] = content['view_info'][key].replaceAll("new_line", '\n')
          }
          docs[data['day']][data.target] = content['view_info']
        }
        content['text'] = text
        content['day'] = data.day
        content['type'] = data.target
        if (content['is_finished']) {
          commit('update_gen_count', {target :data.target, day : data.day})
          content['docs'] = docs
        }
        commit('set_soap',content)
      }
    }
    commit('check_time', {key:'start', type:data.target, day:data.day})
    xhr.send(JSON.stringify(body));
  },
}
