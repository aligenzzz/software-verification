/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 58.29858215179316, "KoPercent": 41.70141784820684};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.31442869057547956, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "/main/staff/"], "isController": false}, {"data": [0.8641975308641975, 500, 1500, "/main/other/"], "isController": false}, {"data": [0.5555555555555556, 500, 1500, "/main/vacancies/"], "isController": false}, {"data": [0.6481481481481481, 500, 1500, "/main/coupons/"], "isController": false}, {"data": [0.6790123456790124, 500, 1500, "/main/staff/1/animals/"], "isController": false}, {"data": [0.0, 500, 1500, "/main/"], "isController": false}, {"data": [0.6975308641975309, 500, 1500, "/main/questions/"], "isController": false}, {"data": [0.3132530120481928, 500, 1500, "/main/animals/"], "isController": false}, {"data": [0.845679012345679, 500, 1500, "/main/other/scrolling_animation/"], "isController": false}, {"data": [0.5185185185185185, 500, 1500, "/main/placements/"], "isController": false}, {"data": [0.29012345679012347, 500, 1500, "/main/accounts/login/"], "isController": false}, {"data": [0.6975308641975309, 500, 1500, "/main/reviews/"], "isController": false}, {"data": [0.6604938271604939, 500, 1500, "/main/staff/1/placements/"], "isController": false}, {"data": [0.5246913580246914, 500, 1500, "/main/animals/10/"], "isController": false}, {"data": [0.045, 500, 1500, "/main/about_us/"], "isController": false}, {"data": [0.6419753086419753, 500, 1500, "/main/placements/4/"], "isController": false}, {"data": [0.5185185185185185, 500, 1500, "/main/staff/1/"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2398, 1000, 41.70141784820684, 1919.8786488740602, 10, 10182, 4186.799999999998, 7142.249999999998, 8928.369999999992, 75.12295980702359, 718.8141537408759, 7.5725888717458725], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/main/staff/", 81, 0, 0.0, 939.3703703703706, 283, 2131, 1213.6, 1393.5999999999988, 2131.0, 7.879377431906614, 41.28978447227627, 0.9926168835116732], "isController": false}, {"data": ["/main/other/", 81, 0, 0.0, 481.4074074074074, 23, 992, 752.4, 841.5999999999999, 992.0, 13.518024032042725, 120.69852902828772, 1.7029541993491322], "isController": false}, {"data": ["/main/vacancies/", 81, 0, 0.0, 676.679012345679, 169, 1020, 873.8, 976.8, 1020.0, 12.383427610457115, 95.48783634000917, 1.6083944064363247], "isController": false}, {"data": ["/main/coupons/", 81, 0, 0.0, 547.7654320987655, 38, 833, 775.0, 795.0, 833.0, 13.687056437985808, 75.10504895023657, 1.7509808529063873], "isController": false}, {"data": ["/main/staff/1/animals/", 81, 0, 0.0, 580.222222222222, 280, 1184, 801.8, 946.0999999999998, 1184.0, 12.026726057906458, 65.34834354120267, 1.6325341035634744], "isController": false}, {"data": ["/main/", 1000, 900, 90.0, 2795.2369999999974, 1890, 10182, 6269.399999999997, 7640.249999999999, 8608.300000000001, 93.25748391308403, 840.244465751189, 2.195558029469365], "isController": false}, {"data": ["/main/questions/", 81, 0, 0.0, 469.0617283950616, 43, 886, 742.4, 767.6999999999999, 886.0, 13.574660633484163, 108.21284643665159, 1.763115101809955], "isController": false}, {"data": ["/main/animals/", 83, 2, 2.4096385542168677, 2135.6144578313256, 41, 5837, 4366.000000000001, 5327.199999999999, 5837.0, 8.417849898580121, 68.50080818965517, 1.0509436802738337], "isController": false}, {"data": ["/main/other/scrolling_animation/", 81, 0, 0.0, 495.61728395061726, 14, 4185, 870.8, 879.6999999999999, 4185.0, 8.819686411149826, 25.459954132186414, 1.2833332766223868], "isController": false}, {"data": ["/main/placements/", 81, 0, 0.0, 854.493827160494, 68, 5263, 1027.0, 1145.6, 5263.0, 8.924636403702072, 51.735001652710444, 1.1678723418907007], "isController": false}, {"data": ["/main/accounts/login/", 162, 81, 50.0, 3945.5185185185196, 10, 9607, 9001.4, 9222.449999999999, 9587.47, 9.844433641225084, 351.6236241720345, 3.561818257778318], "isController": false}, {"data": ["/main/reviews/", 81, 0, 0.0, 513.9506172839505, 40, 931, 834.4, 877.1999999999998, 931.0, 13.46633416458853, 95.59256156483791, 1.7227439214463842], "isController": false}, {"data": ["/main/staff/1/placements/", 81, 0, 0.0, 637.7530864197529, 278, 1261, 924.8, 964.6999999999998, 1261.0, 12.763945792625275, 63.632757100929716, 1.7700002954617082], "isController": false}, {"data": ["/main/animals/10/", 81, 0, 0.0, 836.9259259259258, 122, 3650, 941.8, 1012.7999999999995, 3650.0, 9.152542372881356, 49.65969279661017, 1.1976959745762712], "isController": false}, {"data": ["/main/about_us/", 100, 17, 17.0, 3022.2799999999984, 663, 5954, 4466.800000000001, 4972.25, 5951.749999999999, 10.66894270777766, 126.94333124399873, 1.1414935186173052], "isController": false}, {"data": ["/main/placements/4/", 81, 0, 0.0, 669.5555555555554, 25, 3884, 929.4, 1027.6999999999998, 3884.0, 8.55422959129792, 42.82127039550111, 1.136108617594255], "isController": false}, {"data": ["/main/staff/1/", 81, 0, 0.0, 815.3950617283947, 305, 3986, 942.9999999999998, 3453.5999999999767, 3986.0, 8.445417578980294, 47.3405243196747, 1.0804196316859556], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Percentile 1
            case 8:
            // Percentile 2
            case 9:
            // Percentile 3
            case 10:
            // Throughput
            case 11:
            // Kbytes/s
            case 12:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 175, 17.5, 7.297748123436197], "isController": false}, {"data": ["Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 825, 82.5, 34.403669724770644], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2398, 1000, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 825, "500/Internal Server Error", 175, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/", 1000, 900, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 804, "500/Internal Server Error", 96, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/animals/", 83, 2, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/accounts/login/", 162, 81, "500/Internal Server Error", 79, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 2, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/about_us/", 100, 17, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 17, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
