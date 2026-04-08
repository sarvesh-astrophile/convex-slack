import { api } from "@open-slack/backend/convex/_generated/api";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Header from "@/components/header";

export const Route = createFileRoute("/_protected")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<div className="grid h-svh grid-rows-[auto_1fr]">
			<Header />
			<Outlet />
		</div>
	);
}
