"use client";

import { AppError } from "@/components/error-boundary";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <AppError error={error} reset={reset} />
      </body>
    </html>
  );
}
