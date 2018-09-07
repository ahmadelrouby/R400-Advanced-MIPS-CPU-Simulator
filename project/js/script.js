var rf_table = document.getElementById("rf");
var mem_table = document.getElementById("mem");
var iram_table = document.getElementById("iram");

for(i = 1 ; i< 32; i++){
   var row =  rf_table.insertRow();
    row.insertCell(0).innerHTML = i;
    row.insertCell(1).innerHTML = 0;
}


for(i = 1 ; i< 256; i++){
   var row =  mem_table.insertRow();
    row.insertCell(0).innerHTML = i;
    row.insertCell(1).innerHTML = 0;
}

for(i = 1 ; i< 256; i++){
   var row =  iram_table.insertRow();
    row.insertCell(0).innerHTML = i*4;
    row.insertCell(1).innerHTML = 0;
    row.insertCell(2).innerHTML = "N/A";
}