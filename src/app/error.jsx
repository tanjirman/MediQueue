"use client";

import Link from "next/link";

import { Button } from "@heroui/react";

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">

      <div className="text-center max-w-2xl">

        <h1 className="text-5xl font-black text-red-500">
          Something Went Wrong
        </h1>

        <p className="mt-6 text-default-600">
          {error?.message || "Unexpected error occurred"}
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Button
            onPress={() => reset()}
            className="bg-cyan-500 text-white"
          >
            Try Again
          </Button>

          <Link href="/">
            <Button variant="bordered">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}