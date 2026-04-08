import { api } from "@open-slack/backend/convex/_generated/api";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
	component: AuthenticatedLayout,
	beforeLoad: async ({ context }) => {
		const isAuthenticated = await context.convexQueryClient.convexClient.query(
			api.auth.isAuthenticated,
			{},
		);

		if (!isAuthenticated) {
			throw redirect({ to: "/auth" });
		}
	},
});

function AuthenticatedLayout() {
	return <Outlet />;
}
