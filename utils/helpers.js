module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },

    if_equals: (val1, op, val2, options) => {
        console.log(val1, val2);
        if (op == "==") {
            return (val1 == val2) ? options.fn(this) : options.inverse(this);
        }
    }
};