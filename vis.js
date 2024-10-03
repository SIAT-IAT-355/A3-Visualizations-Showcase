// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // load dat

  const data = await d3.csv("./dataset/videogames_wide.csv", d => ({
    ...d,

    Year: +d.Year,  // Convert Year to number
    Global_Sales: +d.Global_Sales,  // Convert Global Sales to number


    NA_Sales: +d.NA_Sales,  // Convert to number
    EU_Sales: +d.EU_Sales,  // Convert to number
    JP_Sales: +d.JP_Sales,  // Convert to number
    Other_Sales: +d.Other_Sales  // Convert to number

    
  }));

  // Filter out rows where any sales data is invalid (NaN or 0)
  const filteredData = data.filter(d => 
    !isNaN(d.NA_Sales) && !isNaN(d.EU_Sales) && !isNaN(d.JP_Sales) && !isNaN(d.Other_Sales) &&
    d.NA_Sales > 0 && d.EU_Sales > 0 && d.JP_Sales > 0 && d.Other_Sales > 0
  );

    // Add a field for the region and respective sales in the data
  const transformedData = filteredData.flatMap(d => [
    { Platform: d.Platform, Region: 'NA_Sales', Sales: d.NA_Sales },
    { Platform: d.Platform, Region: 'EU_Sales', Sales: d.EU_Sales },
    { Platform: d.Platform, Region: 'JP_Sales', Sales: d.JP_Sales },
    { Platform: d.Platform, Region: 'Other_Sales', Sales: d.Other_Sales }
  ]);

  const filteredDatayear = data.filter(d => !isNaN(d.Year) && d.Year > 1900); 


  // Visualization 1: Global Sales by Genre and Platform
  
  const vlSpec1 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("Genre").sort("-y").title("Genre"),
      vl.y().fieldQ("Global_Sales").aggregate("sum").title("Global Sales (in millions)"),
      vl.color().fieldN("Platform").title("Platform")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view1", vlSpec1).then((result) => {
  result.view.run();
  });
  

  
  // Visualization 2: Interactive Sales Over Time by Platform and Genre

  const vlSpec2 = vl
    .markArea({ line: true })  // Stacked area chart with line borders
    .data(filteredData)
    .encode(
      vl.x().fieldQ('Year').title('Year').axis({ tickCount: 10 }),  // Treat Year as a quantitative field
      vl.y().fieldQ('Global_Sales').aggregate('sum').title('Global Sales (in millions)'),  // Sales on y-axis
      vl.color().fieldN('Platform').scale({ scheme: 'category20' }).title('Platform'),  // Unique color for each platform
      vl.detail().fieldN('Genre').title('Genre'),  // Label genres
      vl.tooltip([vl.fieldN('Platform'), vl.fieldN('Genre'), vl.fieldQ('Global_Sales')])  // Tooltip with platform, genre, and sales
    )
    .width(800)
    .height(400)
    .toSpec();

// Embed the visualization in the specified div (view2)
vegaEmbed("#view2", vlSpec2).then((result) => {
    result.view.run();
});


 // Visualization 3: Grouped Bar Chart for Regional Sales vs Platform with Legend
 const vlSpec3 = vl
 .markBar()
 .data(transformedData)
 .encode(
   vl.x().fieldN('Platform').title('Platform'),
   vl.y().fieldQ('Sales').title('Sales (in millions)'),
   vl.color().fieldN('Region').scale({
     domain: ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'],
     range: ['blue', 'red', 'green', 'orange']
   }).title('Region'),  // Add legend for regions
   vl.tooltip([vl.fieldN('Platform'), vl.fieldN('Region'), vl.fieldQ('Sales')])
 )
 .width(800)
 .height(400)
 .toSpec();

// Embed the visualization in the specified div (view3)
vegaEmbed("#view3", vlSpec3).then((result) => {
 result.view.run();
});



  // Visualization 4: Japan Sales by Genre
  
  const vlSpec4 = vl
    .markBar({ color: "purple" })
    .data(data)
    .encode(
      vl.x().fieldN("Genre"),
      vl.y().fieldQ("JP_Sales").aggregate("sum")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view4", vlSpec4).then((result) => {
    result.view.run();
  });

  

}

render();
 