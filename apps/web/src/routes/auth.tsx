import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<AuthLoading>
				<div className="flex h-screen items-center justify-center">
					<LoaderCircle className="size-8 animate-spin text-muted-foreground" />
				</div>
			</AuthLoading>
			<Unauthenticated>
				<AuthScreen />
			</Unauthenticated>
			<Authenticated>
				<Navigate to="/home" />
			</Authenticated>
		</>
	);
}
