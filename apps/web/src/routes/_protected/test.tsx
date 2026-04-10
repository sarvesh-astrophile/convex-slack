import { createFileRoute } from "@tanstack/react-router";
import { UserButton } from "@/features/auth/components/user-button";

export const Route = createFileRoute("/_protected/test")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/test"!
			<UserButton />
		</div>
	);
}
