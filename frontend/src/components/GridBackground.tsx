const GridBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full  bg-black text-white bg-grid-white/[0.2] relative">
      <div className="absolute w-full h-full  pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="container relative h-full">{children}</div>
    </div>
  );
};
export default GridBackground;
