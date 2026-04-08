import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import { Toaster } from "@open-slack/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/components/theme-provider";

import Header from "../components/header";

import appCss from "../index.css?url";

export interface RouterAppContext {
	queryClient: QueryClient;
	convexQueryClient: ConvexQueryClient;
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "My App",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	return (
		<ConvexAuthProvider client={convex}>
			<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
				<html lang="en" className="dark">
					<head>
						<HeadContent />
					</head>
					<body>
						<div className="h-full">
							<Outlet />
						</div>
						<Toaster richColors />
						<TanStackRouterDevtools position="bottom-left" />
						<Scripts />
					</body>
				</html>
			</ThemeProvider>
		</ConvexAuthProvider>
	);
}
