(function($){
  $(function(){

    var battleResults = new Chart(document.getElementById('battle-results'), {
      type: 'bar',
      data: {
        labels: ['Battle Results', 'Survivability'],
        datasets: [{
          data: [50, 28],
          backgroundColor: 'rgba(0, 150, 136, 1)',
          hoverBackgroundColor: 'rgba(0, 150, 136, .8)'
        },{
          data: [2, 2],
          backgroundColor: 'rgba(255, 193, 7, 1)',
          hoverBackgroundColor: 'rgba(255, 193, 7, .8)'
        },{
          data: [48, 70],
          backgroundColor: 'rgba(255, 82, 82, 1)',
          hoverBackgroundColor: 'rgba(255, 82, 82, .8)'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        legend:{
          display: false
        }
      }
    });


    var wn8Progression = new Chart(document.getElementById('wn8-progression'), {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [960, 970, 900, 980, 1070, 1100, 1132],
            spanGaps: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'WN8 Progression'
        },
        legend:{
          display: false
        }
      }
    });


    var winRateProgression = new Chart(document.getElementById('win-rate-progression'), {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [48, 48.5, 49.2, 50.7, 51.4, 51.6, 51.9],
            spanGaps: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Win Rate Progression'
        },
        legend:{
          display: false
        }
      }
    });


    var battlesByClass = new Chart(document.getElementById('battles-by-class'), {
      type: 'bar',
      data: {
        labels: ['Heavy Tanks', 'Medium Tanks', 'Light Tanks', 'Tank Destroyers', 'SPGs'],
        datasets: [{
          data: [2101, 401, 494, 322, 303],
          backgroundColor: 'rgba(0, 150, 136, 1)',
          hoverBackgroundColor: 'rgba(0, 150, 136, .8)'
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Battles by Class'
        },
        legend:{
          display: false
        }
      }
    });


    var battlesByTier = new Chart(document.getElementById('battles-by-tier'), {
      type: 'bar',
      data: {
        labels: ['Tier I', 'Tier II', 'Tier III', 'Tier IV', 'Tier V', 'Tier VI', 'Tier VII', 'Tier VIII', 'Tier IX', 'Tier X'],
        datasets: [{
          data: [61, 90, 218, 600, 1033, 300, 692, 551, 76, 30],
          backgroundColor: 'rgba(0, 150, 136, 1)',
          hoverBackgroundColor: 'rgba(0, 150, 136, .8)'
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Battles by Tier'
        },
        legend:{
          display: false
        }
      }
    });


    var masteryBadgesByTier = new Chart(document.getElementById('mastery-badges-by-tier'), {
      type: 'bar',
      data: {
        labels: ['Tier I', 'Tier II', 'Tier III', 'Tier IV', 'Tier V', 'Tier VI', 'Tier VII', 'Tier VIII', 'Tier IX', 'Tier X'],
        datasets: [{
          data: [3, 0, 1, 1, 0, 1, 0, 0, 0, 0],
          backgroundColor: 'rgba(189, 189, 189, 1)',
          hoverBackgroundColor: 'rgba(189, 189, 189, .8)'
        },{
          data: [2, 7, 3, 0, 0, 2, 0, 1, 0, 0],
          backgroundColor: 'rgba(158, 157, 36, 1)',
          hoverBackgroundColor: 'rgba(158, 157, 36, .8)'
        },{
          data: [1, 3, 5, 2, 4, 2, 1, 1, 1, 0],
          backgroundColor: 'rgba(141, 110, 99, 1)',
          hoverBackgroundColor: 'rgba(141, 110, 99, .8)'
        },{
          data: [0, 0, 5, 8, 3, 1, 0, 1, 1, 3],
          backgroundColor: 'rgba(236, 239, 241, 1)',
          hoverBackgroundColor: 'rgba(236, 239, 241, .8)'
        },{
          data: [1, 1, 1, 2, 4, 1, 2, 2, 2, 1],
          backgroundColor: 'rgba(255, 193, 7, 1)',
          hoverBackgroundColor: 'rgba(255, 193, 7, .8)'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        legend:{
          display: false
        }
      }
    });

  });
})(jQuery);
