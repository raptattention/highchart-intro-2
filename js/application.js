$(document).ready(function(){
	var Chart = function(){
    this.graphConfig = {
      title: {
        text: "Historical Temperatures",
        x: -20
      },
      subtitle: {
        source: "Source: openweathermap.org",
      },
      xAxis: {
        type: "datetime",
        tickInterval: 3600 * 1000,
        pointInterval: 24 * 3600 * 1000
      },
      yAxis: {
        title: "Temperature(degrees K)"
      },
      series: []
    };
	};

  Chart.prototype.getCity = function(city){
    var cityID = city.replace(" ", "");
    var cityData = [];
    var cityURL = 'http://api.openweathermap.org/data/2.5/history/city?q='+cityID+'&type=day';
    $.ajax({
      context: this,
      type: 'GET',
      url: cityURL,
      success: function(response){
        var items = response.list;
        for (i=0; i<items.length; i++){
          var item = items[i];
          cityData.push({
           x: new Date (item.dt*1000),
           y: item.main.temp
          });
        }
        var cityArray = {
          name: city,
          data: cityData
        };
        this.graphConfig.series.push(cityArray);
        this.graphCities();
        }
    });   
  };

  Chart.prototype.graphCities = function(args){
    var finalConfig = this.graphConfig;
    $('#chart').highcharts(finalConfig);
  };

  var sampleGraph = new Chart();
  sampleGraph.getCity("Boston");
  sampleGraph.getCity("NYC");
  sampleGraph.getCity("Hong Kong");
  sampleGraph.getCity("San Francisco");
  sampleGraph.getCity("Dallas");
});