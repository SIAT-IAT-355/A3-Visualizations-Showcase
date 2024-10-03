// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // load data
  const data = await d3.csv("./dataset/videogames_wide.csv");

  // create a bar chart
  /*
  const vlSpec = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum")
    )
    .width("container")
    .height(400)
    .toSpec();

  vegaEmbed("#view", vlSpec).then((result) => {
    const view = result.view;
    view.run();
  });
*/

  // Visualization 1: Global Sales by Genre and Platform
  /*
  const vlSpec1 = vl
    .markBar()
    .data(data)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Genre")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view1", vlSpec1).then((result) => {
    result.view.run();
  });
*/
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
  /*
  const vlSpec2 = vl
    .markLine()
    .data(data)
    .encode(
      vl.x().fieldT("Year"),
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Platform")
    )
    .width(800)
    .height(400)
    .toSpec();

  vegaEmbed("#view2", vlSpec2).then((result) => {
    result.view.run();
  });*/

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


  
    // Visualization 3: Simple Grouped Bar Chart for Regional Sales vs Platform
    const vlSpec3 = vl
    .layer(
      // NA Sales
      vl.markBar({ color: 'blue' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('NA_Sales').aggregate('sum').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('NA_Sales').title('NA Sales')])
        ),
      // EU Sales
      vl.markBar({ color: 'red' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('EU_Sales').aggregate('sum').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('EU_Sales').title('EU Sales')])
        ),
      // JP Sales
      vl.markBar({ color: 'green' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('JP_Sales').aggregate('sum').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('JP_Sales').title('JP Sales')])
        ),
      // Other Sales
      vl.markBar({ color: 'orange' })
        .encode(
          vl.x().fieldN('Platform').title('Platform'),
          vl.y().fieldQ('Other_Sales').aggregate('sum').title('Sales (in millions)'),
          vl.tooltip([vl.fieldN('Platform'), vl.fieldQ('Other_Sales').title('Other Sales')])
        )
    )
    .width(800)
    .height(400)
    .toSpec();

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
 