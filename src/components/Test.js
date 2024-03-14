const Test = ({ children }) => {
  return (
    <>
      <h1>Test Page</h1>
      {children}
    </>
  );
};
const Title = ({ title }) => {
  return <h1>{title}</h1>;
};
Test.Title = Title;
export default Test;
