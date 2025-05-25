export const camelToSnakeCaseKeys = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(camelToSnakeCaseKeys);
    }
  
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        return [snakeKey, camelToSnakeCaseKeys(value)]; 
      })
    );
  };
  export const snakeToCamelCaseKeys = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj;
  
    if (Array.isArray(obj)) {
      return obj.map((item) => snakeToCamelCaseKeys(item)); // Recursively convert array elements
    }
  
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      return { ...acc, [camelKey]: snakeToCamelCaseKeys(obj[key]) }; // Recursively transform values
    }, {});
  };
  
  