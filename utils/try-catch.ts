interface ExtendedError extends Error {
  statusCode?: number,
}

export const tryCatch = async <T, E = ExtendedError>(
  target: Promise<T> | (() => T) | (() => Promise<T>),
): Promise<{ data: T | undefined, error: E | undefined }> => {
  let data, error;

  try {
    data = await (target instanceof Promise ? target : target());
  } catch (_error) {
    error = _error as E;
  }

  return { data, error };
};
