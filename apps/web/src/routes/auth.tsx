import { api } from "@open-slack/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const isAuthenticated = await context.convexQueryClient.convexClient.query(
			api.auth.isAuthenticated,
			{},
		);
		if (isAuthenticated) {
			return { redirect: { to: "/test" } };
		}
	},
});

function RouteComponent() {
	return <AuthScreen />;
}
