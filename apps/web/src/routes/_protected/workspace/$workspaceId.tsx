import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { createFileRoute } from "@tanstack/react-router";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Sidebar } from "./-components/sidebar";
import { Toolbar } from "./-components/toolbar";

export const Route = createFileRoute("/_protected/workspace/$workspaceId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { workspaceId } = Route.useParams();
	const { data } = useGetWorkspace({ id: workspaceId as Id<"workspaces"> });
	return (
		<div className="h-full">
			<Toolbar workspaceId={workspaceId as Id<"workspaces">} />
			<div className="flex h-[calc(100vh-40px)]">
				<Sidebar workspaceId={workspaceId as Id<"workspaces">} />
				Hello {workspaceId} : {data?.name}
			</div>
		</div>
	);
}
