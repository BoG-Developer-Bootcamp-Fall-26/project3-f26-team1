const FALLBACK_MESSAGE = "Something went wrong.";

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return FALLBACK_MESSAGE;
}
