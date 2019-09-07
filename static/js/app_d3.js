// from data.js
var tableData = data;
d3.select("#search-btn").on("click", buildUFOTable);
d3.select("#reset-btn").on("click", resetUFOTable);

// Filter data based on criterion
function selectUFOData(tableData){
    var dateValue = d3.select("#datetime").property("value");
    var cityValue = d3.select("#city").property("value");
    var stateValue = d3.select("#state").property("value");
    var countryValue = d3.select("#country").property("value");
    var shapeValue = d3.select("#shape").property("value");
    
    return (dateValue === "" || tableData.datetime === dateValue) && 
           (cityValue === "" || tableData.city === cityValue) && 
           (stateValue === "" || tableData.state === stateValue) && 
           (countryValue === "" || tableData.country === countryValue) && 
           (shapeValue === "" || tableData.shape === shapeValue);
};

// Add results of filtered data to HTML table
function buildUFOTable(){
    // Filter the data based on filter criterion
    var newTable = tableData.filter(selectUFOData);

    // Populate total sightings 
    d3.select("#totalUFO").text(newTable.length);

    // Reference the ufo-table body and clear table's content
    ufoTableBody = d3.select("tbody");
    ufoTableBody.selectAll("tr").remove();
    
    // Loop thru each returned sighting and populate the ufo-table
    newTable.forEach((ufo) => {
        var newRow = ufoTableBody.append("tr");
        Object.values(ufo).forEach((value) =>{
            var newCell = newRow.append("td");
            newCell.text(value);
        });
    });
};

function resetUFOTable(){
    // Delete all table rows
    d3.select("tbody").selectAll("tr").remove();

    // Cleanup all the fileter values
    d3.select("#datetime").property("value","");
    d3.select("#city").property("value","");
    d3.select("#state").property("value","");
    d3.select("#country").property("value","");
    d3.select("#shape").property("value","");

    // Cleanup total 
    d3.select("#totalUFO").text("");
};