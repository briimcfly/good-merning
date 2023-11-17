export const formatDate = (timestamp) => {

    // Convert the timestamp to a number if it's a string
    const date = new Date(Number(timestamp));

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // toLocaleDateString() returns the date in the specified format
    return date.toLocaleDateString('en-US', options);
};