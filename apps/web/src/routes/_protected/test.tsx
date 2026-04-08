import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@open-slack/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/test")({
	component: RouteComponent,
});

function RouteComponent() {
	const { signOut } = useAuthActions();
	return (
		<div>
			Hello "/test"!
			<Button
				onClick={() => {
					signOut();
				}}
			>
				Sign Out
			</Button>
		</div>
	);
}
