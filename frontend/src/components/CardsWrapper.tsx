import Header from "./Header";

const CardsWrapper = ({ children }: { children: React.ReactNode }) => {
  // TODO => ADD RELATIONSHIPS
  return (
    <div className="w-full min-h-[40vh] py-10">
      {/* <p className="text-5xl font-bold text-center my-10">History</p> */}
      <Header title="History" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {children}
      </div>
    </div>
  );
};
export default CardsWrapper;
