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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.892, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "/main/staff/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/other/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/vacancies/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/coupons/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/staff/1/animals/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/articles/3/"], "isController": false}, {"data": [0.2, 500, 1500, "/main/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/questions/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/animals/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/diagram/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/static_info/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/other/scrolling_animation/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/placements/"], "isController": false}, {"data": [0.1, 500, 1500, "/main/accounts/logout/"], "isController": false}, {"data": [0.5, 500, 1500, "/main/accounts/login/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/personal/settings/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/reviews/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/articles/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/staff/1/placements/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/animals/10/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/about_us/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/placements/4/"], "isController": false}, {"data": [1.0, 500, 1500, "/main/staff/1/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 250, 0, 0.0, 287.12, 5, 3475, 1480.3000000000002, 1779.0, 2841.1100000000006, 29.205607476635514, 4294.678647050234, 5.795829986857476], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/main/staff/", 10, 0, 0.0, 97.4, 22, 230, 224.20000000000002, 230.0, 230.0, 6.30119722747322, 33.01975031505986, 0.7938031663516069], "isController": false}, {"data": ["/main/other/", 10, 0, 0.0, 37.5, 5, 86, 85.4, 86.0, 86.0, 4.814636494944632, 42.9884975324988, 0.6065313553201733], "isController": false}, {"data": ["/main/vacancies/", 10, 0, 0.0, 87.69999999999999, 16, 136, 134.10000000000002, 136.0, 136.0, 5.274261603375527, 40.669501582278485, 0.6850359309071731], "isController": false}, {"data": ["/main/coupons/", 10, 0, 0.0, 71.80000000000001, 10, 98, 97.4, 98.0, 98.0, 4.833252779120348, 26.521530630739488, 0.6183165176413726], "isController": false}, {"data": ["/main/staff/1/animals/", 10, 0, 0.0, 88.8, 12, 145, 143.70000000000002, 145.0, 145.0, 5.6657223796034, 30.78523371104816, 0.7690775495750709], "isController": false}, {"data": ["/main/articles/3/", 10, 0, 0.0, 12.2, 5, 24, 23.300000000000004, 24.0, 24.0, 3.5906642728904847, 29.742201526032314, 0.8064968581687612], "isController": false}, {"data": ["/main/", 10, 0, 0.0, 1549.8999999999999, 1328, 1772, 1761.0, 1772.0, 1772.0, 4.096681687832856, 26.465603876485048, 0.4920818824252356], "isController": false}, {"data": ["/main/questions/", 10, 0, 0.0, 89.4, 11, 134, 133.8, 134.0, 134.0, 5.070993914807302, 40.42433918610548, 0.6586349518255579], "isController": false}, {"data": ["/main/animals/", 10, 0, 0.0, 49.2, 12, 111, 107.4, 111.0, 111.0, 8.23045267489712, 68.20666152263374, 1.0529192386831274], "isController": false}, {"data": ["/main/diagram/", 10, 0, 0.0, 109.50000000000001, 70, 189, 184.3, 189.0, 189.0, 3.2711808963035653, 11512.087396753353, 0.7251543588485443], "isController": false}, {"data": ["/main/static_info/", 10, 0, 0.0, 43.900000000000006, 24, 75, 74.5, 75.0, 75.0, 3.3444816053511706, 19.834996864548494, 0.7544680183946487], "isController": false}, {"data": ["/main/other/scrolling_animation/", 10, 0, 0.0, 32.9, 5, 64, 63.5, 64.0, 64.0, 4.752851711026616, 13.720146150190114, 0.691577055608365], "isController": false}, {"data": ["/main/placements/", 10, 0, 0.0, 54.900000000000006, 14, 108, 105.5, 108.0, 108.0, 6.802721088435374, 39.43452380952381, 0.8901998299319728], "isController": false}, {"data": ["/main/accounts/logout/", 10, 0, 0.0, 1618.3, 1244, 1880, 1869.9, 1880.0, 1880.0, 2.4962556165751373, 17.323380164128807, 0.9994773464802795], "isController": false}, {"data": ["/main/accounts/login/", 20, 0, 0.0, 1337.9, 11, 3475, 2857.1, 3444.2999999999997, 3475.0, 3.5637918745545263, 16.733464562544548, 1.2986610722558802], "isController": false}, {"data": ["/main/personal/settings/", 20, 0, 0.0, 33.75, 9, 168, 57.30000000000001, 162.49999999999991, 168.0, 6.684491978609626, 39.6304207052139, 2.842867438168449], "isController": false}, {"data": ["/main/reviews/", 10, 0, 0.0, 66.19999999999999, 13, 126, 125.4, 126.0, 126.0, 5.005005005005005, 35.52869275525526, 0.6402887262262262], "isController": false}, {"data": ["/main/articles/", 10, 0, 0.0, 24.099999999999998, 8, 56, 55.0, 56.0, 56.0, 3.5561877667140824, 29.744871310455192, 0.7918074324324325], "isController": false}, {"data": ["/main/staff/1/placements/", 10, 0, 0.0, 94.0, 16, 126, 125.6, 126.0, 126.0, 5.411255411255411, 26.977010619588743, 0.7503889339826839], "isController": false}, {"data": ["/main/animals/10/", 10, 0, 0.0, 130.70000000000002, 25, 270, 267.40000000000003, 270.0, 270.0, 7.022471910112359, 38.10239641853933, 0.9189562851123596], "isController": false}, {"data": ["/main/about_us/", 10, 0, 0.0, 26.7, 6, 44, 44.0, 44.0, 44.0, 8.680555555555555, 120.73940700954861, 1.1189778645833335], "isController": false}, {"data": ["/main/placements/4/", 10, 0, 0.0, 59.0, 10, 109, 106.5, 109.0, 109.0, 6.51890482398957, 32.63272082790091, 0.8657920469361147], "isController": false}, {"data": ["/main/staff/1/", 10, 0, 0.0, 90.6, 13, 189, 185.8, 189.0, 189.0, 5.938242280285036, 33.28663153206651, 0.759677479216152], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 250, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
