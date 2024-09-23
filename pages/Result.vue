<template>
  <div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <p class="main-title">결과</p>

    <div class="box-grid">
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

        <button style="float: right;" class="nuxt-button">DB 생성</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
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
  }
}
</script>