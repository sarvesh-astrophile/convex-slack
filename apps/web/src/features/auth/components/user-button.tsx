import { useAuthActions } from "@convex-dev/auth/react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@open-slack/ui/components//avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@open-slack/ui/components/dropdown-menu";
import { LoaderCircle, LogOut } from "lucide-react";
import { useCurrentUser } from "../api/user-current-user";

export const UserButton = () => {
	const { signOut } = useAuthActions();
	const { data, isLoading } = useCurrentUser();
	if (isLoading)
		return (
			<LoaderCircle className="size-4 animate-spin text-muted-foreground" />
		);
	if (!data) return null;
	const { image, name } = data;
	const avatarFallback = name ? name[0] : null;

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger>
				<Avatar size="default" className="relative outline-none">
					<AvatarImage src={image} alt={name} />
					<AvatarFallback>{avatarFallback}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="right" align="center" className="rounded-md">
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={signOut}>
						<LogOut /> Logout
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
