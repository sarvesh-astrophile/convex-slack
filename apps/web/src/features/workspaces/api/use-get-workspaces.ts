import { api } from "@open-slack/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetWorkspaces = () => {
	const data = useQuery(api.workspace.get);
	const isLoading = data === undefined;
	return { data, isLoading };
};
