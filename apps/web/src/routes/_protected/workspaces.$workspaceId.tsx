import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/workspaces/$workspaceId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/workspaces/$workspaceId"!</div>
}
