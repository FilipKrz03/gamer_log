import AuthChecker from "./components/AuthChecker/AuthChecker";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthChecker>{children}</AuthChecker>;
}
