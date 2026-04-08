import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/features/auth/components/auth-screen";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return <AuthScreen />;
}
