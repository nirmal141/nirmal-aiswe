import MinimalNavigation from '@/components/sections/MinimalNavigation';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalNavigation />
      {children}
    </>
  );
}
