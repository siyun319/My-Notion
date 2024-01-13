const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full bg-red-500 text-white"> {children}</div>;
};

export default RootLayout;

// you can create layout inside the organizational folders and
// this layout is going to reflect all the routers inside

// used to create separate layouts
// when landing page -> no nav  ar
// when inside notion -> side bar + nav bar
