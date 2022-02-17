// thanks: https://stackoverflow.com/a/55292366/6262571

function stringTrim(str, trimChar = '/') {
    let start = 0,
        end = str.length;

    while (start < end && str[start] === trimChar) ++start;
    while (end > start && str[end - 1] === trimChar) --end;

    return start > 0 || end < str.length ? str.substring(start, end) : str;
}

export default stringTrim;
