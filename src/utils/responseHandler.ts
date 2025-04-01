export const createResponse = (
    result: any = null,
    statusCode: number = 200,
    error = null
  ) => {
    return { message: "success", statusCode, result, error };
  };
  