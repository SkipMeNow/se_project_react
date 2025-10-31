// Utility function to get the correct ID field from an item
// Handles both json-server with default 'id' and json-server with '--id _id'
export const getItemId = (item) => item.id || item._id;