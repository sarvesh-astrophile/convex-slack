import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { LoaderCircle } from "lucide-react";
import Header from "@/components/header";

export const Route = createFileRoute("/_protected")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<>
			<AuthLoading>
				<div className="flex h-screen items-center justify-center">
					<LoaderCircle className="size-8 animate-spin text-muted-foreground" />
				</div>
			</AuthLoading>
			<Unauthenticated>
				<Navigate to="/auth" />
			</Unauthenticated>
			<Authenticated>
				<div className="grid h-svh grid-rows-[auto_1fr]">
					<Header />
					<Outlet />
				</div>
			</Authenticated>
		</>
	);
}
