var graph = new Rickshaw.Graph({
    element: document.querySelector("#graph"),
    width: "600",
    height: "600",
    renderer: "line",
    series: new Rickshaw.Series.FixedDuration([{
        name: 'rand', color: 'blue'
    }], undefined, {
        timeInterval: 50,
        maxDataPoints: 100,
        timeBase: new Date().getTime() / 1000
    })
});

graph.render()

var socket = io.connect('http://localhost');
socket.on('data', function (data) {
  graph.series.addData({rand: data.data});
  graph.render();
});