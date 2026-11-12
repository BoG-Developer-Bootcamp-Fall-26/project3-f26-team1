export async function readJsonOrThrow<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  const backendMessage = await readBackendErrorMessage(response);
  throw new Error(backendMessage ?? fallbackMessage);
}

async function readBackendErrorMessage(response: Response): Promise<string | null> {
  try {
    const body = await response.json();
    if (typeof body.message === "string") {
      return body.message;
    }
    return null;
  } catch {
    return null;
  }
}
