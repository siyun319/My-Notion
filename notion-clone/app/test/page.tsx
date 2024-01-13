const TestPage = () => {
  return <div>Hello Test Page</div>;
};

// everyfolder you put inside app folder can be a route.
// app -> components ->pages.tsx; localhost:3000/components
// rename it to _components to avoid this!!

// underscore folder
// can not be access by url
//(root) folder won't affect the url
// but it can have its own layout which can then affect all the other rountes inside of that component
export default TestPage;
