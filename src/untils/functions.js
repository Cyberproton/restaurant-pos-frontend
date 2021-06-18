function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

function checkLogin() {
    return localStorage.getItem("token") != null;
}

function formatDate(date, join = "/") {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    return [day, month, year].join(join);
}

function getDate(date, split = "/") {
    if (!date) return undefined;
    try {
        const d = date.split(split);
        const dt = new Date();
        dt.setFullYear(d[2], d[1] - 1, d[0]);
        dt.setHours(0, 0, 0, 0);
        return dt;
    } catch (err) {
        return undefined;
    }
}

export { getCookie, checkLogin, formatDate, getDate }