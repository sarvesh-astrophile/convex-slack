import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";

interface SidebarProps {
	workspaceId: Id<"workspaces">;
}

export const Sidebar = ({ workspaceId }: SidebarProps) => {
	return (
		<aside className="flex h-full flex-col items-center gap-y-4 bg-primary px-2 pt-[9px] pb-4">
			<WorkspaceSwitcher workspaceId={workspaceId} />
			<div className="mt-auto flex flex-col items-center gap-y-1">
				<UserButton />
			</div>
		</aside>
	);
};
