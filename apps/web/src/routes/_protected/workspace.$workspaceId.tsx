import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { createFileRoute } from "@tanstack/react-router";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export const Route = createFileRoute("/_protected/workspace/$workspaceId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { workspaceId } = Route.useParams();
	const { data } = useGetWorkspace({ id: workspaceId as Id<"workspaces"> });
	return (
		<div>
			Hello {workspaceId} : {data?.name}
		</div>
	);
}
