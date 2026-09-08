import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/review")({ component: ReviewRedirect });

function ReviewRedirect() {
  return <Navigate to="/handoff" />;
}
