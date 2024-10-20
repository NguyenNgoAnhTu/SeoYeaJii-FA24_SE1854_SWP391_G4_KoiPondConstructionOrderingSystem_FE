const Dashboard = () => {
  return (
    <div className="container mx-auto">
      Main dashboard layout
      <div className="grid grid-cols-12 gap-4">
        {/* Component 1 */}
        <div className="col-span-3">
          <p>Component 1</p>
        </div>

        {/* Component 2 */}
        <div className="col-span-6">
          <p>Component 2</p>
        </div>

        {/* Component 3 */}
        <div className="col-span-3">
          <p>Component 3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
