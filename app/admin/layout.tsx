import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-foreground">GoQode Admin</h1>
            <nav className="flex items-center gap-4">
              <a
                href="/admin/submissions"
                className="text-sm text-zinc-500 hover:text-foreground transition-colors"
              >
                Заявки
              </a>
              <a
                href="/admin/calculator"
                className="text-sm text-zinc-500 hover:text-foreground transition-colors"
              >
                Калькулятор
              </a>
            </nav>
          </div>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-zinc-500 hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
