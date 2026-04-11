import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { z } from "zod";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

const serachSchema = z.object({
	createWorkspace: z.boolean().catch(false).optional(),
});

export const Route = createFileRoute("/_protected/home")({
	validateSearch: serachSchema,
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({ from: Route.fullPath });
	const { createWorkspace } = Route.useSearch();
	// const openModal = () => navigate({ search: { createWorkspace: true } });
	// const closeModal = () => navigate({ search: { createWorkspace: false } });
	const isOpen = createWorkspace ?? false;
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
			<CreateWorkspaceModal
				open={isOpen}
				onOpenChange={(open) =>
					navigate({
						search: (prev) => ({
							...prev,
							createWorkspace: open ? true : undefined,
						}),
					})
				}
			/>
		</div>
	);
}
