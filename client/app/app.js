angular.module('Material', [
  'ui.router'
])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app',{
      url: '/'
    });
  $urlRouterProvider.otherwise('/');
})

.controller('Controller', function($scope) {
  $scope.data = {
    columns: [
      ['Xianhui', 300, 200, 100, 400, 150, 250],
      ['Josh', 12, 18, 10, 40, 235, 300],
      ['Mase', 34, 20, 139, 40, 150, 25],
      ['Andrew', 53, 3, 10, 49, 195, 100],
      ['Scott', 83, 20, 22, 40, 320, 25],
      ['Josh P', 128, 35, 10, 86, 123, 150]
    ],
    types: {
      data1: 'area',
      data2: 'area-spline'
    }
  };
})
.directive('chart', function() {
  var chartIdCounter = Math.floor((Math.random()*1000)+1);
  console.log(chartIdCounter);
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '='
    },
    link: function(scope, element, attrs) {
       //Assigning id to the element
      var chartId;
      if(element.attr('id')) {
        chartId = element.attr('id');
      }
      else {
        chartId = 'c3-chart-' + chartIdCounter;
        element.attr('id', chartId);
        chartIdCounter += 1;
      }

      //Preparing chart data and options
      var genData = {
        bindto: '#' + element.attr('id'),
        data: scope.data
      };
      console.log(genData, ' genData');
      genData.data.type = attrs.chart? attrs.chart : scope.data.type? scope.data.type : 'line';
      if(scope.options) {
        Object.keys(scope.options).forEach(function(key) {
          genData[key] = scope.options[key];
        });
      }
      //On data change, reload chart
      onDataChanged = function(data, oldData) {
        if(chart) {
          chart.load(data);
          if(data.columns.length < oldData.columns.length) {
            chart.unload(['data' + oldData.columns.length]);
          }
        }
      };
      scope.$watch('data', onDataChanged, true);

      //On chart type change, reload chart
      onChartChanged = function(chart) {
        if(chart) {
          scope.data.type = chart;
          chart.load(data);
        }
      };
      scope.$watch(function() {return attrs.chart; }, onChartChanged);
      //Generating the chart
      var chart = c3.generate(genData);
    }
  };
});









