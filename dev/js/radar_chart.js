const data = {
  labels: ['건축물피해 위험도', '복구역량도', ['긴급대응 도로·공간','         확보계수'], '대피 안전도', ['지진화재','위험도  ']],
  datasets: [{
    label: '포항시 북구',
    data: [83.1, 78.3, 49.4, 99.5, 38.9],
    fill: true,
    backgroundColor: '#16c87220',
    borderColor: '#16c872',
    pointBackgroundColor: '#16c872',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#16c872'
  }, {
    label: '포항시 남구',
    data: [84.7, 72.6, 50.7, 100, 44.2],
    fill: true,
    backgroundColor: '#fbc90020',
    borderColor: '#fbc900',
    pointBackgroundColor: '#fbc900',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#fbc900'
  }]
};
const ctx = document.getElementById('radarchart');
const options= {      
  elements: {
    line: {
      borderWidth: 1
    }
  },
  plugins: {
    legend:{
      position:'bottom',
      align:'end',
      labels:{boxWidth:10,boxHeight:10,padding:15,color:'#838383',font:{size:11}}
    },
    tooltip:{
      callbacks: {
        titleSpacing:10,
        labelColor: function(context) {
          console.log(context)
          return {
            borderColor: context.dataset.borderColor,
            backgroundColor: context.dataset.backgroundColor,
            borderWidth: 1,
            borderRadius: 2,
          };
        }          
      }
    }
  },
  scales: {
    r:{
      max: 100,min: 0,
      ticks: {stepSize: 20,color:'#000',font:{size:9}},
      grid:{color:'#e5e5e5'},
      angleLines:{color:'#c0c0c0'},
      pointLabels:{color:'#000',font:{size:11, weight:'bold'}}
    }
  }
};
const myChart = new Chart(ctx, {
  type: 'radar',
  data: data,
  options:options
});
const ctx2 = document.getElementById('p_radarchart');
const p_myChart = new Chart(ctx2, {
  type: 'radar',
  data: data,
  options:options
});