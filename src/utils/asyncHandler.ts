export const asyncHandler = (promise: any) => {
  return promise
    .then((res: any) => [res, null])
    .catch((err: unknown) => Promise.resolve([null, err]));
};
