// from data.js
var tableData = data;

// Filter data based on criterion
function selectUFOData(tableData){
    var dateValue = document.getElementById("datetime").value;
    var cityValue = document.getElementById("city").value;
    var stateValue = document.getElementById("state").value;
    var countryValue = document.getElementById("country").value;
    var shapeValue = document.getElementById("shape").value;
    
    return (dateValue === "" || tableData.datetime === dateValue) && 
           (cityValue === "" || tableData.city === cityValue) && 
           (stateValue === "" || tableData.state === stateValue) && 
           (countryValue === "" || tableData.country === countryValue) && 
           (shapeValue === "" || tableData.shape === shapeValue);
};

// Cleanup results from UFO table; keeping the header
function cleanupUFOTable(){
    var ufoTable = document.getElementById('ufo-table');
    var tableRows = ufoTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;
   
    for (var x=rowCount-1; x>0; x--) {
        ufoTable.deleteRow(x);
    }
 };

// Add results of filtered data to HTML table
function buildUFOTable(){
    // Filter the data based on filter criterion
    var newTable = tableData.filter(selectUFOData);

    // Populate total sightings 
    document.getElementById("totalUFO").innerHTML = newTable.length;

    // Reference the ufo-table body and clear table's content
    ufoTableBody = document.getElementById("ufo-table").getElementsByTagName("tbody")[0];
    cleanupUFOTable();
    
    // Loop thru each returned sighting and populate the ufo-table
    newTable.forEach((ufo) => {
        var newRow = ufoTableBody.insertRow(ufoTableBody.rows.length);
        Object.values(ufo).forEach((value) =>{
            var newCell = newRow.insertCell(newRow.cells.length);
            newCell.innerHTML = value;
        });
    });
};

function resetUFOTable(){
    // Delete all table rows
    cleanupUFOTable();

    // Cleanup all the fileter values
    document.getElementById("datetime").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("country").value = "";
    document.getElementById("shape").value = "";

     // Cleanup total 
    document.getElementById("totalUFO").innerHTML = "";
};