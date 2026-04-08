import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@open-slack/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@open-slack/ui/components/card";
import { Field, FieldError, FieldGroup } from "@open-slack/ui/components/field";
import { Input } from "@open-slack/ui/components/input";
import { Separator } from "@open-slack/ui/components/separator";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import type { SignInFlow } from "../types";
import { GitHub, Google } from "./logos";

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	const { signIn } = useAuthActions();
	const handleProviderSignIn = async (value: "github" | "google") => {
		const result = await signIn(value);
		// OAuth requires redirect to provider
		if (result.redirect) {
			window.location.href = result.redirect.toString();
		}
	};
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: z.object({
				email: z.email(),
				password: z.string().min(8),
				confirmPassword: z.string().min(8),
			}),
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<Card className="mx-auto h-full w-full max-w-sm p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Sign up to continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5 px-0 pb-0">
				<form
					id="sign-up-form"
					onSubmit={form.handleSubmit}
					className="space-y-2.5"
				>
					<FieldGroup className="gap-2.5">
						<form.Field
							name="email"
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
											placeholder="Email"
											type="email"
											required
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="password"
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
											placeholder="Password"
											type="password"
											required
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="confirmPassword"
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
											placeholder="Confirm Password"
											type="password"
											required
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<Button
							form="sign-up-form"
							type="submit"
							className="w-full"
							size="lg"
							disabled={false}
						>
							Sign up
						</Button>
					</FieldGroup>
				</form>
				<Separator />
				<div className="flex flex-col gap-y-2.5">
					<Button
						disabled={false}
						onClick={() => handleProviderSignIn("google")}
						variant="outline"
						size="lg"
						className="w-full"
					>
						<Google className="size-5" /> Continue with Google
					</Button>
					<Button
						disabled={false}
						onClick={() => handleProviderSignIn("github")}
						variant="outline"
						size="lg"
						className="w-full"
					>
						<GitHub className="size-5" /> Continue with GitHub
					</Button>
				</div>
				<p className="text-center">
					Already have an account?{" "}
					<Button
						onClick={() => setState("signIn")}
						variant="link"
						className="px-0 text-sky-700"
					>
						Sign in
					</Button>
				</p>
			</CardContent>
		</Card>
	);
};
