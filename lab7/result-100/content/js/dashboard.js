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

    var data = {"OkPercent": 95.17006802721089, "KoPercent": 4.829931972789115};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.40034013605442176, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.1619718309859155, 500, 1500, "/main/staff/"], "isController": false}, {"data": [0.5, 500, 1500, "/main/other/"], "isController": false}, {"data": [0.4507042253521127, 500, 1500, "/main/vacancies/"], "isController": false}, {"data": [0.4230769230769231, 500, 1500, "/main/coupons/"], "isController": false}, {"data": [0.3873239436619718, 500, 1500, "/main/staff/1/animals/"], "isController": false}, {"data": [0.890625, 500, 1500, "/main/articles/3/"], "isController": false}, {"data": [0.0, 500, 1500, "/main/"], "isController": false}, {"data": [0.3732394366197183, 500, 1500, "/main/questions/"], "isController": false}, {"data": [0.4225352112676056, 500, 1500, "/main/animals/"], "isController": false}, {"data": [0.234375, 500, 1500, "/main/diagram/"], "isController": false}, {"data": [0.328125, 500, 1500, "/main/static_info/"], "isController": false}, {"data": [0.7966101694915254, 500, 1500, "/main/other/scrolling_animation/"], "isController": false}, {"data": [0.4225352112676056, 500, 1500, "/main/placements/"], "isController": false}, {"data": [0.0, 500, 1500, "/main/accounts/logout/"], "isController": false}, {"data": [0.34684684684684686, 500, 1500, "/main/accounts/login/"], "isController": false}, {"data": [0.4375, 500, 1500, "/main/personal/settings/"], "isController": false}, {"data": [0.2826086956521739, 500, 1500, "/main/reviews/"], "isController": false}, {"data": [0.8125, 500, 1500, "/main/articles/"], "isController": false}, {"data": [0.43661971830985913, 500, 1500, "/main/staff/1/placements/"], "isController": false}, {"data": [0.39436619718309857, 500, 1500, "/main/animals/10/"], "isController": false}, {"data": [0.6056338028169014, 500, 1500, "/main/about_us/"], "isController": false}, {"data": [0.4788732394366197, 500, 1500, "/main/placements/4/"], "isController": false}, {"data": [0.44366197183098594, 500, 1500, "/main/staff/1/"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1470, 71, 4.829931972789115, 2828.3326530612235, 4, 48356, 3396.5000000000023, 8295.050000000003, 46815.64, 18.740916392564827, 1621.0254237423187, 3.1973028259580816], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "90th pct", "95th pct", "99th pct", "Throughput", "Received", "Sent"], "items": [{"data": ["/main/staff/", 71, 0, 0.0, 1791.9718309859152, 41, 2905, 2790.7999999999997, 2886.0, 2905.0, 4.729234663291813, 24.782298050023314, 0.5957727261373477], "isController": false}, {"data": ["/main/other/", 61, 2, 3.278688524590164, 1079.44262295082, 83, 4145, 2456.800000000001, 3054.9999999999995, 4145.0, 2.4467530383859453, 21.297021968132043, 0.2981275194536922], "isController": false}, {"data": ["/main/vacancies/", 71, 0, 0.0, 999.3521126760564, 514, 1876, 1499.0, 1723.3999999999996, 1876.0, 4.041669038538168, 31.165057351852905, 0.5249433419195082], "isController": false}, {"data": ["/main/coupons/", 65, 4, 6.153846153846154, 1045.0307692307692, 397, 3015, 2093.6, 2482.8, 3015.0, 2.7844413982179574, 14.695416581883995, 0.33429193529386564], "isController": false}, {"data": ["/main/staff/1/animals/", 71, 0, 0.0, 1173.718309859155, 38, 2238, 2098.0, 2178.2, 2238.0, 4.325312214438013, 23.501989415169053, 0.5871273416082852], "isController": false}, {"data": ["/main/articles/3/", 32, 0, 0.0, 366.15624999999994, 31, 608, 552.7, 598.25, 608.0, 0.6901013586370498, 5.7162497304291575, 0.15500323485011863], "isController": false}, {"data": ["/main/", 100, 29, 29.0, 6263.16, 2284, 17680, 12068.400000000003, 12204.1, 17631.189999999973, 5.434487256127384, 134.75925646024672, 0.6527753247106136], "isController": false}, {"data": ["/main/questions/", 71, 2, 2.816901408450704, 1418.3098591549299, 123, 5016, 1895.6, 2233.399999999998, 5016.0, 3.342277456103187, 26.08897085216307, 0.421876103304618], "isController": false}, {"data": ["/main/animals/", 71, 0, 0.0, 1079.901408450704, 38, 2029, 1939.8, 1982.4, 2029.0, 8.158106400091922, 67.60712003044928, 1.0436640023555097], "isController": false}, {"data": ["/main/diagram/", 32, 0, 0.0, 1804.8125000000002, 180, 3204, 2718.1, 3077.8999999999996, 3204.0, 0.703946500065995, 2477.360283118483, 0.1560506401513485], "isController": false}, {"data": ["/main/static_info/", 32, 0, 0.0, 1492.5312499999998, 90, 3255, 3177.5, 3243.95, 3255.0, 0.713489409141583, 4.2314659977703455, 0.1609531772575251], "isController": false}, {"data": ["/main/other/scrolling_animation/", 59, 3, 5.084745762711864, 578.3898305084746, 4, 3884, 2221.0, 3739.0, 3884.0, 2.491238441075877, 7.08944872112908, 0.3440627243170207], "isController": false}, {"data": ["/main/placements/", 71, 0, 0.0, 1253.1830985915494, 27, 1837, 1660.0, 1707.7999999999995, 1837.0, 5.722575965180946, 33.1730575481583, 0.7488527141936003], "isController": false}, {"data": ["/main/accounts/logout/", 32, 3, 9.375, 7383.375, 2171, 39362, 38916.1, 39248.9, 39362.0, 0.6517842594101353, 18.687061286815627, 0.2609683069903862], "isController": false}, {"data": ["/main/accounts/login/", 111, 24, 21.62162162162162, 17068.540540540536, 13, 48356, 47335.2, 47929.0, 48336.68, 1.7208768720349756, 49.367958067191715, 0.5655711257015287], "isController": false}, {"data": ["/main/personal/settings/", 64, 0, 0.0, 1067.8437500000002, 34, 2814, 1776.5, 2177.0, 2814.0, 1.3756045137023105, 8.143471252015045, 0.5850349274583557], "isController": false}, {"data": ["/main/reviews/", 69, 4, 5.797101449275362, 1638.4057971014497, 103, 4633, 2280.0, 3643.0, 4633.0, 3.0212803222699014, 20.568147454352395, 0.3641049867545319], "isController": false}, {"data": ["/main/articles/", 32, 0, 0.0, 454.93749999999994, 35, 797, 687.2, 792.4499999999999, 797.0, 0.6928056463660179, 5.794805040161077, 0.15425750719868367], "isController": false}, {"data": ["/main/staff/1/placements/", 71, 0, 0.0, 1054.2112676056336, 37, 2269, 1682.0, 1848.9999999999984, 2269.0, 4.171562867215041, 20.796707458137487, 0.5784784444770859], "isController": false}, {"data": ["/main/animals/10/", 71, 0, 0.0, 1408.3661971830986, 56, 2556, 2434.6, 2502.0, 2556.0, 6.37342908438061, 34.58083202423698, 0.8340229465888689], "isController": false}, {"data": ["/main/about_us/", 71, 0, 0.0, 696.4366197183099, 29, 1726, 1351.8, 1401.1999999999994, 1726.0, 10.392271662763465, 144.54797391869147, 1.339628769028103], "isController": false}, {"data": ["/main/placements/4/", 71, 0, 0.0, 1019.1267605633802, 27, 2115, 1353.1999999999998, 1844.5999999999976, 2115.0, 5.376344086021506, 26.91322244623656, 0.7140456989247312], "isController": false}, {"data": ["/main/staff/1/", 71, 0, 0.0, 1054.3943661971828, 41, 2121, 1881.7999999999997, 1992.3999999999996, 2121.0, 4.507078016885673, 25.26428497746461, 0.5765890822383039], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 47, 66.19718309859155, 3.197278911564626], "isController": false}, {"data": ["Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 24, 33.80281690140845, 1.6326530612244898], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1470, 71, "500/Internal Server Error", 47, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 24, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["/main/other/", 61, 2, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/coupons/", 65, 4, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/", 100, 29, "500/Internal Server Error", 29, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/main/questions/", 71, 2, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 2, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/other/scrolling_animation/", 59, 3, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/accounts/logout/", 32, 3, "500/Internal Server Error", 3, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["/main/accounts/login/", 111, 24, "500/Internal Server Error", 15, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 9, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["/main/reviews/", 69, 4, "Non HTTP response code: java.net.ConnectException/Non HTTP response message: Connection refused: connect", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
