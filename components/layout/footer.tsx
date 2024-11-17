export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 flex h-16 items-center justify-center border-t">
      <p>&copy; {year} - Xeralya</p>
    </footer>
  );
};
