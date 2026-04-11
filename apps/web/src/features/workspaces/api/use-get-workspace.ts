import { api } from "@open-slack/backend/convex/_generated/api";
import type { Id } from "@open-slack/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface UseGetWorkspaceProps {
	id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
	const data = useQuery(api.workspace.getbyId, { id });
	const isLoading = data === undefined;
	return { data, isLoading };
};
