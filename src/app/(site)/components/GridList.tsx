const GridList: React.FCC = ({ children }) => {
  return (
    <div className="mb-16 grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3 lg:gap-x-12">
      {children}
    </div>
  );
};

export default GridList;
