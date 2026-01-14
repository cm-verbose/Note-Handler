import AuthGuard from "./AuthGuard";

export default function dashboard() {
  return (
    <AuthGuard>
      <div>Hi, this is the dashboard</div>
    </AuthGuard>
  );
}
