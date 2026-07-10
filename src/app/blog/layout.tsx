export default function BlogLayout({
  children,
  modal,
}: {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
