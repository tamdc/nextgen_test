export const serializeUrl = (_url, option) => {
    const url = new URL(_url);
    url.search = new URLSearchParams(option);
    return url.toString()
}

export const timeConverter = (UNIX_timestamp) => {
    try {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year
        return time;
    } catch (error) {
        return 'Invalid date'
    }
}

export const formatter = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(amount);