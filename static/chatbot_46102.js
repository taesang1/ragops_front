class INTELLISYS_CHATBOT_CREATE_CLASS {
  init() {
    window.check_sku_cds = []
    this.is_chatbot_activate = false
    this.is_stop = false
    this.res_chat_timestamp = null
    this.current_query_id = null
    this.create_image_list = true
    this.bMove = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.language = 'KO'
    this.is_history = false
    this.welcome = {
      'KO': '안녕하세요.',
      'EN':'hello. How can I help you?',
      'JP': 'こんにちは。 何を助けますか？'
    }
    this.placeholder = {
      'question': {
        'KO' : '무역 관련 질문을 입력해주세요.',
        'EN' : 'Enter your trade-related question.',
        'JP' : '貿易に関する質問を入力してください。'
      },
      'category': {
        'KO' : '먼저 질문 카테고리를 선택해주세요.',
        'EN' : 'Select a question category first.',
        'JP' : 'まず質問カテゴリを選択してください。'
      },
      'answer': {
        'KO' : '답변을 생성하고 있습니다',
        'EN' : 'Generating an answer',
        'JP' : '答えを生成しています'
      },
    }
    this.error_msg = {
      'KO':'예상치 못한 에러가 발생했습니다. 다시 시도해 주십시오',
      'EN':'An unexpected error occurred. Please try again',
      'JP':'予期しないエラーが発生しました。 もう一度お試しください'
    }
    // this.help = `&#9679; 학습 출처: <a href='https://www.tradenavi.or.kr'>https://www.tradenavi.or.kr</a>
    // &#9679; 관련 문서: 무역규제
    // &nbsp; &nbsp; &#9726; 비관세조치, 기술장벽, 환경규제, 해외인증, 해외규격, 수입요건, 전략물자, 수출장벽 > 통관거부사례, 수출장벽 > 통상마찰사례, 수입규제, 지재권 관리카드

    // &#9679; 사용 예시: 일본에 의약품 판매할 때 절차를 알려줘`
    this.api_url = window.BACKEND_ADDRESS
    this.user_id_prefix = window.USER_ID_PREFIX
    this.minimum_size = 20;
    this.original_width = 0;
    this.original_height = 0;
    this.original_x = 0;
    this.original_y = 0;
    this.original_mouse_x = 0;
    this.original_mouse_y = 0;
    this.is_debug = false
    this.static_image = false
    this.get_params()
    this.create_chatbot()
  }

  create_element(tag) {
    let new_tag = document.createElement(tag)
    return new_tag
  }

  set_attrs(tag, key, val) {
    tag.setAttribute(key,val)
    return tag
  }

  set_style(tag, style) {
    tag.style = style
    return tag
  }

  set_innerhtml(tag, html) {
    tag.innerHTML = html
    return tag
  }
  // #intellisys_chatbot_icon {
  //   width: 200px; cursor: pointer; position: fixed;
  //   right: 0px; left: 0; margin: auto; bottom: 0; top: 0;  
  // }
  // #intellisys_chatbot {
  //   position: fixed; right : 50px; bottom : 100px; z-index: 100000;
  // }
  create_style() {
   let style = this.create_element('style')
   let overflow = 'hidden'
   if (/Mobi/i.test(window.navigator.userAgent) == true) {
    overflow = 'auto'
   }
   style = this.set_innerhtml(style, `
   #intellisys_chatbot_icon {
      cursor: pointer; position: fixed; margin: auto;
      left: 6%; bottom: 10%; width: 100px;
    }
    #intellisys_chatbot {
      width: max-content; border: 1px solid #EEEEEE; height: max-content;
    }
    #intellisys_chatbox_text_box {
      overflow-y: scroll; padding: 12px; height: 700px;
      z-index:10000; background-color: white; padding-bottom: 65px;
    }
    #intellisys_chatbox_text_box::-webkit-scrollbar {
      display : none;
    }
    #intellisys_chatbot_text_user, #intellisys_chatbot_text_assistant, #intellisys_chatbot_text_error {
      display: flex; margin: 12px 0px; 
    }
    #intellisys_chatbot_text_user > p{
      border-radius: 25px; padding: 12px; word-break:break-all; margin: 12px 0px; font-size: 13px;
      width: max-content; max-width: 100%; background-color: #F2F8FF; color: black;
      margin-left: auto; color: #006BE5; min-width: 45%; max-width: 65%;
    }
    #intellisys_chatbot_text_assistant > p{
      border-radius: 0px 24px 24px 24px; padding: 12px; word-break:break-all; background-color: #F2F4F5; margin: 0; font-size: 13px;
      min-width: 45%; max-width: 65%;
    }
    #intellisys_chatbot_text_error > p{
      border-radius: 0px 24px 24px 24px; padding: 12px; word-break:break-all; background-color: #F2F4F5; margin: 0; font-size: 13px;
      min-width: 45%; max-width: 65%;
    }
    #intellisys_chatbot_input_box {
      margin-top: 24px; position: absolute; left: 0px;
      width: calc(100% - 13px); bottom: 0px; background-color: white;
      padding: 6px; margin-left: 1px; z-index: 1000000
    }
    #intellisys_chatbot_input {
      word-break: break-all; display: block;
      width: 100%; max-height: 75px; min-height: 30px;
      overflow-y: scroll; resize: none; padding: 6px 18px; background-color: transparent;
      border: 1px solid gray; border-radius: 25px;
    }
    #intellisys_chatbot_input::-webkit-scrollbar {
      display: none;
    }
    
    #intellisys_chatbot_input::placeholder {
      text-align: center;
      line-height: 30px;
      font-size : 16px;
      color : #72777A;
    }
    #intellisys_chatbot_input_send {
      cursor: pointer; height: 44px; object-fit: contain; margin: auto; margin-left: 12px;
    }
    #intellisys_chatbot_box {
      position: relative; z-index: 100
    }
    #intellisys_chatbot_input_box > div > textarea:focus {
      outline: none;
    }
    .toggleSwitch {
      width: 22px;
      height: 12px;
      display: block;
      position: relative;
      border-radius: 30px;
      cursor: pointer;
      margin: 3px 12px;
      border: 1px solid #737373;
    }
    
    .toggleSwitch .toggleButton {
      width: 5px;
      height: 5px;
      position: absolute;
      top: 50%;
      left: 3px;
      transform: translateY(-50%);
      border-radius: 50%;
      background: #737373;
    }

    #toggle:checked ~ .toggleSwitch .toggleButton {
      left: calc(100% - 7px);
    }
    
    #language_ko, #language_jp {
      font-size: 12px
    }
    #intellisys_chatbot_image { width: 100%; overflow: ${overflow}; }
    #intellisys_chatbot_image > ul, li {
      list-style:none;
    }
    #intellisys_chatbot_image #intellisys_image_list { width: max-content; position:relative; margin:20px 0px; }
    #intellisys_chatbot_image #intellisys_image_list > ul > li {display:inline-block; -webkit-user-select: none;
      -khtml-user-select: none; -moz-user-select: none; 	-o-user-select: none; -ms-user-select: none; user-select: none; 
      border: 1px solid #cfcdcd; margin: 0 6px; cursor: pointer;}
    #intellisys_chatbot_image #intellisys_image_list > ul > li div {width: 100px; display:block; font-size:18px; color: #000;}
    #intellisys_chatbot_image #intellisys_image_list > ul {
      display: flex; padding-left: 0;
    }
    .top-left {
      left: 0px;
      top: 0px;
      width: 10px;
      height: 10px;
      position: absolute;
      cursor: nwse-resize; /*resizer cursor*/
    }
    `)
    return style
  }
  // .color_row:hover {
  //   background-color : #534BEE !important;
  // }
  get_params() {
    this.params = {}
    var searchParams = new URLSearchParams(location.search);
    for (var i of searchParams) {
      if (i[0] == 'debug') {
        this.is_debug = true
        continue
      }
      if (i[0] == 'static_image') {
        this.static_image = true
        continue
      }
      this.params[i[0]] = i[1]
    }
  }

  resize() {
    const width = INTELLISYS_CHATBOT_CREATE_CLASS_.original_width - (window.event.pageX - INTELLISYS_CHATBOT_CREATE_CLASS_.original_mouse_x)
    const height = INTELLISYS_CHATBOT_CREATE_CLASS_.original_height - (window.event.pageY - INTELLISYS_CHATBOT_CREATE_CLASS_.original_mouse_y)
    if (width > INTELLISYS_CHATBOT_CREATE_CLASS_.minimum_size && width >= 280 && width <= window.innerWidth - 100) {
      INTELLISYS_CHATBOT_CREATE_CLASS_.element.style.width = width + 'px'
    }
    if (height > INTELLISYS_CHATBOT_CREATE_CLASS_.minimum_size && height <= window.innerHeight - 250) {
      INTELLISYS_CHATBOT_CREATE_CLASS_.element.style.height = height + 'px'
    }
  }

  stopResize() {
    window.removeEventListener('mousemove', INTELLISYS_CHATBOT_CREATE_CLASS_.resize)
  }

  create_chatbot() {
    let chatbot = this.create_element('div')
    chatbot = this.set_attrs(chatbot, 'id','intellisys_chatbot')

    let resize_icon = this.create_element('img')
    resize_icon = this.set_attrs(resize_icon, 'class', 'top-left')
    resize_icon = this.set_attrs(resize_icon, 'src', '/resize_icon.png')
    resize_icon.onmousedown = function() {
      window.event.preventDefault()
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_width = parseFloat(getComputedStyle(INTELLISYS_CHATBOT_CREATE_CLASS_.element, null).getPropertyValue('width').replace('px', ''));
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_height = parseFloat(getComputedStyle(INTELLISYS_CHATBOT_CREATE_CLASS_.element, null).getPropertyValue('height').replace('px', ''));
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_x = INTELLISYS_CHATBOT_CREATE_CLASS_.element.getBoundingClientRect().left;
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_y = INTELLISYS_CHATBOT_CREATE_CLASS_.element.getBoundingClientRect().top;
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_mouse_x = window.event.pageX;
      INTELLISYS_CHATBOT_CREATE_CLASS_.original_mouse_y = window.event.pageY;
      window.addEventListener('mousemove', INTELLISYS_CHATBOT_CREATE_CLASS_.resize)
      window.addEventListener('mouseup', INTELLISYS_CHATBOT_CREATE_CLASS_.stopResize)
    }

    let popup = this.create_element('div')
    popup = this.set_style(popup, 'position: absolute; top: 15%; left: 50%; width: 300px; z-index: 11000; background-color: #DAC8FF; padding: 20px; display: none;')
    popup = this.set_attrs(popup,'id', 'popup')
    popup = this.set_innerhtml(popup, `
      <div id='rerank_scores'>
      </div>
    `)
    this.element = popup
    popup.appendChild(resize_icon)
    popup.onmousedown = function(event) {

      let shiftX = event.clientX - popup.getBoundingClientRect().left;
      let shiftY = event.clientY - popup.getBoundingClientRect().top;

      popup.style.position = 'absolute';
      popup.style.zIndex = 1000;
      document.body.append(popup);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        popup.style.left = pageX - shiftX + 'px';
        popup.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        popup.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        popup.hidden = false;

        if (!elemBelow) return;
      }

      document.addEventListener('mousemove', onMouseMove);

      popup.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        popup.onmouseup = null;
      };
    };

    let chatbot_box = this.create_element('div')
    chatbot_box = this.set_attrs(chatbot_box,'id','intellisys_chatbot_box')
    // chatbot_box.style.display = 'none'
    chatbot.appendChild(chatbot_box)

    let style = this.create_style()
    chatbot_box.prepend(style)

    let text_input = this.create_text_input()
    chatbot_box.appendChild(text_input)
    
    this.chatbot_text_box = this.create_element('div')
    this.chatbot_text_box = this.set_attrs(this.chatbot_text_box, 'id', 'intellisys_chatbox_text_box')
    // this.chatbot_text_box = this.set_style(this.chatbot_text_box, `width: ${window.innerWidth / 5}px; height : ${window.innerHeight/2}px`)
    // if (/Mobi/i.test(window.navigator.userAgent) == true) {
    //   this.chatbot_text_box = this.set_style(this.chatbot_text_box, `width: ${window.innerWidth / 1.1}px; height : ${window.innerHeight/1.2}px`)
    // } else {
    this.chatbot_text_box = this.set_style(this.chatbot_text_box, `width: 800px; height : calc(90vh - 66px)`)
    // }
    // this.element = this.chatbot_text_box
    // chatbot_box.appendChild(resize_icon)
    chatbot_box.appendChild(this.chatbot_text_box)

    this.create_chat_text('assistant', this.welcome[this.language],null,null,null,'intellisys_chatbot_welcome')
    // this.req_history()

    let chatbot_icon = this.create_chatbot_icon()
    chatbot_icon = this.set_attrs(chatbot_icon, 'id','intellisys_chatbot_icon')
    chatbot_icon.onclick = function () {
      INTELLISYS_CHATBOT_CREATE_CLASS_.click_chatbot_icon()
    }
    // let chatbot_title = this.create_chatbot_title()
    let body = document.querySelector('#target')
    // chatbot_box.prepend(chatbot_title)

    // let p = this.create_element('p')
    // p = this.set_innerhtml(p, '생성형 AI를 활용한 쇼핑 에이전트를 경험해 보세요')
    // p = this.set_style(p, `position: fixed; top: 0px; bottom: 293px; left: 0; right: 0; margin: auto;
    // width: max-content; font-size: 18px; height: max-content; font-weight: 700;`)
    // chatbot.appendChild(p)
    // chatbot.appendChild(chatbot_icon)

    if (this.is_debug) {
      body.appendChild(popup)
    }
    if (/Mobi/i.test(window.navigator.userAgent) == true) {
      body.appendChild(chatbot)
    } else {
      body.prepend(chatbot)
    }
    // this.text_input_readonly(null, 'history');
    let scroll_chatbox_text_box = document.querySelector('#intellisys_chatbox_text_box')
    if (scroll_chatbox_text_box == null) return
    scroll_chatbox_text_box.scrollTop = scroll_chatbox_text_box.scrollHeight
  }

  click_language() {
    let input = document.querySelector('#intellisys_chatbot_input')
    let welcome = document.querySelector('.intellisys_chatbot_welcome')
    let error = document.querySelectorAll('#intellisys_chatbot_text_error')    
    // intellisys_chatbot_text_error
    if (this.language == 'KO') {
      this.language = 'JP'
      document.querySelector('#language_jp').style = 'font-weight: 700;'
      document.querySelector('#language_ko').style = ''
    } else {
      this.language = 'KO'
      document.querySelector('#language_ko').style = 'font-weight: 700;'
      document.querySelector('#language_jp').style = ''
    }
    for (let i of error) {
      i.querySelector('p').innerHTML = this.error_msg[this.language]
    }

    let placeholder = ''
    if (input.getAttribute('readonly') == 'answer') {
      placeholder = this.placeholder['answer'][this.language]
    } 
    // else{
    //   placeholder = this.placeholder['question'][this.language]
    // }

    input.placeholder =  placeholder
    welcome = this.set_innerhtml(welcome, this.welcome[this.language])
  }

  create_chatbot_title() {
    let chatbot_title = this.create_element('div')
    chatbot_title = this.set_style(chatbot_title, 'display: flex; background-color: rgb(255,131,61 ); padding: 3px 5px; width: 100%;')

    let chatbot_title_text = this.create_element('p')
    chatbot_title_text = this.set_innerhtml(chatbot_title_text, `Ask AI`)
    chatbot_title_text = this.set_style(chatbot_title_text, `margin: auto 0; font-weight: 700; color: white; font-size: 20px;`)

    let chatbot_title_icon = this.create_element('img')
    chatbot_title_icon = this.set_attrs(chatbot_title_icon, 'src','/title_icon_v4.png')
    chatbot_title_icon = this.set_style(chatbot_title_icon, `width: 50px; object-fit: contain; margin-right: 12px;`)

    let reload_icon = this.create_element('img')
    reload_icon = this.set_attrs(reload_icon, 'src','/reload_icon_v2.png')
    reload_icon = this.set_style(reload_icon, 'width: 22px; object-fit: contain; margin-left: 12px; cursor: pointer;')
    reload_icon.onclick = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.req_clear()
    }

    chatbot_title.prepend(chatbot_title_icon)
    chatbot_title.appendChild(chatbot_title_text)
    chatbot_title.appendChild(reload_icon)

    let toggle = this.create_element('input')
    toggle = this.set_attrs(toggle, 'id','toggle')
    toggle = this.set_attrs(toggle, 'type','checkbox')
    toggle = this.set_attrs(toggle, 'hidden','')
    toggle.onclick = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.click_language()
    }

    let label = this.create_element('label')
    label = this.set_attrs(label, 'for','toggle')
    label = this.set_attrs(label, 'class','toggleSwitch')
    label = this.set_innerhtml(label,'<span class="toggleButton"></span>')

    let div = this.create_element('div')
    div = this.set_style(div, `display: flex; margin-left: auto;`)
    
    let language_ko = this.create_element('span')
    language_ko = this.set_attrs(language_ko,'id','language_ko')
    language_ko = this.set_innerhtml (language_ko, 'KO')
    language_ko = this.set_style(language_ko, 'font-weight: 700;')

    let language_jp = this.create_element('span')
    language_jp = this.set_attrs(language_jp,'id','language_jp')
    language_jp = this.set_innerhtml (language_jp, 'JP')

    // div.appendChild(language_ko)
    // div.appendChild(toggle)
    // div.appendChild(label)
    // div.appendChild(language_jp)
    chatbot_title.appendChild(div)

    return chatbot_title
  }

  create_chatbot_icon() {
    let chatbot_icon = this.create_element('img')
    chatbot_icon = this.set_attrs(chatbot_icon, 'src','/chat_icon.png')
    return chatbot_icon
  }

  chat_clear() {
    let div = document.querySelector('#intellisys_chatbox_text_box')
    div = this.set_innerhtml(div, '')
    this.create_chat_text('assistant', this.welcome[this.language],null,null,null,'intellisys_chatbot_welcome')
  }

  create_text_input() {
    let text_input_box = this.create_element('div')
    text_input_box = this.set_attrs(text_input_box, 'id','intellisys_chatbot_input_box')

    let div = this.create_element('div')
    div = this.set_style(div, `display: flex; height: max-content; margin: auto; padding: 6px;`)

    let text_input_send = this.create_element('img')
    text_input_send = this.set_attrs(text_input_send, 'id','intellisys_chatbot_input_send')
    text_input_send = this.set_attrs(text_input_send, 'src','/send.png')
    text_input_send.onclick = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_click()
    }

    let text_input = this.create_element('textarea')
    text_input = this.set_attrs(text_input, 'id','intellisys_chatbot_input')
    text_input = this.set_attrs(text_input, 'cols','30')
    text_input = this.set_attrs(text_input, 'rows','1')
    text_input = this.set_attrs(text_input, 'placeholder','Type a message...')
    // text_input = this.set_attrs(text_input,'readonly','answer')

    text_input.onkeypress = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_keypress ()
    }
    text_input.onkeyup = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_keyup()
    }

    div.appendChild(text_input)
    div.appendChild(text_input_send)
    text_input_box.appendChild(div)
    return text_input_box
  }

  text_input_readonly(tag, status) {
    let title = 'Type a message...'
    if (tag == null) {
      tag = document.querySelector('#intellisys_chatbot_input')
    }
    if (status == true) {
      title = '답변을 생성하고 있습니다.'
      tag = this.set_attrs(tag,'readonly','answer')
    } else if (status == 'history'){
      title = '채팅 내역을 가져오고 있습니다...'
      tag = this.set_attrs(tag,'readonly','answer')
    } else if (status == 'clear'){
      title = '채팅을 리셋하고 있습니다...'
      tag = this.set_attrs(tag,'readonly','answer')
    } else if (status == 'qa_history'){
      title = '선택 상품을 저장하고 있습니다...'
      tag = this.set_attrs(tag,'readonly','answer')
    } else if (status == 'rerank_scores'){
      title = 'rerank_scores를 가져오고 있습니다...'
      tag = this.set_attrs(tag,'readonly','answer')
    } else {
      tag.removeAttribute('readonly')
    }

    tag.title = title
    tag.placeholder = title
  }

  text_input_click(tag) {
    window.event.returnValue = false;
    return
    if (tag == null) {
      tag = document.querySelector('#intellisys_chatbot_input')
    }
    if (tag.value.replaceAll(/(\n|\r\n)/g,'').replaceAll(/ /g,'') == '?') {
      this.create_chat_text('user', tag.value, false)
      this.create_chat_text('assistant', this.help)
    } else if (tag.value.replaceAll(/(\n|\r\n)/g,'').replaceAll(/ /g,'') != '') {
      let assistant_id = this.create_chat_text('user', tag.value)
      this.create_chat_text('loading', '' , null, assistant_id);
      this.text_input_readonly(tag, true)
    }
    tag.value = ''
    // tag.style.height = '44px'
    window.event.returnValue = false;
  }

  text_input_keyup() {
    if (window.event.key == 'Enter') return
    let messageText = document.querySelector('#intellisys_chatbot_input')
    messageText.style.height = 'auto';
    // messageText.style.height = messageText.scrollHeight + 'px';
  }

  text_input_keypress() {
    if (window.event.key != 'Enter') return
    let messageText = document.querySelector('#intellisys_chatbot_input')
    if (window.event.shiftKey == true) {
      messageText.style.height = messageText.style.height.replace('px','') * 1 + 22 + 'px'
    } else {
      this.text_input_click(document.querySelector('#intellisys_chatbot_input'))
    }
  }

  set_chat_time(timestamp) {
    let chat_time = this.create_element('span')
    chat_time = this.set_style(chat_time, `
      display: block; margin-bottom: 12px; color : rgb(148, 152, 154);
      width: 100%; max-width: max-content; min-width: max-content;
      text-align: right; margin-top: auto; padding: 0 12px; font-size: 11px;
    `)
    let date = new Date()
    if (timestamp != null) date = new Date(timestamp.replace('T',''))

    const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const hours = date.getHours() % 12 ? date.getHours() % 12 : 12;
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    let week = WEEKDAY[date.getDay()];
    timestamp = `${week} ${hours}:${minutes} ${ampm}` 

    chat_time = this.set_innerhtml(chat_time, timestamp)
    return chat_time
  }

  create_chat_text(type, text, history, id, timestamp, tag_class) {
    let assistant_id = null
    let chatbot_icon = null
    let time = this.set_chat_time(timestamp)

    let chat_box = this.create_element('div')
    chat_box = this.set_attrs(chat_box, 'id', `intellisys_chatbot_text_${type}`)
    
    let chat_text = this.create_element('p')
    if (typeof(text) == 'string') chat_text = this.set_innerhtml(chat_text, text.replaceAll(/(\n|\r\n)/g, "<br>"))
    if (tag_class != null) chat_text = this.set_attrs(chat_text,'class',tag_class)

    if (type == 'assistant' || type == 'error' || type == 'loading') {
      if (type =='assistant' && typeof(text) == 'string') this.answer = text
      if (document.querySelector(`#chat_${id}`) != null) {
        if (type == 'error') {
          chat_box = document.querySelector(`#intellisys_chatbot_text_assistant.${this.current_query_id}`)
          if (chat_box != null) {
            chat_box = this.set_attrs(chat_box, 'id', `intellisys_chatbot_text_${type}`)
            chat_box = this.set_style(chat_box, ``) 
          }
        }
        chat_text = document.querySelector(`#chat_${id}`)
        if (typeof(text) == 'string') {
          chat_text.innerHTML = text
          this.answer = text
        } else {
          let image_list = this.create_chat_image_list(text)
          this.chatbot_text_box.appendChild(image_list)
        }

        let scroll_chatbox_text_box = document.querySelector('#intellisys_chatbox_text_box')
        if (scroll_chatbox_text_box == null) return
        scroll_chatbox_text_box.scrollTop = scroll_chatbox_text_box.scrollHeight
        return
      } else if (id != null) {
        chat_box = this.set_attrs(chat_box, 'class', this.current_query_id)
        chat_text = this.set_attrs(chat_text, 'id', `chat_${id}`)
      }
      if (type == 'loading') {
        chat_text = this.set_innerhtml(chat_text, "<img style='width: 40px; padding: 0 12px;' src='/chatloading.gif'>")
        chat_box = this.set_attrs(chat_box, 'id', `intellisys_chatbot_text_assistant`)
        chat_box = this.set_style(chat_box, `width: max-content;`)
      }
      if (typeof(text) != 'string' && history != null) {
        let image_list = this.create_chat_image_list(text)
        this.chatbot_text_box.appendChild(image_list)
        return
      }
      chatbot_icon = this.create_chatbot_icon()
      chatbot_icon = this.set_style(chatbot_icon, `width: 32px;
      object-fit: contain; margin-bottom: auto; margin-right: 12px;`)
      chat_box.appendChild(chatbot_icon)
      chat_box.appendChild(chat_text)
      // chat_box.appendChild(time)

    } else if (type == 'user') {
        time.style.marginLeft = 'auto'
        // chat_box.appendChild(time)
        chat_box.appendChild(chat_text)
        this.question = text
        this.question_id = this.generate_new_session_id()
        window.check_sku_cds = []
        for (var i of document.querySelectorAll('.activate')) {
          i.classList.remove('activate')
        }
        for (var i of document.querySelectorAll('.activate_check')) {
          i.classList.remove('activate_check')
        }
        if (history == null) {
          this.res_chat_timestamp = Date.now()
          this.current_query_id = 'query_' + Date.now().toString(32)
          chat_box = this.set_attrs(chat_box, 'class', this.current_query_id)
          this.create_image_list = true
          if (document.querySelector('#more_btn') != null) document.querySelector('#more_btn').style = 'display: none'
          if (document.querySelector('#more_list') != null) document.querySelector('#more_list').style = 'display: none'
          if (document.querySelector('#save_btn') != null) document.querySelector('#save_btn').style = 'display: none'
          assistant_id = this.req_question(text)
        }
      }
    this.chatbot_text_box.appendChild(chat_box)
    let scroll_chatbox_text_box = document.querySelector('#intellisys_chatbox_text_box')
    if (scroll_chatbox_text_box == null) return
    scroll_chatbox_text_box.scrollTop = scroll_chatbox_text_box.scrollHeight
    return assistant_id
  }

  set_rerank_scores(res) {
    let popup = document.querySelector('#popup')
    let rerank_scores = document.querySelector('#rerank_scores')
    let tag = ''
    for (let i of Object.keys(res)) {
      tag += `
        <p style='font-size: 13px;'>${i} : ${res[i]}</p>
      `
    }
    rerank_scores = this.set_innerhtml(rerank_scores, tag)
    popup.style.display = 'block'
  }

  create_chat_image_list(res) {
    this.create_image_list = false
    let intellisys_chatbot_image = this.create_element('div')
    intellisys_chatbot_image = this.set_attrs(intellisys_chatbot_image, 'id', 'intellisys_chatbot_image')

    intellisys_chatbot_image.onmouseleave = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.bMove = false
    }
    intellisys_chatbot_image.onmouseup = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.bMove = false
    }
    intellisys_chatbot_image.onmousedown = function() {
      INTELLISYS_CHATBOT_CREATE_CLASS_.bMove = true;
      INTELLISYS_CHATBOT_CREATE_CLASS_.startX = window.event.pageX - intellisys_chatbot_image.offsetLeft;
      INTELLISYS_CHATBOT_CREATE_CLASS_.scrollLeft = intellisys_chatbot_image.scrollLeft;
    }
    intellisys_chatbot_image.onmousemove = function() {
      if( INTELLISYS_CHATBOT_CREATE_CLASS_.bMove ) {
        const x = window.event.pageX - intellisys_chatbot_image.offsetLeft;
        const walk = x - INTELLISYS_CHATBOT_CREATE_CLASS_.startX;
        intellisys_chatbot_image.scrollLeft = INTELLISYS_CHATBOT_CREATE_CLASS_.scrollLeft - walk;
      }
    }

    let intellisys_image_list = this.create_element('div')
    intellisys_image_list = this.set_attrs(intellisys_image_list, 'id', 'intellisys_image_list')
    
    // if (document.querySelector('#more_list') != null) document.querySelector('#more_list').style = 'display: flex'
    // if (document.querySelector('#save_btn') != null) document.querySelector('#save_btn').style = 'display: flex'
    // if (document.querySelector('#more_btn') != null) document.querySelector('#more_btn').style = 'display: block !important'
    
    window.res_sku_cds = []
    for (var i of res) {
      i['old_index'] = res.indexOf(i)
      // i['rvw'] = Math.floor(Math.random() * 100)
      // i['sales_start_date'] = `2018-04-08 03:25:${Math.floor(Math.random() * 60)}`
      // i['ranking'] = Math.floor(Math.random() * 100)
      window.res_sku_cds.push(i['item_id'])
    }

    document.querySelector('select').value = ''
    window.$nuxt.$root.$children[1].$children[0].$children[0].item_list = res
    window.$nuxt.$root.$children[1].$children[0].$children[0].check_list = []
    window.is_check = false
    window.item_list = res.slice()

    let image_list = this.create_element('ul')
    let item_list = res.slice(0,10)
    for (var i of item_list) {
      let row = this.create_element('li')
      let price_row = ''
      // if (i['price'] != i['retail_price']) {
      //   price_row = `
      //   <p style='font-size: 12px; text-decoration: line-through; color: gray;'>${i['price']}원</p>
      //   <div style='display: flex; margin-top: 12px'>
      //     <p style='margin-right: 12px; font-size: 12px; color: red;'>${Math.round((i['price'] - i['retail_price']) / i['price'] * 100)}%</p>
      //     <p style='font-size: 12px;'>${i['retail_price']}원</p>
      //   </div>`
      // } else {
      //   price_row = `<p style='font-size: 12px;'>${i['retail_price']}원</P>`
      // }
      // for (var key of Object.keys(i)) {
      //   if (key == 'price' || key == 'title' || key == 'goods_url' || key == 'image_path' || key == 'retail_price') continue
      //   tag += `<p style='font-size: 12px; white-space: normal;
      //   word-wrap: break-word;
      //   display: -webkit-box;
      //   -webkit-box-orient: vertical;
      //   line-height: 1.2em;
      //   text-overflow: ellipsis;
      //   overflow: hidden;'>${key} : ${i[key]}</p><br>`
      // }
      if (this.static_image) i['image_path'] = 'https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/03/25/GM0024032501807_0_THNAIL_ORGINL_20240329095214248.jpg'
      let color_code = 'rgb(11, 34, 111)'
      if (this.is_debug) {
        let tag = ''
        for (var key of Object.keys(i)) {
          if (key == 'goods_url' || key == 'image_path' || key =='old_index') continue
          tag += `<p style='font-size: 12px; white-space: normal;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          line-height: 1.2em; font-size: 10px;
          text-overflow: ellipsis; color : white;
          overflow: hidden;'>${key} : ${i[key]}</p><br>`
        }
        // price_row = `<p style='font-size: 12px; color : white;'>${i['price']}원</P>`
        // <p style='white-space: normal;
        // word-wrap: break-word;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // line-height: 1.2em;
        // max-height: 3.6em;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // font-size: 10px; margin: 12px 0; color : white;'>${i['title']}</p>
        row = this.set_innerhtml(row, `<div style='height: 100%;'>
          <div style="width: max-content;margin: auto; height: 120px;">
            <img style='height: 120px; object-fit: contain; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drag: none;' src='${i['image_path']}'><img>
          </div>
          <div class='color_row' style='padding:7px; height: calc(100% - 134px); width: calc(100% - 14px); background-color: ${color_code};'>
            ${tag}
          </div>
        </div>`)
      } else {
        row = this.set_innerhtml(row, `<div style='height: 100%'>
          <div style="width: max-content;margin: auto; height: 120px; padding:0 7px;">
            <img style='height: 120px; object-fit: contain; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drag: none;' src='${i['image_path']}'><img>
          </div>
          <div class='color_row' style='padding:7px; height: calc(100% - 134px); width: calc(100% - 14px); background-color: ${color_code};'>
            <p style='font-size: 10px; white-space: normal;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 1.2em;
            text-overflow: ellipsis;
            overflow: hidden;
            color : white;'>브랜드: ${i['brand']}</p>
            <p style='white-space: normal;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-height: 1.2em;
            max-height: 3.6em;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 10px;
            color : white;'>상품명: ${i['title']}</p>
          </div>
        </div>`)
      }
      let url = i['goods_url']
      let item_id = i['item_id']
      let index = item_list.indexOf(i)
      let row_el = intellisys_image_list
      row = this.set_attrs(row, 'id',`item_row_${index}`)
      // row = this.set_attrs(row, 'class',`item`)
      image_list.appendChild(row)
      row.onclick = function() {
        if (window.event.pageX - INTELLISYS_CHATBOT_CREATE_CLASS_.startX == 12) {
          window.open(url)
      //     if (!row_el.classList.contains('latest')) return

      //     row_el.querySelector(`#item_row_${index}`).querySelector('.color_row').classList.add('activate')
      //     let more_item = document.querySelector('#more_list').querySelector(`#item_row_${index}`)

      //     let item_index = window.check_sku_cds.indexOf(item_id)
      //     if (item_index == -1) {
      //       window.check_sku_cds.push(item_id)
      //     } else {
      //       window.check_sku_cds.splice(item_index, 1)
      //       row_el.querySelector(`#item_row_${index}`).querySelector('.color_row').classList.remove('activate')
      //       if (more_item != null ) more_item.querySelector('.color_row').classList.remove('activate')
      //     }
        }
      }
    }
    for (var i of document.querySelectorAll('.latest')) {
      i.classList.remove('latest')
    }
    intellisys_image_list = this.set_attrs(intellisys_image_list, 'class', 'latest')
    intellisys_image_list.appendChild(image_list)
    intellisys_chatbot_image.appendChild(intellisys_image_list)
    return intellisys_chatbot_image
  }

  click_chatbot_icon() {
    let chatbot_text_box = document.querySelector('#intellisys_chatbot_box')

    if (this.is_chatbot_activate == false) {
      chatbot_text_box.style.display = 'block'
    } else {
      chatbot_text_box.style.display = 'none'
    }
    this.is_chatbot_activate = !this.is_chatbot_activate
  }

  get_session_id() {
    const SESSION_ID_KEY = 'intellisyschatbotUserSessionId';
    const SESSION_EXPIRED_DTM_KEY = 'intellisyschatbotUserSessionExpiredDtm';
  
    let session_id = window.localStorage.getItem(SESSION_ID_KEY);
    let session_expired_dtm = window.localStorage.getItem(SESSION_EXPIRED_DTM_KEY);
    let cur_dtm = Date.now();
    let session_age_sec = parseInt('3600') || (60*60)
  
    if (session_id === null || session_expired_dtm === null || parseInt(session_expired_dtm) < cur_dtm) {
      session_id = this.generate_new_session_id()
      window.localStorage.setItem(SESSION_ID_KEY, session_id);
    }
  
    window.localStorage.setItem(SESSION_EXPIRED_DTM_KEY, cur_dtm + (session_age_sec*1000));
    return session_id;
  }

  generate_new_session_id() {
    // random hex string
    const session_id_length = 32;
    return (size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''))(session_id_length);
  }

  req_question(question, assistant_id, retry_count) {
    if (retry_count == 5) {
      this.create_chat_text('error', this.error_msg[this.language], null, assistant_id)
      this.text_input_readonly(null, false);
      return
    }
    this.res_sku_cds = []
    const session_id = this.get_session_id()
    const xhr = new XMLHttpRequest();
    if (assistant_id == null) assistant_id = Date.now().toString(32)
    let assistant_id_ = assistant_id
    let recent = window.recent
    let personal = window.personal
    let body = {'query_id':this.question_id,'question':question,'site_id':'ssf','user_id':this.user_id_prefix+'user1','session_id':session_id, 'language':this.language, 'timestamp':INTELLISYS_CHATBOT_CREATE_CLASS_.res_chat_timestamp}
    if (recent != null) {
      body['recent'] = recent
    }
    if (personal != null) {
      body['personal'] = personal
    }
    body = Object.assign(body,this.params)
    let is_retry = true
    xhr.timeout = 125000;
    // xhr.timeout = 45000;
    xhr.open('POST', this.api_url + '/stream_json');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      if (this.readyState >= 3 && this.status == 200) {
        retry_count = 5
        xhr.timeout = xhr.timeout + 1000
        var res_text = this.responseText.split('}{')
        let text = ''
        let text_2 = ''
        let content = ''
        let sequence =''
        let prod_list = []
        for (var i of res_text) {
          if (i[0] == '{' && i[i.length -1] !='}') {
            i = i + '}'
          } else if (i[0] != '{' && i[i.length -1] =='}') {
            i = '{' + i 
          } else if (i[0] != '{' && i[i.length -1] !='}'){
            i = '{' + i + '}'
          }
          content = JSON.parse(i)
          if (content['prod_list'] != null) {
            prod_list = content['prod_list']
          }
          if (content['answer'] != null && content['answer'] != 'null') {
            text = text + content['answer']
          }
          if (content['sequence'] > 1) {
            text_2 = text_2 + content['answer']
            text = text_2
            sequence = content['sequence']
          }
        }
        if (content['error'] == null && INTELLISYS_CHATBOT_CREATE_CLASS_.create_image_list && prod_list.length > 0) {
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('assistant', prod_list , null, assistant_id);
          if (INTELLISYS_CHATBOT_CREATE_CLASS_.is_debug) {
            INTELLISYS_CHATBOT_CREATE_CLASS_.rerank_scores()
          }
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
        } else if (content['error'] != null) {
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language], null, assistant_id);
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          xhr.abort()
        }
        assistant_id = assistant_id_
        assistant_id += sequence
        if (text !='' && content['error'] == null) {
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('assistant', text , null, assistant_id);
        }
      } else if (this.status != 0){
        is_retry = false
        INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language], null, assistant_id);
        INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
      }
    }
    xhr.ontimeout = function (event) {
      is_retry = false
      INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language], null, assistant_id);
      INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
    };
    xhr.onerror = function() {
      if (!is_retry) return
      if (retry_count == null) {
        retry_count = 1
      } else {
        retry_count = retry_count + 1
      }
      // setTimeout(function () {
        
      // }, 1000)      
      INTELLISYS_CHATBOT_CREATE_CLASS_.req_question(question, assistant_id_, retry_count)
    }

    xhr.send(JSON.stringify(body));
    return assistant_id
  }

  req_history(retry_count) {
    if (retry_count == 5) {
      this.create_chat_text('error', this.error_msg[this.language])
      this.text_input_readonly(null, false);
      this.is_history = true
      return
    }
    const session_id = this.get_session_id()
    const xhr = new XMLHttpRequest();
    let body = {'site_id':'ssf','user_id':this.user_id_prefix+'user1','session_id':session_id}
    let is_retry = true
    body = Object.assign(body,this.params)
    xhr.open('POST', this.api_url + '/get_history');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status >= 200 && status < 400) {
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          INTELLISYS_CHATBOT_CREATE_CLASS_.is_history = true
          let res = JSON.parse(xhr.response)
          for (var row of res) {
            if (row['prod_list'] != null) {
              if (row['prod_list'].length > 0) {
                INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('assistant', row['prod_list'], true, null)
              }
            } else {
              INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text(row['role'], row['message'], true, null)
            }
          }
        } else if (status != 0){
          is_retry = false
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          INTELLISYS_CHATBOT_CREATE_CLASS_.is_history = true
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language])
        }
      }
    }
    xhr.onerror = function(event) {
      if (!is_retry) return
      if (retry_count == null) {
        retry_count = 1
      } else {
        retry_count = retry_count + 1
      }
      // setTimeout(function () {

      // }, 1000)
      INTELLISYS_CHATBOT_CREATE_CLASS_.req_history(
        retry_count
      )
    }

    xhr.send(JSON.stringify(body));
  }

  qa_history(retry_count) {
    if (this.is_history == false) return
    if (retry_count == 5) {
      this.create_chat_text('error', this.error_msg[this.language])
      this.text_input_readonly(null, false);
      return
    }
    this.text_input_readonly(null, 'qa_history');
    const session_id = this.get_session_id()
    const xhr = new XMLHttpRequest();
    let check_sku_cds = window.check_sku_cds
    let is_all = false
    if (window.check_sku_cds.length == 0) {
      check_sku_cds = window.res_sku_cds
      is_all = true
    }
    let body = {'site_id':'ssf','user_id':this.user_id_prefix+'user1', 'session_id':session_id,
    question : this.question, answer : this.answer, res_sku_cds: window.res_sku_cds, check_sku_cds: check_sku_cds,
    question_id : this.question_id}
    let is_retry = true
    body = Object.assign(body,this.params)
    xhr.open('POST', this.api_url + '/qa_history');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status >= 200 && status < 400) {
          let res = JSON.parse(xhr.response)
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          // let more_list = document.querySelector('#more_list')
          // for (let i of check_sku_cds) {
          //   let item_row = more_list.querySelector(`#item_row_${window.res_sku_cds.indexOf(i)}`)
          //   item_row.querySelector('.color_row').setAttribute('id','save_row')
          //   item_row.querySelector('input').classList.add('id','save_check_box')
          //   item_row.querySelector('input').setAttribute('checked','')
          // }
          window.is_check = true
          document.querySelector('#save_btn').style.backgroundColor = 'rgb(235, 6, 61)'
          if (is_all) {
            alert('모든 상품이 저장되었습니다.')
          } else {
            alert('선택한 상품이 저장되었습니다.')
          }
        } else if (status != 0){
          is_retry = false
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          alert('예상치 못한 에러가 발생했습니다. 다시 시도해 주십시오')
          // INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language])
        }
      }
    }
    xhr.onerror = function(event) {
      if (!is_retry) return
      if (retry_count == null) {
        retry_count = 1
      } else {
        retry_count = retry_count + 1
      }
      INTELLISYS_CHATBOT_CREATE_CLASS_.qa_history(
        retry_count
      )
    }

    xhr.send(JSON.stringify(body));
  }

  req_clear(retry_count) {
    if (this.is_history == false) return
    if (retry_count == 5) {
      this.create_chat_text('error', this.error_msg[this.language])
      this.text_input_readonly(null, false);
      return
    }
    this.text_input_readonly(null, 'clear');
    const session_id = this.get_session_id()
    const xhr = new XMLHttpRequest();
    let body = {'site_id':'ssf','user_id':this.user_id_prefix+'user1', 'session_id':session_id}
    let is_retry = true
    body = Object.assign(body,this.params)
    xhr.open('POST', this.api_url + '/clear');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status >= 200 && status < 400) {
          let res = JSON.parse(xhr.response)
          if (res['status'] == 'SUCCESS') {
            INTELLISYS_CHATBOT_CREATE_CLASS_.chat_clear()
            INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
            if (document.querySelector('#more_list') != null) document.querySelector('#more_list').style = 'display: none'
            if (document.querySelector('#save_btn') != null) document.querySelector('#save_btn').style = 'display: none'
            if (document.querySelector('#more_btn') != null) document.querySelector('#more_btn').style = 'display: none'
          }
        } else if (status != 0){
          is_retry = false
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language])
        }
      }
    }
    xhr.onerror = function(event) {
      if (!is_retry) return
      if (retry_count == null) {
        retry_count = 1
      } else {
        retry_count = retry_count + 1
      }
      INTELLISYS_CHATBOT_CREATE_CLASS_.req_clear(
        retry_count
      )
    }

    xhr.send(JSON.stringify(body));
  }

  rerank_scores(retry_count) {
    if (this.is_history == false) return
    if (retry_count == 5) {
      this.create_chat_text('error', this.error_msg[this.language])
      this.text_input_readonly(null, false);
      return
    }
    this.text_input_readonly(null, 'rerank_scores');
    const xhr = new XMLHttpRequest();
    let body = {'question_id':this.question_id}
    let is_retry = true
    body = Object.assign(body,this.params)
    xhr.open('POST', this.api_url + '/rerank_scores');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      const { target } = event;
      if (target.readyState === XMLHttpRequest.DONE) {
        const { status } = target;
        if (status >= 200 && status < 400) {
          let res = JSON.parse(xhr.response)
          if (res['status'] == 'SUCCESS') {
            INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
            INTELLISYS_CHATBOT_CREATE_CLASS_.set_rerank_scores(res['result'])
          }
        } else if (status != 0){
          is_retry = false
          INTELLISYS_CHATBOT_CREATE_CLASS_.text_input_readonly(null, false);
          INTELLISYS_CHATBOT_CREATE_CLASS_.create_chat_text('error', INTELLISYS_CHATBOT_CREATE_CLASS_.error_msg[INTELLISYS_CHATBOT_CREATE_CLASS_.language])
        }
      }
    }
    xhr.onerror = function(event) {
      if (!is_retry) return
      if (retry_count == null) {
        retry_count = 1
      } else {
        retry_count = retry_count + 1
      }
      INTELLISYS_CHATBOT_CREATE_CLASS_.rerank_scores(
        retry_count
      )
    }

    xhr.send(JSON.stringify(body));
  }
}

let INTELLISYS_CHATBOT_CREATE_CLASS_ = new INTELLISYS_CHATBOT_CREATE_CLASS()
export default INTELLISYS_CHATBOT_CREATE_CLASS_
