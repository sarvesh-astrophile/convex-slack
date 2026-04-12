import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { Button } from "@open-slack/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@open-slack/ui/components/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import Loader from "@/components/loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

interface WorkspaceSwitcherProps {
	workspaceId: Id<"workspaces">;
}

export const WorkspaceSwitcher = ({ workspaceId }: WorkspaceSwitcherProps) => {
	const navigate = useNavigate();
	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});
	const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

	const filteredWorkspaces = workspaces?.filter((w) => w._id !== workspaceId);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button className="relative size-9 overflow-hidden bg-[#ABABAD] text-slate-800 text-xl hover:bg-[#ABABAD]/80">
					{workspaceLoading ? <Loader /> : workspace?.name[0].toUpperCase()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" className="w-full" align="start">
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer flex-col items-start justify-start capitalize">
						{workspace?.name}
						<span className="text-muted-foreground text-xs">
							Active workspace
						</span>
					</DropdownMenuItem>
					{filteredWorkspaces?.map((w) => (
						<DropdownMenuItem
							className="cursor-pointer capitalize"
							key={w._id}
							onClick={() => navigate({ to: `/workspace/${w._id}` })}
						>
							{w.name}
						</DropdownMenuItem>
					))}
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							navigate({
								to: ".",
								search: (prev) => ({ ...prev, createWorkspace: true }),
							});
						}}
					>
						<div className="relative mr-2 flex size-9 items-center justify-center rounded-md bg-[#f2f2f2] font-semibold text-lg text-slate-800">
							<Plus />
						</div>
						Create a new workspace
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
