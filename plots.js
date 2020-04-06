function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    console.log(newSample);
  }

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("Ethinicity: " + result.ethnicity);
    PANEL.append("h6").text("Gender: " + result.gender);
    PANEL.append("h6").text("Age: " + result.age);
    PANEL.append("h6").text("Location: " + result.location);
    PANEL.append("h6").text("BBTYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);
  });
};

//sort the bacteria and make a bar chart for top ten bacterial species 
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
     var bacteriaId= data.samples; 
     var sortedBacteria= bacteriaId.sort((a,b) =>
     a - b).reverse(); 

    //select top 10 
    var topTen = sortedBacteria.slice(0,10);

    //create arrays for lable and id 
var topTenLabel = topTen.map(sample => samples.otu_labels);
var topTenId = topTen.map(sample => parseInt(samples.otu_ids));
var topTenValues = topTen.map(sample => samples.sampleValues);

//chart 
var trace = {
  x: topTenValues,
  y: topTenId,
  type: "bar",
  orientation: "h",
  text: topTenLabel,
  marker: {
    color: 'rgb(142,124,195)'
  }
};
var data = [trace];
var layout = {
  title: "Top Ten Bacterial Species",
  xaxis: { title: "" },
  yaxis: { title: ""},
};
Plotly.newPlot("bar", data, layout);
  }
};


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var d3.select("#bubble");
    var bacteriaFrequecny = data.samples
    
    var x = bacteriaFrequecny.map(sample => samples.otu_ids);
    var y = bacteriaFrequecny.map(sample => samples.sample_values);
    var text = bacteriaFrequecny.map(sample => sample.otu_labels);

    var trace1 = {
      x: x,
      y: y,
      text: text,
      mode: 'markers',
      marker: {
        size: y
        sizemode: 'area'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria Frequency',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);