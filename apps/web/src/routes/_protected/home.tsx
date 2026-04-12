import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export const Route = createFileRoute("/_protected/home")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({ from: Route.fullPath });
	const { data, isLoading } = useGetWorkspaces();
	const workspaceId = useMemo(() => data?.[0]?._id, [data]);
	useEffect(() => {
		if (isLoading) return;
		if (workspaceId) {
			navigate({ to: `/workspace/${workspaceId}` });
		} else {
			navigate({ search: { createWorkspace: true } });
		}
	}, [workspaceId, isLoading, navigate]);
	return (
		<div>
			Hello "/test"!
			<UserButton />
		</div>
	);
}
