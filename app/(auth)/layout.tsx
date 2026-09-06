import Background from "@/components/auth/background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      {children}
    </>
  );
}
