export const responseMaker = ({
  success,
  message,
  ...data
}: {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}): Record<string, unknown> => {
  return {
    success: success || true,
    message: message,
    data: data,
  };
};
