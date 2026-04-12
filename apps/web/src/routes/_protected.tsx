import {
	createFileRoute,
	Navigate,
	Outlet,
	useNavigate,
} from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

export const searchSchema = z.object({
	createWorkspace: z.boolean().catch(false).optional(),
});

export const Route = createFileRoute("/_protected")({
	component: AuthenticatedLayout,
	validateSearch: searchSchema,
});

function AuthenticatedLayout() {
	const navigate = useNavigate();
	const { createWorkspace } = Route.useSearch();
	const isOpen = createWorkspace ?? false;

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
				<div className="h-full">
					<Outlet />
				</div>
				<CreateWorkspaceModal
					open={isOpen}
					onOpenChange={(open) =>
						navigate({
							to: ".",
							search: (prev) => ({
								...prev,
								createWorkspace: open ? true : undefined,
							}),
						})
					}
				/>
			</Authenticated>
		</>
	);
}
