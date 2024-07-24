const Header = ({ title }: { title: string }) => {
  return (
    <div className="mb-20">
      <h1 className="md:text-6xl text-5xl lg:text-8xl font-bold text-center  relative z-50 text-white pt-10">
        {title}
      </h1>
      <div className="relative mb-10 w-1/2 mx-auto hidden md:block">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
      </div>
    </div>
  );
};
export default Header;