interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="border w-screen h-screen flex justify-center items-center text-center">
      {children}
    </div>
  );
}
