
const NotFoundPage = () => {
  const breadcrumbItems = [{ label: "Home", path: "/", active: false }];

  return (
    <div>
      <div className="container-fluid page-header mb-5 py-5">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="container">
        <div>
          <h1 className="text-center">404 - Page Not Found</h1>
          <p className="text-center">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
