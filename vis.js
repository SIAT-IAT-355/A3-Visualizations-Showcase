// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // load data
  //const data = await d3.csv("./dataset/videogames_wide.csv");

  const data = await d3.csv("./dataset/videogames_wide.csv", d => ({
    ...d,
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

   // Log the data to confirm the conversion worked
   console.log("Converted Data:", data);



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
  

  // Visualization 2: Sales Over Time by Platform and Genre

  const vlSpec2 = vl
  .markLine()
  .data(data)
  .encode(
    vl.x().fieldT("Year").title("Year"),
    vl.y().fieldQ("Global_Sales").aggregate("sum").title("Global Sales (in millions)"),
    vl.color().fieldN("Platform").title("Platform"),
    vl.detail().fieldN("Genre").title("Genre")
  )
  .width(800)
  .height(400)
  .toSpec();

  vegaEmbed("#view2", vlSpec2).then((result) => {
    result.view.run();
  });

  

  // Visualization 3: Grouped Bar Chart for Regional Sales vs Platform
  const vlSpec3 = vl
    .layer(
      // NA Sales
      vl.markBar({ color: 'blue' })
        .data(filteredData)
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('NA_Sales').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('NA_Sales')])
        ),
      // EU Sales
      vl.markBar({ color: 'red' })
        .data(filteredData)
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('EU_Sales').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('EU_Sales')])
        ),
      // JP Sales
      vl.markBar({ color: 'green' })
        .data(filteredData)
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('JP_Sales').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('JP_Sales')])
        ),
      // Other Sales
      vl.markBar({ color: 'orange' })
        .data(filteredData)
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('Other_Sales').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('Other_Sales')])
        )
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
 