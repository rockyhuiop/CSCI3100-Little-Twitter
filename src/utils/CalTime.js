export const CalTime = (mon_time) => {
    var nd = mon_time;
    nd = nd.split("T");
    var t = nd[1].split(":");
    var d = nd[0].split("-");
    t[2] = t[2].split(".")[0];
    const mon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const date = Date().split(" ");
    const time = date[4].split(":");
    const region = date[5];
    date.splice(4);
    date.splice(0, 1);
    switch (date[0]) {
        case "Jan":
            date[0] = "01";
            break;
        case "Feb":
            date[0] = "02";
            break;
        case "Mar":
            date[0] = "03";
            break;
        case "Apr":
            date[0] = "04";
            break;
        case "May":
            date[0] = "05";
            break;
        case "Jun":
            date[0] = "06";
            break;
        case "Jul":
            date[0] = "07";
            break;
        case "Aug":
            date[0] = "08";
            break;
        case "Sep":
            date[0] = "09";
            break;
        case "Oct":
            date[0] = "10";
            break;
        case "Nov":
            date[0] = "11";
            break;
        case "Dec":
            date[0] = "12";
            break;
    }
    for (var i = 0; i < 3; i++) {
        time[i] = parseInt(time[i]);
        date[i] = parseInt(date[i]);
        t[i] = parseInt(t[i]);
        d[i] = parseInt(d[i]);
    }
    var temp = 0;
    temp = d[0];
    d[0] = d[1];
    d[1] = temp;
    temp = d[1];
    d[1] = d[2];
    d[2] = temp;
    var yr = 0;
    var month = 0;
    var day = 0;

    yr = date[2] - d[2];
    day = date[1] - d[1];
    for (var i = Math.min(date[0], d[0]); i < Math.max(date[0], d[0]); i++) {
        month += mon[i - 1];
    }
    if (date[0] < d[0]) {
        month *= -1;
    }
    day += month + yr * 365;
    var dur = 0;
    for (var i = 0; i < 3; i++) {
        dur += (time[i] - t[i]) * 60 ** (2 - i);
    }
    var final = 0;
    dur -= (parseInt(region.slice(4, 6)) * 60 * 60);
    day += (dur / 60 / 60 / 24);
    if (day < 1) {
        if (day * 24 * 60 < 1) {
            final = Math.round(day * 24 * 60 * 60) + " sec";
        } else if (day * 24 < 1) {
            final = Math.round(day * 24 * 60 ) + " min";
        } else {
            final = Math.round(day * 24 ) + " h";
        }
    } else if (day < 30) {
        final = Math.round(day) + " d";
    } else if (day < 365) {
        final = Math.round(day / 30) + " mon";
    } else {
        final = Math.round(day / 365) + " yr";
    }

    return [final, dur + day * 24 * 3600];
};