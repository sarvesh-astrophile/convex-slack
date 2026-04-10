import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@open-slack/backend/convex/_generated/api";
import { Button } from "@open-slack/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@open-slack/ui/components/dialog";
import { Field, FieldError, FieldGroup } from "@open-slack/ui/components/field";
import { Input } from "@open-slack/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { FunctionReturnType } from "convex/server";
import { toast } from "sonner";
import z from "zod";

interface CreateWorkspaceModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

type CreateWorkspaceReturnType = FunctionReturnType<
	typeof api.workspaces.create
>;

export const CreateWorkspaceModal = ({
	open,
	onOpenChange,
}: CreateWorkspaceModalProps) => {
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: useConvexMutation(api.workspaces.create),
		onSuccess: (workspace: CreateWorkspaceReturnType) => {
			navigate({ to: `/workspace/${workspace?._id}` });
		},

		onError: (error) => {
			toast.error(error.message);
		},
	});

	const form = useForm({
		defaultValues: {
			name: "",
		},
		validators: {
			onSubmit: z.object({
				name: z.string().min(1, "Workspace name is required."),
			}),
		},
		onSubmit: async ({ value }) => {
			mutate({ name: value.name });
		},
	});
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<form
				id="create-workspace-form"
				onSubmit={(e) => {
					e.preventDefault();
					void form.handleSubmit(e);
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add a workspace</DialogTitle>
						<DialogDescription>
							Create a new workspace by providing a name.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Workspace name"
											type="text"
											required
										/>
										{isInvalid && (
											<FieldError
												errors={field.state.meta.errors?.map((e) => ({
													message:
														typeof e === "string" ? e : e?.message?.toString(),
												}))}
											/>
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
					<DialogFooter>
						<Button
							type="submit"
							form="create-workspace-form"
							disabled={form.state.isSubmitting}
						>
							{form.state.isSubmitting ? "Creating..." : "Create workspace"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
