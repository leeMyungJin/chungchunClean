import * as core from '@grapecity/wijmo';
//
export function getData() {
    let strings = getDataSource().split(/\r\n|\n|\r/);
    let len = strings.length;
    //
    let items = [];
    let names = [];
    for (let i = 0; i < len; i++) {
        let s = strings[i];
        if (s && s.length) {
            let sdata = s.split(',');
            let slen = sdata.length;
            if (i == 0) {
                for (let j = 0; j < slen; j++) {
                    names.push(sdata[j]);
                }
            }
            else {
                let item = {};
                for (let j = 0; j < slen; j++) {
                    if (j == 0) {
                        item[names[j]] = core.Globalize.parseDate(sdata[j], 'yyyy-MM-dd');
                    }
                    else {
                        let num = parseFloat(sdata[j]);
                        item[names[j]] = isNaN(num) ? sdata[j] : num;
                    }
                }
                items.push(item);
            }
        }
    }
    //
    return items;
}
//
function getDataSource() {
    return `Date,MaxTemp,MeanTemp,MinTemp,DewPoint,MeanDewPoint,MinDewpoint,MaxHumidity,MeanHumidity,MinHumidity,MaxPressure,MeanPressure,MinPressure,MaxVisibility,MeanVisibility,MinVisibility,MaxWindSpeed,MeanWindSpeed,MaxGustSpeed,Precipitation,CloudCover,Events,WindDirDegrees
    2013-1-1,8,7,6,8,5,2,97,85,72,1011,1003,998,24,10,5,39,26,,2.03,5,Rain,261
    2013-1-2,8,7,4,7,5,3,100,86,77,1024,1020,1011,24,11,3,29,19,,0.51,4,Rain,251
    2013-1-3,11,9,7,10,9,7,100,93,85,1034,1029,1023,19,9,2,32,24,,0.00,6,Rain,253
    2013-1-4,9,9,8,9,8,7,100,92,87,1035,1034,1033,16,9,5,26,23,,0.00,7,,270
    2013-1-5,9,8,7,8,7,6,100,93,86,1034,1033,1031,14,8,4,24,16,,0.25,7,,268
    2013-1-6,11,8,5,9,7,5,100,94,84,1031,1030,1029,11,8,0,23,14,,0.00,5,Fog,279
    2013-1-7,8,7,5,8,7,6,100,96,83,1030,1027,1025,21,4,2,26,14,,0.00,7,Fog-Rain,220
    2013-1-8,9,8,6,8,7,5,100,93,86,1025,1024,1022,11,6,2,24,21,,0.51,7,Rain,223
    2013-1-9,8,6,3,8,6,2,100,94,80,1022,1019,1017,18,7,2,24,16,,4.06,6,Rain,262
    2013-1-10,8,4,0,5,4,-2,93,86,72,1016,1013,1011,29,11,6,26,14,,3.05,5,Rain,287
    2013-1-11,2,0,-2,-1,-2,-3,93,84,70,1019,1017,1014,31,12,10,23,10,,0.00,5,Rain-Snow,188
    2013-1-12,3,1,-2,-1,-3,-5,93,77,56,1019,1017,1017,29,12,10,21,13,,0.00,3,Snow,122
    2013-1-13,1,-1,-4,-3,-4,-6,86,78,55,1020,1019,1018,31,13,10,21,14,,0.00,2,Snow,63
    2013-1-14,-2,-4,-6,-3,-5,-7,93,84,74,1018,1013,1006,18,9,2,23,11,,0.00,4,Snow,132
    2013-1-15,-2,-2,-3,-3,-4,-8,100,84,56,1010,1007,1004,23,5,1,24,19,39,3.05,5,Snow,50
    2013-1-16,-1,-6,-11,-4,-7,-10,100,87,58,1016,1012,1010,21,7,0,16,6,,0.00,3,Fog,28
    2013-1-17,-3,-7,-9,-4,-6,-7,100,90,82,1020,1019,1016,5,3,3,13,6,,0.00,6,Snow,114
    2013-1-18,-1,-3,-5,-3,-4,-5,93,81,71,1017,1010,1003,11,8,4,24,14,,0.00,6,Snow,95
    2013-1-19,-3,-4,-5,-5,-7,-9,86,76,63,1003,1000,999,13,10,9,32,24,,0.00,8,Snow,83
    2013-1-20,-3,-4,-6,-5,-7,-9,86,81,65,1000,996,993,14,7,0,34,27,53,1.02,8,Snow,76
    2013-1-21,-2,-3,-4,-3,-3,-5,93,89,80,1002,998,994,5,3,2,23,18,,0.25,6,Rain-Snow,98
    2013-1-22,-3,-5,-7,-4,-6,-8,93,84,74,1008,1005,1002,9,7,5,14,11,,0.00,3,,73
    2013-1-23,-3,-6,-8,-6,-7,-9,93,83,68,1012,1010,1008,11,7,5,23,10,,0.00,5,,69
    2013-1-24,-1,-4,-8,-5,-6,-8,100,81,52,1021,1016,1012,31,9,1,21,11,,0.00,5,Fog,59
    2013-1-25,-2,-6,-10,-5,-7,-11,100,86,70,1021,1018,1010,13,8,5,35,8,,0.00,6,Fog,144
    2013-1-26,1,-2,-4,0,-3,-6,100,87,72,1010,1008,1007,11,7,1,29,26,,1.02,6,Snow,183
    2013-1-27,6,2,-2,5,2,0,93,91,81,1007,1000,995,14,8,5,39,26,,3.05,5,Rain-Snow,196
    2013-1-28,8,4,1,6,3,0,100,87,74,1011,1006,1001,26,10,5,48,23,69,2.03,3,Rain,208
    2013-1-29,13,9,5,11,9,7,100,91,81,1005,1003,1001,31,11,3,64,40,90,2.03,5,Rain,232
    2013-1-30,12,10,8,11,7,3,94,82,61,1010,1003,999,26,9,3,61,48,85,1.02,4,Rain,240
    2013-1-31,9,8,6,7,4,2,87,77,60,1013,1009,1005,18,10,6,53,39,76,4.06,4,Rain,241
    2013-2-1,7,4,2,5,4,2,100,89,73,1009,1001,995,16,10,8,40,24,60,4.06,5,Rain,257
    2013-2-2,6,4,2,3,1,-1,100,81,56,1017,1007,996,31,11,10,39,18,58,0.25,3,Rain,333
    2013-2-3,7,4,1,6,2,-1,93,85,61,1019,1014,1009,31,11,3,42,21,66,0.25,4,Rain,264
    2013-2-4,9,8,6,7,4,1,100,80,56,1009,1007,1005,19,10,3,45,32,58,0.51,4,Rain,257
    2013-2-5,5,3,1,3,0,-2,100,77,58,1005,997,993,31,11,3,42,34,48,0.25,4,Rain-Snow-Thunderstorm,243
    2013-2-6,5,2,0,2,1,-1,100,88,70,1007,999,991,26,9,1,26,18,42,0.25,4,Rain-Snow,358
    2013-2-7,5,2,0,2,1,-1,93,87,73,1012,1010,1007,31,11,6,39,19,60,2.03,2,Rain-Snow,323
    2013-2-8,4,2,-1,1,-1,-3,100,86,49,1019,1015,1011,31,10,3,29,11,,0.00,3,Rain-Snow-Thunderstorm,344
    2013-2-9,2,-1,-4,0,-1,-3,100,94,74,1020,1018,1014,18,8,1,19,8,,2.03,5,Rain-Snow,158
    2013-2-10,1,-1,-2,0,-3,-7,100,83,63,1014,1008,1002,27,9,2,29,21,,0.00,7,Rain-Snow,146
    2013-2-11,1,-1,-3,-5,-7,-8,80,67,47,1008,1003,1000,31,17,10,32,27,,0.00,4,,91
    2013-2-12,1,-1,-3,-2,-5,-6,87,72,52,1020,1015,1009,14,10,8,26,19,,0.00,4,Snow,61
    2013-2-13,2,-1,-4,-3,-4,-5,93,77,52,1026,1024,1020,31,11,6,21,11,,0.00,3,,124
    2013-2-14,2,0,-2,1,-3,-6,100,84,60,1023,1015,1010,10,5,1,37,24,,1.02,7,Fog-Rain-Snow,164
    2013-2-15,7,3,0,5,3,1,100,94,82,1021,1016,1012,13,7,1,21,11,,0.25,5,Fog-Rain,248
    2013-2-16,8,6,4,6,4,3,100,93,79,1025,1023,1021,26,8,3,13,8,,0.00,4,Fog-Rain,299
    2013-2-17,7,4,1,4,1,-1,100,85,66,1025,1024,1023,14,8,3,14,10,,0.00,4,,91
    2013-2-18,7,2,-2,2,1,-2,100,87,57,1023,1022,1020,13,6,3,11,6,,0.00,3,Fog,43
    2013-2-19,6,2,-2,4,1,-2,100,87,69,1021,1019,1017,10,8,3,24,10,,0.25,6,Rain,331
    2013-2-20,2,0,-2,-2,-4,-7,86,71,46,1027,1025,1022,31,11,10,27,21,,0.00,4,,67
    2013-2-21,2,-1,-3,-4,-6,-9,86,67,43,1027,1025,1023,31,11,10,26,18,,0.00,3,,58
    2013-2-22,1,-1,-4,-4,-6,-9,86,70,46,1023,1020,1018,31,12,10,32,19,,0.00,4,,55
    2013-2-23,1,-2,-4,-4,-6,-9,75,67,51,1020,1019,1018,26,10,7,37,23,48,0.00,6,Snow,44
    2013-2-24,1,0,-1,0,-1,-3,93,88,78,1021,1019,1018,10,7,2,29,24,47,1.02,7,Rain-Snow,24
    2013-2-25,3,2,1,2,1,0,93,90,85,1027,1024,1021,7,5,3,29,21,47,0.00,8,Rain,35
    2013-2-26,4,2,1,2,1,0,100,91,81,1034,1032,1027,6,4,2,27,19,,0.00,7,,53
    2013-2-27,3,1,0,0,-1,-2,93,85,67,1034,1033,1032,10,7,3,27,21,,0.00,7,,50
    2013-2-28,3,1,-1,1,0,-1,100,88,73,1031,1029,1028,26,7,2,21,10,,0.00,7,,42
    2013-3-1,5,3,2,3,1,-1,100,79,57,1028,1027,1026,21,10,0,24,11,,0.00,7,Fog,4
    2013-3-2,4,3,2,0,-1,-2,81,73,56,1028,1026,1024,31,12,10,19,11,,0.00,7,,342
    2013-3-3,6,4,1,5,2,-2,100,82,50,1025,1024,1023,31,10,1,18,10,,0.00,7,Fog-Rain,10
    2013-3-4,11,4,-2,1,-1,-4,87,68,38,1023,1017,1011,24,18,11,21,13,,0.00,,,108
    2013-3-5,16,9,2,3,1,-2,75,58,30,1011,1008,1005,26,19,13,24,18,,0.00,8,,146
    2013-3-6,16,10,4,4,2,0,71,54,30,1005,1003,1001,21,16,13,23,10,,0.00,8,,98
    2013-3-7,11,9,7,5,3,2,87,68,50,1001,999,998,14,8,5,21,16,,0.51,5,Rain,77
    2013-3-8,12,9,5,7,6,4,100,83,69,1000,998,998,7,5,3,23,16,,1.02,5,Rain,70
    2013-3-9,4,3,1,5,3,1,100,95,92,1000,998,997,11,7,2,21,16,,11.94,7,Rain-Snow,57
    2013-3-10,1,0,-1,0,-2,-6,100,82,61,1007,1003,1000,31,9,2,32,19,48,0.00,6,Rain-Snow,35
    2013-3-11,-1,-2,-2,-5,-6,-7,80,72,59,1009,1008,1007,31,11,7,37,31,52,0.00,6,Rain-Snow,53
    2013-3-12,1,-2,-5,-6,-8,-11,86,61,33,1009,1007,1006,10,10,10,40,31,,0.00,2,,37
    2013-3-13,6,0,-7,0,-4,-8,93,74,41,1009,1006,1005,31,10,4,26,10,,0.25,3,Snow,273
    2013-3-14,4,-1,-6,-1,-4,-7,100,74,37,1015,1013,1008,24,11,2,23,11,,0.00,2,Rain-Snow,345
    2013-3-15,3,-1,-4,1,-2,-6,100,84,63,1015,1012,1009,31,10,2,32,16,,3.05,5,Rain-Snow,176
    2013-3-16,7,4,1,1,-1,-5,93,66,38,1009,1004,1000,31,12,9,40,29,,0.00,4,Rain,160
    2013-3-17,9,6,3,5,2,-3,100,78,52,1000,995,991,31,11,6,34,24,52,2.03,6,Rain,138
    2013-3-18,9,6,3,4,3,1,100,83,54,993,992,989,29,10,3,32,16,,1.02,5,Rain,182
    2013-3-19,6,3,0,3,1,-1,100,85,69,1002,997,993,11,5,2,24,13,,0.00,6,Fog-Rain,80
    2013-3-20,2,1,0,-1,-3,-4,87,76,61,1014,1006,1001,26,10,7,34,21,,0.00,7,,46
    2013-3-21,5,1,-4,0,-3,-5,93,78,53,1021,1018,1015,24,11,10,21,8,,0.51,4,Rain-Snow,13
    2013-3-22,4,0,-3,-2,-4,-6,93,72,49,1021,1017,1015,31,11,6,40,24,58,0.00,2,Thunderstorm,83
    2013-3-23,3,0,-2,-5,-8,-13,75,53,28,1017,1015,1014,31,13,10,48,37,69,0.00,3,,86
    2013-3-24,3,-1,-4,-11,-14,-17,51,34,12,1017,1016,1015,31,31,31,45,35,66,0.00,8,,81
    2013-3-25,4,1,-3,-9,-10,-11,59,45,22,1017,1016,1014,26,26,26,42,34,61,0.00,8,,70
    2013-3-26,5,1,-3,-8,-9,-11,69,48,22,1016,1014,1013,31,29,27,40,29,58,0.00,8,,68
    2013-3-27,6,1,-4,-7,-8,-11,74,50,19,1014,1012,1010,31,29,27,32,21,,0.00,,,74
    2013-3-28,3,0,-3,-3,-6,-9,93,63,41,1012,1011,1010,27,10,5,29,19,,0.00,4,Snow,50
    2013-3-29,3,0,-3,-2,-3,-5,93,79,48,1011,1009,1008,11,8,5,14,10,,0.00,4,Fog-Snow,26
    2013-3-30,5,1,-3,0,-3,-5,93,77,50,1013,1010,1008,14,8,3,24,11,,0.00,3,Rain-Snow,19
    2013-3-31,6,2,-2,-2,-3,-6,93,69,37,1015,1014,1013,27,11,8,23,11,,0.00,4,Snow,36
    2013-4-1,7,2,-2,-2,-4,-9,86,61,24,1014,1013,1011,31,14,10,34,18,45,0.00,2,,53
    2013-4-2,8,3,-1,-3,-6,-9,75,52,17,1016,1014,1013,31,17,10,37,24,52,0.00,1,,51
    2013-4-3,8,4,0,-4,-6,-8,69,49,24,1019,1017,1015,31,13,10,43,27,61,0.00,4,,69
    2013-4-4,5,2,-1,-1,-3,-6,70,61,48,1016,1014,1012,31,13,10,34,23,48,0.00,6,,65
    2013-4-5,9,5,1,0,-3,-4,75,61,32,1017,1013,1011,29,12,10,37,24,,0.00,4,,43
    2013-4-6,9,5,1,0,-2,-5,87,60,26,1025,1021,1016,31,12,10,29,19,,0.00,4,,30
    2013-4-7,9,4,0,1,-2,-6,100,69,27,1025,1021,1015,31,7,0,14,8,,0.00,5,Fog,358
    2013-4-8,11,6,1,0,-3,-6,75,55,27,1015,1008,1003,31,25,18,29,18,,0.00,8,,66
    2013-4-9,11,7,2,6,2,-2,93,73,44,1003,1000,998,26,9,6,23,14,35,1.02,5,Rain,97
    2013-4-10,8,4,1,6,4,0,100,90,76,1007,1003,999,7,4,2,23,10,,0.00,6,Fog-Rain,263
    2013-4-11,9,4,1,8,5,1,100,95,81,1004,998,996,10,3,0,32,16,48,1.02,6,Fog-Rain,201
    2013-4-12,12,8,4,9,6,4,100,92,76,1002,999,998,31,6,0,39,16,53,11.94,6,Fog-Rain,208
    2013-4-13,14,9,4,9,6,3,100,83,43,1017,1013,1003,31,8,2,29,21,,1.02,5,Rain,227
    2013-4-14,21,16,10,12,11,9,100,77,38,1020,1017,1015,29,9,4,35,23,,0.76,7,Rain,167
    2013-4-15,17,12,7,11,8,5,88,75,50,1020,1018,1015,24,13,10,26,16,,0.51,2,Rain,218
    2013-4-16,16,11,6,10,8,5,100,80,58,1020,1017,1016,27,10,5,45,19,,0.00,4,,204
    2013-4-17,19,13,7,12,9,6,95,75,43,1021,1017,1010,27,10,4,34,19,,0.00,4,Rain,202
    2013-4-18,14,12,9,10,6,3,77,61,39,1016,1013,1008,19,11,10,63,37,82,0.00,2,,228
    2013-4-19,11,8,4,7,4,2,93,76,53,1031,1023,1016,27,11,7,35,26,,0.25,4,Rain,289
    2013-4-20,11,6,1,3,1,0,100,68,36,1034,1031,1029,31,12,10,32,16,48,0.00,1,,22
    2013-4-21,14,8,2,4,2,-1,93,68,25,1028,1021,1017,24,15,10,21,11,,0.00,1,,358
    2013-4-22,14,7,1,6,3,-1,93,73,46,1017,1016,1015,23,9,5,27,14,,0.00,2,,215
    2013-4-23,14,12,9,9,8,4,100,80,52,1024,1019,1014,26,10,2,32,23,,0.00,5,Rain,253
    2013-4-24,18,12,7,11,8,6,100,78,50,1025,1023,1023,23,9,5,34,13,,0.00,6,,216
    2013-4-25,21,14,8,13,10,7,94,76,47,1025,1021,1015,24,10,6,26,11,,0.00,4,Rain,215
    2013-4-26,9,7,4,9,6,2,100,85,74,1015,1012,1010,31,10,2,24,14,,4.06,4,Fog-Rain,334
    2013-4-27,11,7,2,3,2,-1,93,71,37,1016,1013,1010,31,11,10,26,11,,0.00,1,,1
    2013-4-28,12,6,1,4,2,-1,93,70,45,1018,1016,1013,31,12,10,21,10,,0.00,2,,278
    2013-4-29,12,8,4,7,3,0,93,68,40,1020,1015,1011,27,11,3,32,23,48,0.25,4,Rain,239
    2013-4-30,13,8,3,5,4,2,93,73,43,1026,1023,1020,26,12,10,26,11,37,0.00,2,Fog,1
    2013-5-1,16,9,3,5,3,0,87,62,32,1026,1024,1021,31,18,10,29,18,,0.00,2,,48
    2013-5-2,16,11,7,7,4,2,76,61,40,1022,1021,1020,27,21,10,32,21,,0.00,7,,38
    2013-5-3,18,12,6,8,6,4,87,64,38,1020,1018,1017,19,13,10,23,11,,0.00,2,Fog,9
    2013-5-4,17,11,6,8,5,3,87,65,34,1020,1017,1015,31,11,8,45,19,55,0.00,1,,235
    2013-5-5,18,12,6,9,7,4,100,70,38,1023,1022,1020,21,9,6,21,13,,0.00,1,,216
    2013-5-6,22,14,7,10,7,4,93,60,28,1023,1020,1018,21,17,10,26,10,,0.00,,,7
    2013-5-7,24,17,11,13,10,7,94,67,30,1018,1016,1013,31,10,2,29,13,,7.87,5,Rain,48
    2013-5-8,21,17,13,15,13,11,94,84,53,1012,1009,1007,23,7,2,32,14,,5.08,5,Rain-Thunderstorm,180
    2013-5-9,15,12,9,11,7,2,94,69,35,1013,1011,1009,24,11,8,29,19,,0.00,3,Rain,231
    2013-5-10,16,12,8,9,7,4,94,68,50,1015,1011,1007,31,12,10,45,29,63,0.00,4,Rain,223
    2013-5-11,14,11,9,9,7,4,94,79,54,1014,1011,1009,31,11,7,40,24,53,1.02,5,Rain,218
    2013-5-12,12,9,6,8,6,4,93,77,53,1015,1012,1009,31,12,7,34,21,,1.02,5,Rain,253
    2013-5-13,14,11,7,10,7,3,100,77,45,1013,1010,1008,31,10,2,42,26,,4.06,5,Rain,234
    2013-5-14,13,9,6,8,6,3,93,78,46,1008,1007,1001,29,11,8,27,19,,0.51,4,Rain,205
    2013-5-15,17,12,7,9,7,4,88,70,37,1002,999,996,31,11,8,35,23,,0.00,3,Rain,188
    2013-5-16,12,8,3,9,7,3,100,85,59,1003,1000,997,27,10,6,26,10,,7.87,7,Rain,26
    2013-5-17,10,9,8,8,8,7,100,92,81,1005,1002,998,23,8,2,21,13,,7.11,8,Rain,317
    2013-5-18,12,10,8,8,7,6,93,82,67,1011,1007,1005,31,12,10,23,14,,0.00,7,,253
    2013-5-19,15,10,4,9,8,4,100,81,60,1011,1010,1009,19,9,0,24,10,,0.00,6,Fog,21
    2013-5-20,12,11,9,11,10,9,100,94,86,1009,1008,1007,8,4,1,13,8,,14.99,7,Rain,258
    2013-5-21,11,10,9,10,9,7,100,95,87,1012,1010,1008,14,6,2,27,11,,3.05,7,Fog-Rain,318
    2013-5-22,12,9,5,7,5,3,87,75,59,1016,1014,1012,27,12,9,40,27,58,0.00,5,Rain,320
    2013-5-23,11,8,4,5,3,2,87,75,57,1013,1009,1008,31,12,10,29,16,,0.00,3,Rain,297
    2013-5-24,12,8,4,6,4,3,93,77,60,1015,1010,1008,31,11,7,29,14,42,2.03,3,Rain-Thunderstorm,198
    2013-5-25,12,7,2,7,6,2,95,82,63,1017,1016,1015,31,12,8,29,16,,5.08,5,Fog-Rain,335
    2013-5-26,12,10,8,8,7,6,93,82,64,1015,1013,1012,23,11,10,32,24,,0.00,5,Rain,323
    2013-5-27,18,11,4,9,4,-5,100,61,15,1011,1010,1008,29,12,10,21,13,,0.00,1,Fog,284
    2013-5-28,21,14,7,12,6,1,88,52,26,1008,1003,999,31,19,10,29,18,,0.00,1,,84
    2013-5-29,14,12,10,13,11,8,100,91,78,1003,1000,999,21,9,4,27,18,,5.08,5,Rain-Thunderstorm,266
    2013-5-30,17,14,11,12,11,8,100,82,48,1011,1007,1003,26,8,3,14,8,,0.00,5,Rain,43
    2013-5-31,20,15,10,14,11,9,100,83,47,1016,1012,1011,31,8,1,32,18,,0.00,4,,339
    2013-6-1,13,11,8,9,8,7,100,86,62,1024,1019,1015,24,9,3,29,23,,0.00,6,,332
    2013-6-2,16,11,5,8,7,4,93,73,49,1029,1026,1023,31,12,10,24,14,37,0.00,1,,325
    2013-6-3,14,11,7,7,6,5,93,72,52,1031,1030,1029,31,12,10,24,14,,0.00,4,,4
    2013-6-4,21,13,6,12,9,6,93,69,41,1029,1025,1022,31,12,10,23,14,,0.00,3,,12
    2013-6-5,21,16,9,12,9,7,88,67,38,1022,1020,1019,31,15,10,23,14,,0.00,1,,31
    2013-6-6,23,17,11,14,11,8,88,72,40,1022,1020,1020,29,22,14,23,16,,0.00,,,29
    2013-6-7,23,17,11,13,11,9,94,73,43,1023,1022,1021,23,18,10,27,18,,0.00,1,,26
    2013-6-8,18,14,11,10,9,8,88,73,52,1022,1020,1017,31,12,10,29,23,,0.00,3,,29
    2013-6-9,15,12,10,8,8,7,82,72,56,1017,1015,1013,31,11,10,26,23,42,0.00,6,,24
    2013-6-10,15,12,9,8,7,6,87,67,46,1016,1014,1013,31,12,10,19,13,,0.00,7,,348
    2013-6-11,21,15,9,11,9,6,87,67,41,1017,1016,1015,26,11,10,13,8,,0.00,5,,196
    2013-6-12,20,18,15,16,14,11,100,78,58,1016,1014,1012,26,10,6,34,14,,0.00,4,Rain,199
    2013-6-13,19,16,13,17,12,9,95,77,56,1014,1012,1011,31,11,5,53,31,74,0.00,5,Rain,228
    2013-6-14,19,16,12,11,9,6,82,67,36,1019,1017,1014,31,12,10,27,21,,0.00,3,,239
    2013-6-15,18,14,11,12,8,5,88,66,36,1014,1010,1007,31,13,8,58,26,76,2.03,2,Rain,204
    2013-6-16,18,14,12,11,9,6,88,69,45,1017,1014,1012,31,12,10,34,23,,0.00,3,Rain,248
    2013-6-17,22,16,9,13,11,9,94,69,44,1017,1015,1013,27,17,10,29,13,,0.00,3,,51
    2013-6-18,29,22,14,19,16,12,88,71,46,1016,1014,1013,31,19,10,23,13,,0.00,8,,53
    2013-6-19,24,21,17,18,17,16,94,76,59,1014,1013,1012,31,12,6,29,11,,0.00,8,Rain,359
    2013-6-20,22,19,16,19,17,15,100,89,74,1015,1012,1008,9,5,2,24,11,,2.03,3,Fog-Rain,59
    2013-6-21,16,16,15,18,15,13,100,93,79,1013,1009,1006,27,6,0,37,18,48,9.91,6,Fog-Rain,228
    2013-6-22,17,16,14,16,13,9,94,81,67,1012,1009,1006,31,11,5,40,27,58,2.03,5,Rain,211
    2013-6-23,19,16,12,13,12,10,95,78,55,1011,1008,1005,26,11,6,43,32,55,0.51,4,Rain,229
    2013-6-24,17,14,11,12,11,9,94,83,62,1025,1018,1011,31,11,10,26,21,,0.25,5,Rain,282
    2013-6-25,18,13,9,10,8,6,94,72,45,1030,1027,1024,31,11,10,24,13,,0.00,2,Rain,318
    2013-6-26,17,12,8,12,9,7,100,79,47,1030,1028,1026,31,11,7,21,10,,4.06,2,Fog-Rain,290
    2013-6-27,15,12,8,11,9,7,94,79,57,1025,1023,1020,31,11,6,27,16,,0.76,3,Rain,294
    2013-6-28,16,13,11,14,12,10,100,87,66,1020,1017,1014,23,10,3,27,18,,0.00,5,Rain,253
    2013-6-29,17,13,11,15,11,8,100,79,55,1025,1019,1013,27,11,3,26,19,,0.00,4,Rain,312
    2013-6-30,21,14,8,15,12,8,94,76,53,1024,1021,1017,26,11,10,29,16,,0.00,2,,235
    2013-7-1,18,16,13,14,12,11,94,79,54,1017,1016,1015,31,11,6,32,21,,0.00,4,,254
    2013-7-2,21,16,10,13,12,9,100,73,40,1016,1013,1008,31,11,8,21,10,,0.25,2,Fog-Rain,179
    2013-7-3,18,17,15,16,15,13,100,91,77,1014,1008,1005,29,10,4,24,16,,2.03,6,Rain,215
    2013-7-4,21,18,15,16,15,14,100,84,59,1024,1019,1014,31,12,10,34,14,,0.00,4,,227
    2013-7-5,22,18,15,16,14,12,94,76,45,1031,1027,1023,31,11,7,19,14,,0.00,4,,291
    2013-7-6,24,19,13,17,13,11,88,68,40,1031,1030,1029,31,13,10,19,11,,0.00,1,,62
    2013-7-7,24,19,14,15,14,11,94,70,39,1032,1031,1030,27,22,10,21,11,,0.00,,Fog,46
    2013-7-8,24,19,14,16,13,11,94,70,44,1033,1032,1030,31,21,10,26,18,,0.00,1,,38
    2013-7-9,22,18,13,14,12,10,88,66,44,1030,1027,1024,31,24,19,21,16,,0.00,,,33
    2013-7-10,19,16,12,15,12,9,94,75,56,1025,1023,1023,31,15,7,24,14,,0.00,6,Rain,6
    2013-7-11,17,15,13,11,9,8,82,66,52,1024,1023,1023,31,15,10,23,16,,0.00,7,,352
    2013-7-12,19,15,11,13,12,8,94,77,63,1024,1024,1023,31,12,6,21,13,,0.00,5,,337
    2013-7-13,21,17,12,14,13,10,98,74,48,1025,1024,1023,31,14,6,14,8,,0.00,4,Fog,350
    2013-7-14,22,17,11,16,13,11,100,81,54,1025,1024,1022,31,10,3,14,8,,0.00,4,Fog,13
    2013-7-15,24,18,12,16,13,11,95,70,35,1024,1023,1022,31,15,10,21,6,,0.00,2,Fog,333
    2013-7-16,24,18,12,17,13,11,100,70,38,1024,1023,1023,31,8,2,14,5,,0.00,8,Fog,332
    2013-7-17,25,19,14,18,15,11,100,71,42,1025,1024,1023,31,14,5,16,8,,0.00,6,,34
    2013-7-18,26,21,16,18,16,14,100,74,43,1026,1025,1024,27,9,1,26,13,,0.00,2,Fog,31
    2013-7-19,26,21,16,17,15,13,94,69,42,1026,1025,1023,31,12,9,26,16,,0.00,1,,35
    2013-7-20,22,19,17,17,15,14,88,77,56,1024,1023,1021,31,12,10,19,13,,0.00,5,Rain,32
    2013-7-21,29,22,16,18,16,13,94,64,29,1022,1019,1017,31,19,10,21,14,,0.00,1,,61
    2013-7-22,31,24,17,18,17,14,100,62,27,1018,1016,1014,29,27,23,16,8,,0.00,,,48
    2013-7-23,31,24,17,20,18,16,100,70,35,1015,1013,1011,31,21,10,19,6,,0.00,1,,327
    2013-7-24,26,22,17,18,16,14,94,75,52,1015,1014,1011,23,10,7,24,13,,0.00,2,Rain,263
    2013-7-25,28,21,14,18,16,14,94,75,47,1015,1014,1013,24,11,10,27,6,,0.00,2,Fog,196
    2013-7-26,25,21,16,20,18,15,100,82,64,1015,1013,1011,23,11,10,19,6,,0.51,2,Rain,54
    2013-7-27,24,21,17,22,19,18,100,88,66,1011,1008,1004,27,8,0,23,8,,6.10,2,Fog-Rain-Thunderstorm,63
    2013-7-28,24,21,18,20,16,12,100,75,46,1012,1008,1002,31,10,3,32,19,,0.00,3,Rain-Thunderstorm,202
    2013-7-29,23,20,17,17,15,12,88,72,47,1015,1013,1011,31,13,10,37,19,,0.00,2,Rain,211
    2013-7-30,20,18,16,17,15,13,100,84,66,1016,1014,1011,27,10,5,34,21,,2.03,4,Rain,222
    2013-7-31,22,19,17,18,17,14,94,83,55,1017,1015,1012,31,11,10,32,23,,0.25,4,Rain,242
    2013-8-1,30,24,18,20,18,17,94,71,41,1016,1013,1010,31,12,10,24,11,,0.00,2,Fog,164
    2013-8-2,32,26,20,22,18,16,88,67,49,1011,1009,1007,31,28,19,24,14,,0.00,,,144
    2013-8-3,22,19,16,18,14,11,94,70,43,1021,1015,1010,31,14,10,40,19,53,0.00,1,,233
    2013-8-4,24,19,13,15,13,12,94,69,38,1022,1020,1019,31,15,10,14,10,,0.00,1,,217
    2013-8-5,28,21,14,18,15,13,94,67,34,1019,1014,1009,31,13,10,26,10,45,2.03,2,Rain-Thunderstorm,129
    2013-8-6,21,18,16,17,14,13,94,76,53,1017,1014,1009,31,11,10,34,21,,0.00,4,,288
    2013-8-7,18,16,14,15,13,12,94,83,71,1015,1013,1011,31,12,10,32,16,,3.05,3,Rain,46
    2013-8-8,22,17,13,14,12,11,94,72,49,1021,1017,1014,10,10,10,23,13,,0.00,2,,335
    2013-8-9,23,18,13,17,13,11,100,76,42,1021,1019,1018,29,12,8,26,11,,0.51,3,Fog-Rain,207
    2013-8-10,20,16,12,17,12,7,100,73,41,1021,1019,1018,26,11,9,37,18,,0.00,2,,278
    2013-8-11,22,17,12,16,13,9,94,73,51,1020,1017,1015,31,11,10,34,14,,0.25,2,Rain,232
    2013-8-12,20,17,13,15,12,9,100,72,44,1015,1014,1014,31,10,5,29,13,,0.00,2,Fog,253
    2013-8-13,20,16,12,12,11,9,88,71,48,1022,1018,1014,10,10,10,34,19,52,0.00,2,Rain,282
    2013-8-14,21,16,11,12,9,6,94,64,29,1023,1022,1021,31,12,10,16,8,,0.00,2,,277
    2013-8-15,22,17,11,18,14,9,100,83,55,1022,1020,1018,19,9,5,27,10,,2.03,5,Rain,184
    2013-8-16,26,20,13,17,14,11,100,76,44,1018,1016,1015,26,12,10,29,13,,0.00,2,Rain,206
    2013-8-17,24,21,17,17,16,13,94,77,50,1015,1013,1010,31,12,10,27,16,,1.02,3,Rain,212
    2013-8-18,22,19,16,18,16,13,100,81,60,1012,1010,1007,31,11,3,34,23,48,0.51,4,Rain,227
    2013-8-19,21,18,14,16,13,11,94,78,46,1025,1016,1011,23,11,8,29,13,,4.06,2,Rain,284
    2013-8-20,22,17,11,14,11,8,100,70,40,1029,1027,1025,31,12,10,13,6,,0.00,2,Fog,232
    2013-8-21,23,18,12,14,13,10,94,73,44,1027,1024,1022,31,12,9,16,6,,0.00,1,,176
    2013-8-22,21,17,12,17,14,12,94,82,55,1022,1020,1019,27,10,4,14,5,,0.00,2,Fog,260
    2013-8-23,25,20,15,18,16,13,100,75,42,1020,1016,1014,26,8,0,18,8,,0.00,2,Fog,48
    2013-8-24,24,20,16,18,15,13,100,75,49,1014,1011,1009,23,11,6,24,16,,0.25,4,Rain,120
    2013-8-25,23,19,14,17,16,15,100,84,58,1015,1012,1010,29,7,1,18,10,,0.00,3,Fog,69
    2013-8-26,23,19,15,14,12,8,82,62,30,1019,1017,1016,10,10,10,29,18,,0.00,1,,47
    2013-8-27,24,18,13,14,11,7,88,61,25,1018,1016,1015,31,28,24,19,13,,0.00,,,41
    2013-8-28,24,18,13,16,14,11,100,74,38,1022,1020,1017,31,10,3,19,10,,0.00,2,Fog,20
    2013-8-29,23,17,11,16,13,9,100,77,31,1022,1021,1020,31,10,3,24,8,,0.00,1,Fog,279
    2013-8-30,23,18,12,17,15,12,100,84,57,1021,1019,1018,23,7,1,26,11,,0.00,2,Fog,210
    2013-8-31,21,16,11,17,13,6,94,74,44,1026,1021,1017,26,11,9,29,16,45,0.00,3,Rain,303
    2013-9-1,18,14,11,11,9,6,77,67,47,1027,1026,1024,26,11,10,34,16,,0.00,3,,276
    2013-9-2,20,17,14,17,13,10,94,77,63,1026,1023,1022,31,12,10,32,21,,0.00,5,,274
    2013-9-3,24,19,15,17,16,14,100,82,59,1027,1026,1025,27,11,10,16,11,,0.00,3,,286
    2013-9-4,24,19,14,17,16,15,100,79,56,1026,1022,1018,18,11,10,19,8,,0.00,3,Fog,78
    2013-9-5,30,22,15,18,17,15,94,69,36,1018,1013,1008,31,11,6,23,13,,0.00,,,124
    2013-9-6,24,20,15,17,16,14,94,75,50,1012,1008,1006,26,12,6,29,13,,1.02,2,Fog-Rain-Thunderstorm,216
    2013-9-7,20,17,14,16,13,10,94,77,46,1019,1016,1012,10,9,6,16,8,,0.00,4,Fog-Rain,197
    2013-9-8,18,15,12,13,11,9,100,80,48,1019,1018,1017,10,10,5,21,8,45,2.03,3,Rain,353
    2013-9-9,17,13,9,13,11,9,100,87,58,1019,1016,1012,31,11,8,29,14,,1.02,2,Rain,202
    2013-9-10,17,13,10,14,12,10,100,90,58,1013,1011,1006,26,9,4,48,14,74,27.94,4,Rain,281
    2013-9-11,19,15,11,14,12,11,100,84,63,1015,1013,1008,31,11,6,32,19,,0.25,2,Rain,334
    2013-9-12,19,16,12,15,13,12,100,88,68,1019,1016,1015,26,10,5,21,13,,0.00,3,Rain,312
    2013-9-13,17,13,11,15,13,11,100,92,71,1019,1017,1015,19,8,2,24,11,,0.51,4,Fog-Rain,190
    2013-9-14,17,15,13,16,14,9,100,90,68,1014,1011,1007,31,9,3,34,18,,5.08,5,Rain,254
    2013-9-15,17,13,8,12,9,7,94,75,45,1015,1009,999,31,10,5,40,16,53,0.76,3,Rain,244
    2013-9-16,16,12,8,13,7,4,100,70,45,1000,999,997,27,11,4,42,29,,3.05,2,Rain-Thunderstorm,250
    2013-9-17,15,11,8,9,8,6,100,77,50,1001,999,994,27,11,6,34,21,45,3.05,3,Rain,226
    2013-9-18,16,12,9,12,9,6,100,86,59,1006,999,993,31,9,3,32,8,34,2.03,4,Rain,263
    2013-9-19,15,11,8,13,9,7,100,82,53,1011,1008,1006,31,10,3,29,16,,1.02,4,Rain,228
    2013-9-20,17,13,9,13,11,7,88,82,70,1022,1014,1007,31,11,10,32,16,,0.00,4,Rain,286
    2013-9-21,18,13,8,13,11,8,100,83,57,1026,1024,1022,27,11,10,21,10,,0.00,5,Fog,198
    2013-9-22,19,17,14,17,16,13,100,93,83,1028,1026,1025,13,7,3,23,14,,0.00,7,Rain,240
    2013-9-23,19,17,12,17,16,12,100,93,78,1027,1025,1021,18,8,0,24,11,,0.00,6,Fog,256
    2013-9-24,18,14,11,15,13,12,100,90,64,1021,1017,1015,21,6,0,11,3,,0.00,6,Fog,89
    2013-9-25,18,14,11,14,13,11,100,88,62,1015,1011,1010,14,8,5,11,6,,0.00,5,Rain,354
    2013-9-26,16,13,11,14,9,6,100,76,55,1020,1015,1010,10,10,5,26,13,,0.00,4,,25
    2013-9-27,16,11,7,9,7,5,87,75,47,1019,1017,1016,31,15,10,21,13,,0.00,3,,81
    2013-9-28,17,12,7,8,6,4,82,65,34,1016,1014,1011,,,,29,18,45,0.00,,,84
    2013-9-29,17,13,8,8,7,5,82,67,45,1012,1010,1008,31,20,10,32,26,42,0.00,,,80
    2013-9-30,16,12,7,8,6,4,81,68,47,1012,1010,1009,31,29,26,29,21,,0.00,8,,84
    2013-10-1,16,10,4,8,6,3,87,69,46,1015,1013,1012,31,28,21,27,18,,0.00,,,82
    2013-10-2,15,10,6,7,4,3,81,65,43,1018,1016,1015,31,29,24,34,23,48,0.00,8,,106
    2013-10-3,17,12,7,8,6,3,76,61,41,1018,1015,1012,31,30,29,26,21,,0.00,8,,123
    2013-10-4,22,17,11,17,13,8,100,84,64,1014,1012,1011,16,10,5,34,23,,1.02,3,Rain-Thunderstorm,174
    2013-10-5,19,16,12,16,13,11,100,90,72,1023,1018,1013,31,10,5,19,10,,0.00,3,Fog,289
    2013-10-6,18,13,8,13,10,8,100,84,47,1027,1025,1023,24,9,0,13,5,,0.00,3,Fog,256
    2013-10-7,18,12,6,13,11,6,100,89,64,1027,1026,1024,23,9,3,16,5,,0.00,4,Fog,173
    2013-10-8,18,13,8,15,13,9,100,92,75,1025,1024,1023,26,7,2,23,11,,0.00,6,Fog,214
    2013-10-9,16,12,9,15,11,6,100,81,59,1022,1016,1009,24,9,3,37,16,58,2.03,4,Rain,264
    2013-10-10,12,9,6,8,7,4,93,83,63,1009,1008,1005,31,11,10,21,11,,0.51,2,Rain,306
    2013-10-11,11,9,7,11,8,6,100,95,82,1017,1015,1009,21,6,2,23,11,,19.05,6,Rain,86
    2013-10-12,12,8,4,10,8,4,100,91,68,1021,1017,1012,24,7,3,21,11,,0.76,4,Rain,58
    2013-10-13,9,8,8,11,8,6,100,95,86,1012,1009,1006,10,6,3,47,26,74,29.97,6,Rain,141
    2013-10-14,11,9,8,10,9,8,100,91,85,1012,1010,1008,19,10,6,26,21,,3.05,6,Rain,145
    2013-10-15,11,8,5,10,9,5,100,95,85,1009,1006,1005,26,8,0,21,13,,5.08,5,Fog-Rain,219
    2013-10-16,14,9,3,12,9,4,100,93,77,1014,1011,1007,14,9,0,26,10,,0.51,3,Fog-Rain,184
    2013-10-17,16,12,8,12,10,7,100,81,62,1016,1010,1007,29,11,5,50,27,69,0.00,3,Rain,260
    2013-10-18,13,10,7,12,11,8,100,95,85,1019,1017,1015,10,7,0,18,10,,0.00,6,Fog,127
    2013-10-19,16,12,9,14,11,8,100,90,75,1015,1009,1006,21,9,5,23,18,,10.92,5,Rain,155
    2013-10-20,18,14,11,14,13,11,100,90,73,1010,1009,1007,31,8,3,34,19,,1.02,3,Fog-Rain,191
    2013-10-21,17,14,11,14,13,11,100,89,80,1011,1010,1009,31,12,10,26,21,,0.00,4,,191
    2013-10-22,21,17,13,16,14,12,94,84,66,1008,1003,999,31,14,10,34,21,,0.00,2,Rain,162
    2013-10-23,18,16,13,15,13,11,100,85,63,1008,1001,998,31,12,9,47,26,64,2.03,3,Rain,198
    2013-10-24,16,11,6,10,8,5,100,80,45,1017,1015,1009,31,12,10,23,14,,0.00,1,Fog,196
    2013-10-25,17,12,8,15,12,8,94,90,82,1015,1010,1007,26,12,10,24,16,,0.76,5,Rain,153
    2013-10-26,18,16,13,15,13,11,100,86,67,1009,1008,1005,31,11,7,37,23,,0.00,2,,200
    2013-10-27,16,14,13,13,11,10,94,80,65,1004,999,996,31,11,4,55,34,82,6.10,3,Rain,208
    2013-10-28,17,14,11,13,11,7,100,80,59,1002,993,984,31,11,6,85,42,111,2.03,4,Rain,219
    2013-10-29,14,11,8,10,8,5,94,82,66,1014,1007,1002,31,11,6,43,31,61,2.03,3,Rain-Thunderstorm,230
    2013-10-30,13,10,7,7,6,5,93,75,53,1023,1020,1014,31,12,10,32,21,,0.00,1,,232
    2013-10-31,13,10,7,10,8,6,94,86,66,1022,1019,1015,26,12,9,35,24,,0.25,5,Rain,192
    2013-11-1,12,11,10,11,10,9,100,93,84,1015,1011,1004,27,11,5,32,24,,0.25,5,Rain,195
    2013-11-2,13,11,8,11,9,8,100,93,77,1004,999,995,18,9,2,35,16,,0.51,6,Rain,183
    2013-11-3,12,9,7,9,6,3,93,75,55,1000,997,995,31,11,6,47,31,64,5.08,2,Rain-Thunderstorm,235
    2013-11-4,12,9,6,11,7,3,100,87,60,995,987,979,14,9,4,37,23,40,5.08,5,Rain-Thunderstorm,304
    2013-11-5,10,7,3,9,6,3,100,88,70,996,993,988,31,11,5,47,19,61,13.97,4,Rain,216
    2013-11-6,15,11,7,12,8,5,100,82,66,1001,998,993,23,10,3,47,26,66,1.02,4,Rain,248
    2013-11-7,12,10,8,13,9,7,94,84,68,1008,1004,997,31,10,5,50,31,72,0.00,3,Rain,246
    2013-11-8,11,7,4,9,7,3,100,93,81,1009,1006,1000,27,8,3,19,11,,2.03,4,Rain,171
    2013-11-9,11,8,5,8,6,4,100,81,58,1008,1004,1000,31,10,6,40,26,55,7.11,4,Rain,244
    2013-11-10,10,7,3,5,4,2,93,83,66,1023,1010,1001,31,11,5,34,11,,7.11,2,Rain,304
    2013-11-11,9,5,1,6,4,1,100,84,60,1028,1026,1023,31,13,10,27,11,,0.00,3,Fog-Rain,181
    2013-11-12,10,8,6,9,7,4,100,92,76,1028,1024,1022,31,9,1,32,21,,2.03,5,Rain,241
    2013-11-13,12,7,2,7,4,2,100,87,60,1032,1030,1025,31,11,10,21,6,,0.00,1,,236
    2013-11-14,10,7,4,8,6,4,100,89,76,1025,1019,1015,18,10,5,24,18,,5.08,5,Rain,239
    2013-11-15,12,7,1,8,5,1,100,90,66,1032,1028,1022,26,11,3,19,8,,0.00,2,Fog,360
    2013-11-16,8,4,1,8,5,2,100,98,92,1032,1030,1027,10,4,0,18,8,,0.00,6,Fog,181
    2013-11-17,10,8,6,8,7,6,100,94,83,1028,1024,1018,10,5,2,11,6,,0.00,8,,119
    2013-11-18,7,6,5,6,5,4,100,91,77,1018,1010,1006,6,5,3,26,13,,0.25,7,Rain,180
    2013-11-19,9,4,1,7,4,0,100,88,69,1012,1007,1004,10,8,2,24,13,,2.03,4,Rain,314
    2013-11-20,6,2,-1,2,1,-1,100,88,65,1012,1003,995,23,10,6,35,16,,0.76,3,Rain,185
    2013-11-21,5,3,2,2,1,0,93,86,73,1010,1003,995,26,11,9,26,19,,0.00,3,,57
    2013-11-22,6,3,-1,4,3,-1,100,87,79,1018,1014,1010,27,11,10,26,13,,0.00,6,Rain,20
    2013-11-23,7,5,3,4,3,0,93,84,66,1023,1020,1018,31,11,10,21,11,,0.00,5,,4
    2013-11-24,9,6,3,6,4,2,100,81,58,1030,1025,1022,31,11,10,29,11,,0.25,5,Rain,353
    2013-11-25,8,4,1,4,2,1,93,80,60,1035,1032,1030,29,12,9,24,13,,0.00,3,Rain,346
    2013-11-26,8,6,3,5,4,2,100,89,63,1036,1034,1033,31,12,10,19,8,,0.00,5,Rain,321
    2013-11-27,10,7,4,9,7,4,100,93,78,1034,1032,1031,26,8,2,21,10,,0.00,7,Rain,232
    2013-11-28,11,8,6,9,7,4,100,91,67,1033,1032,1031,23,10,6,21,10,,0.00,6,,315
    2013-11-29,9,7,5,7,4,2,93,80,66,1032,1021,1013,26,11,3,47,21,61,1.02,5,Rain,274
    2013-11-30,9,6,3,7,4,2,100,86,68,1028,1021,1012,31,11,6,32,16,50,0.51,3,Rain,332
    2013-12-1,9,6,2,8,5,2,100,88,80,1033,1030,1027,31,11,6,16,8,,0.00,5,Rain,297
    2013-12-2,8,4,1,5,3,0,100,88,59,1036,1034,1031,14,10,9,13,6,,0.00,5,,41
    2013-12-3,7,2,-3,4,1,-2,100,91,69,1031,1028,1025,10,7,0,14,5,,0.00,6,Fog,205
    2013-12-4,9,6,3,8,4,1,100,86,73,1028,1025,1023,31,9,2,26,14,,1.02,6,Rain,255
    2013-12-5,9,6,2,6,2,-3,93,74,45,1028,1016,1006,31,11,1,69,32,111,7.87,2,Rain-Thunderstorm,263
    2013-12-6,5,3,1,1,-1,-4,93,69,46,1025,1020,1014,31,11,4,50,37,71,1.02,3,Rain-Snow-Thunderstorm,307
    2013-12-7,8,6,3,7,4,-2,100,84,55,1026,1023,1022,27,10,5,26,18,,0.51,4,Rain,262
    2013-12-8,10,8,7,8,7,6,100,87,79,1023,1022,1021,31,12,9,42,23,60,0.51,3,Rain,243
    2013-12-9,11,9,7,8,8,6,100,89,81,1031,1027,1022,19,10,6,40,29,55,0.00,3,Rain-Thunderstorm,247
    2013-12-10,7,3,0,8,2,-1,100,89,69,1034,1033,1032,29,9,4,19,13,,0.00,5,,173
    2013-12-11,6,2,-2,3,1,-2,100,95,74,1033,1032,1030,14,4,0,16,10,,0.00,4,Fog,156
    2013-12-12,4,2,-1,2,1,-1,100,95,78,1030,1027,1025,13,4,0,24,16,,0.00,5,Fog,170
    2013-12-13,4,2,-1,3,2,-1,100,97,87,1025,1022,1019,7,3,0,23,14,,0.00,4,Fog,171
    2013-12-14,8,6,3,6,4,3,100,90,78,1026,1023,1019,23,9,3,37,18,,0.00,5,Rain,211
    2013-12-15,9,7,5,8,6,3,93,85,69,1025,1022,1020,27,11,5,39,29,53,0.00,7,Rain,197
    2013-12-16,12,10,8,8,6,5,93,76,55,1021,1020,1018,31,11,6,35,29,,0.25,6,Rain,201
    2013-12-17,6,5,4,8,6,3,100,93,81,1025,1022,1019,26,10,3,26,14,,0.51,6,Rain,89
    2013-12-18,9,7,5,7,5,4,93,84,71,1020,1013,1002,31,14,5,34,23,,0.00,5,Rain,175
    2013-12-19,9,6,3,8,5,2,100,85,60,1010,1003,997,31,12,5,37,26,,0.00,4,Rain,205
    2013-12-20,8,6,2,5,4,2,93,85,67,1024,1019,1010,26,13,6,37,23,,0.00,2,Rain,211
    2013-12-21,8,7,6,6,5,3,94,86,72,1023,1018,1011,31,13,5,47,37,66,8.89,6,Rain,197
    2013-12-22,9,8,6,7,6,4,93,84,68,1012,1010,1007,31,13,5,47,37,63,2.03,4,Rain,214
    2013-12-23,11,7,4,8,5,2,93,83,66,1014,1006,991,31,14,9,61,29,85,1.02,4,Rain-Thunderstorm,197
    2013-12-24,12,9,7,9,7,6,94,79,58,992,985,983,29,11,5,72,53,98,7.11,7,Rain,197
    2013-12-25,8,6,3,7,4,2,100,87,69,992,987,981,31,14,8,32,23,,0.00,3,Rain,181
    2013-12-26,7,4,2,6,4,1,100,90,72,1001,995,991,31,13,7,21,14,,0.51,5,Rain,173
    2013-12-27,9,6,2,8,6,2,100,88,79,1001,992,989,31,13,5,47,32,63,6.10,5,Rain,184
    2013-12-28,9,7,3,6,5,2,100,88,68,1004,998,992,31,15,10,29,21,,0.00,3,Rain,202
    2013-12-29,8,5,2,5,3,2,100,89,67,1021,1013,1004,31,13,5,27,16,,0.00,2,Rain,222
    2013-12-30,7,4,2,5,3,1,93,87,73,1022,1017,1013,31,14,10,40,26,58,0.76,5,Rain,180
    2013-12-31,8,7,5,5,4,1,93,81,53,1016,1011,1006,31,12,8,34,24,,0.00,6,Rain,167`;
}
