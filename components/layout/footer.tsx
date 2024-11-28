export const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: "url(images/garland.png)",
        backgroundSize: "50%",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "top",
      }}
    >
      <div className="flex h-16 items-center justify-center md:mb-10 lg:mb-20">
        <p className="">&copy; {new Date().getFullYear()} - Xeralya</p>
      </div>
    </footer>
  );
};
