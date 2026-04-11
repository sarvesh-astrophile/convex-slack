import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { Button } from "@open-slack/ui/components/button";
import { Info, Search } from "lucide-react";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

interface ToolbarProps {
	workspaceId: Id<"workspaces">;
}

export const Toolbar = ({ workspaceId }: ToolbarProps) => {
	const { data: workspace } = useGetWorkspace({ id: workspaceId });

	return (
		<nav className="itmes-center flex h-10 justify-between bg-primary p-1.5">
			<div className="flex-1" />
			<div className="max-[642px] min-w-70 shrink grow-2">
				<Button
					size="sm"
					className="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent-25"
				>
					<Search className="mr-2 size-4 text-white" />
					<span className="text-white text-xs">Search {workspace?.name}</span>
				</Button>
			</div>
			<div className="ml-auto flex flex-1 items-center justify-end">
				<Button variant="transparent" size="icon-sm">
					<Info className="size-5 text-white" />
				</Button>
			</div>
		</nav>
	);
};
