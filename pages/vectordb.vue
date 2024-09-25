<template>
  <div>
    <p class="main-title">벡터 DB 생성 > <span class="main-sub-title">결과 확인</span></p>

    <div style="display: flex;margin-bottom: 24px;">
      <div class="project-name" style="margin: auto 0px auto 12px">#프로젝트 1</div>
      <button class="next-button">
        <a>백터DB 저장</a>
        <img class="arrow-right" src="@/assets/arrow_right.png">
      </button>
    </div>
    <!-- <v-progress-linear
      v-model="knowledge"
      :active="true"
      style="width: 100px; margin-left: 16px;"
      height="25"
    >
      <strong>24%</strong>
    </v-progress-linear> -->

    <div class="box-grid">
      <div>
        <div class="sub-title">작업목록</div>
          <div class="box" style="min-height: 450px;">
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
            activatable
            item-key="name"
            open-on-click
            @update:active="test"
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
          </v-treeview>
        </div>
      </div>

      <div>
        <div class="sub-title">원본파일</div>
        <div class="box" style="min-height: 450px;">
          <iframe style="width: 100%; height: 400px;" v-if="view" :src="file_data[file]['src']" type="application/pdf">

          </iframe>
        </div>
      </div>

      <div>
        <div class="sub-title">청킹 결과</div>
        <div class="box" style="min-height: 450px; max-height: 450px; overflow-y: scroll; padding: 0;">
          <p id="chunking" v-show="view">
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      knowledge : 22,
      view: false,
      initiallyOpen: ['folder2'],
      files: {
        pdf: 'mdi-file-pdf-box',
        word: 'mdi-file-word',
        txt: 'mdi-file-document-outline',
      },
      tree: [],
      file : null,
      file_data : {
        '예금업무방법(제3권 상품)(20240401)_일부개정' :{
        src : 'http://is-web.intellisys.co.kr:58580/files/pdf/예금업무방법(제3권 상품)(20240401)_일부개정.pdf?view=FitH&toolbar=0',
        chunking : `<div class="doc">
예금업무방법(제3권 상품)<br>
제1편 일반상품<br>
제1장 입출금이자유로운예금<br>
제1절 당좌예금<br>
제1관 일반사항<br>
제1조(개요)<br>
① 당좌예금의 의의는 다음과 같다.<br>
1. 은행과 당좌거래계약을 맺은 거래처가 상거래에서 발생하는 대금결제를 위해 발행한 어음·수표의 지급자금 출납사무를 은행이 대행하는 예금으로서 어음·수표 유통의 원활화와 금융질서의 확립을 위해 일정요건을 갖춘 경우에만 개설할 수 있다.<br>
2. 이 예금은 수시로 입출금이 가능하며, 이자를 지급하지 않는 전형적인 입출금이자유로운예금이다.<br>
3. 이 예금은 건전한 금융질서의 확립을 위하여 거래대상자 선정에 신중을 기하여야 한다.<br>
4. 당좌거래와 관련하여 일정한도까지 지급자금을 초과하여 어음·수표를 지급하겠다는 당좌대출 약정을 아울러 맺는 경우도 있다.<br>
② 당좌예금 계약의 법적성질은 다음과 같다.<br>
1. 위임 계약 : 어음·수표의 지급사무를 위임하고 은행이 승낙하여 성립되는 민법상의 위임계약이 중심을 이루고 은행은 계약의 취지에 따라 선량한 관리<br>
----<br>
약의 법적성질은 다음과 같다.<br>
1. 위임 계약 : 어음·수표의 지급사무를 위임하고 은행이 승낙하여 성립되는 민법상의 위임계약이 중심을 이루고 은행은 계약의 취지에 따라 선량한 관리의무자로 주의의무를 다하여야 한다.<br>
2. 소비임치 계약 : 예금주는 어음·수표 지급자금을 미리 은행에 입금시켜야 하며, 은행에 입금의사 표시를 하면 은행은 승낙하고 입금액을 어음·수표의 지급제시까지 소비 운용하고 후일 어음·수표의 지급제시가 있을 때 해당 금액을 반환할 것을 약정하는 것으로 소비임치계약이 성립한다.<br>
3. 일신전속적 계약 : 어음·수표의 지급위임을 근간으로 예금주의 신용 및 재산상태 또는 예금거래상황 등 신용관계가 절대적인 거래요건으로 그 거래를 가능케 하는 법률관계는 양도나 이전이 될 수 없는 일신전속적인 계약관계이다.
</div>
<div class="doc">
예금업무방법(제3권 상품)<br>
제1편 일반상품<br>
제1장 입출금이자유로운예금<br>
제1절 당좌예금<br>
제1관 일반사항<br>
제2조(거래대상자)<br>
① 거래대상자는 아래의 거래실적을 충족한 법인 또는 개인사업자로 한다.<개정 2021.03.25.><br>
1. 당좌예금 개설신청일 현재 본인명의의 예금 또는 신탁 거래기간이 6개월 이상이고, 최근 6개월간의 예금 및 신탁 평균잔액 합계액이 1억원 이상인 자. 다만, 관련대출이 있는 예금계좌의 경우에는 대출금액 해당액을 거래실적에서 제외하고 산정한다.<개정 2021.03.25.><br>
2. 제1호의 거래실적은 다음의 기준에 따라 처리한다.<개정 2021.03.25.><br>
가. 거래실적은 당행 거래실적으로 한다.<개정 2021.03.25.><br>
나. 하나 이상의 계좌가 6개월 이상 거래가 있어야 하며, 6개월 미만 거래한 계좌는 6개월 평잔으로 환산하여 실적에 포함할 수 있다.<개정 2021.03.25><br>
다. 해지계좌도 대상기간 내에 실적이 있는 경우 합산할 수 있다.<br>
라. 거래실적의<br>
----<br>
 미만 거래한 계좌는 6개월 평잔으로 환산하여 실적에 포함할 수 있다.<개정 2021.03.25><br>
다. 해지계좌도 대상기간 내에 실적이 있는 경우 합산할 수 있다.<br>
라. 거래실적의 산정기준일은 당좌개설 신청일 지난달 말일부터 당좌개설 신청전날 사이에 정할 수 있다.<br>
마. 법인명의 개설시 대표이사 개인명의 실적은 인정하지 않는다.<br>
바. 양도성예금증서(실물증서발행) 등 무기명예금은 거래실적으로 인정하지 않는다.<br>
② 다음 각 호의 어느 하나에 해당하는 자는 제1항의 거래실적에도 불구하고 당좌계정을 개설할 수 있다.<br>
1. 국가기관, 지방자치단체, 학교기관, 국공립기관, 공공기관의 운영에 관한 법률에 따른 공공기관, 특별법에 따라 설립된 법인체, 국제기관, 외국기관(공공기관, 비영리단체에 한함) 및 은행(은행법에서 정한 은행). 다만, 국내기관은 직인을 인감으로 신고하여야 한다.<br>
2. 수협은행 점포 또는 다른 은행과 당좌거래가 있고, 그 거래 및 신용이 양호한 자<br>
3. 외국인 합자 및 투자업<br>
----<br>
정한 은행). 다만, 국내기관은 직인을 인감으로 신고하여야 한다.<br>
2. 수협은행 점포 또는 다른 은행과 당좌거래가 있고, 그 거래 및 신용이 양호한 자<br>
3. 외국인 합자 및 투자업체 중 공공성을 띤 업체<br>
4. 관계법에 따라 금융업, 보험업, 증권업, 신탁업을 영위하는 자<br>
5. 이미 당좌거래가 있는 개인기업이 법인기업으로 전환하여 다음 요건에 해당하는 신설법인<br>
가. 개인기업의 영업전부가 신설법인으로 승계되어야 한다.<br>
나. 개인기업의 대표가 전환한 법인의 대표이사이어야 하며, 국세기본법 제39조에 따른 과점주주에 해당되는 등 실질적인 지배관계가 있어야 한다.<br>
<참고>  <국세기본법 제39조제2호>   2. 주주 또는 유한책임사원 1명과 그의 특수관계인 중 대통령령으로 정하는 자로서 그들의 소유주식 합계 또는 출자액 합계가 해당 법인의 발행주식 총수 또는 출자총액의 100분의 50을 초과하면서 그에 관한 권리를 실질적으로 행사하는 자들(이하 "과점주주"라 한다)<br>
다. 기존 개인기업의 당좌<br>
----<br>
자액 합계가 해당 법인의 발행주식 총수 또는 출자총액의 100분의 50을 초과하면서 그에 관한 권리를 실질적으로 행사하는 자들(이하 "과점주주"라 한다)<br>
다. 기존 개인기업의 당좌예금은 해지하고 신규 개설에 준하는 신용조사 실시 후 신설법인 명의의 당좌예금을 개설한다. 또한 법인기업이 개인기업주 명의의 당좌예금 및 기존발행 어음·수표 채무 전부를 승계하는 경우에도 신규 개설에 준하는 신용조사 실시 후 개인기업 명의의 당좌예금을 법인명의로 변경하여 계속 거래를 할 수 있다.<br>
라. 기존 개인기업의 당좌예금 해지시 당좌예금에 미회수 어음·수표가 있는 경우 미회수 어음·수표 결제시까지 해지를 유보할 수 있으나, 해지시까지 기존 당좌예금의 어음·수표 발급은 금지한다.<br>
6. 당행 및 당행 자회사. 다만, 당행은 한국은행 총액한도대출 자금 차입을 위한 어음발행을 목적으로 하는 경우에만 개설이 가능하다.<br>
7. 당행을 수탁기관으로 하는 자산유동화를 목적으로 설립된 특수목적법인(SPC)<개정2021.<br>
----<br>
행 총액한도대출 자금 차입을 위한 어음발행을 목적으로 하는 경우에만 개설이 가능하다.<br>
7. 당행을 수탁기관으로 하는 자산유동화를 목적으로 설립된 특수목적법인(SPC)<개정2021.03.25><br>
8. 한국증권거래소 유가증권시장 또는 코스닥시장의 상장법인<신설 2021.03.25.>
</div>
`
        }
      },
      items: [
        {
          name: 'folder1',
        },
        {
          name: 'folder2',
          children: [
            {
              name: '예금업무방법(제3권 상품)(20240401)_일부개정',
              file: 'pdf',
            }
          ],
        },
      ]
    }
  },
  methods: {
    test(e) {
      if (e.length > 0) {
        this.view = false
        this.file = e[0]
        this.set_doc()
      }
    },
    set_doc() {
      document.querySelector('#chunking').innerHTML = this.file_data[this.file]['chunking']
      this.view = true
    }
  },
}
</script>
<style>
.doc {
  background-color: #e0e0e0;
  margin-bottom: 12px;
  padding: 24px;
}
</style>
