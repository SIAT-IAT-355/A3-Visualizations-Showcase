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

   // Log the data to confirm the conversion worked
   console.log("Converted Data:", data);



  // Visualization 1: Global Sales by Genre and Platform
  /*
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
  */

  // Visualization 2: Sales Over Time by Platform and Genre
/*
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
*/
  // Visualization 3: Regional Sales vs Platform
  /*
  const vlSpec3 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("Platform").sort("-x"),
      vl.y().fieldQ("NA_Sales").aggregate("sum").title("Sales in Millions"),
      vl.color().fieldN("Platform")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view3", vlSpec3).then((result) => {
    result.view.run();
  });*/


  
  
  // Visualization 3: Simple Grouped Bar Chart for NA and EU Sales
  // Visualization 3: Regional Sales vs Platform (Grouped Bar Chart)

  // Visualization 3: Simple Grouped Bar Chart for NA and EU Sales
  const vlSpec3 = vl
    .layer(
      // NA Sales
      vl.markBar({ color: 'blue' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('NA_Sales').title('Sales in Millions'),  // Correct axis title placement
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('NA_Sales')])
        ),
      // EU Sales
      vl.markBar({ color: 'red' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('EU_Sales').title('Sales in Millions'),  // Correct axis title placement
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('EU_Sales')])
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
  /*
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
*/
  

}

render();
 