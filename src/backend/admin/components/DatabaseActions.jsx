// components/DatabaseActions.js

import CleanDatabase from "./CleanData";
import ExportData from "./ExportData";

// eslint-disable-next-line react/prop-types
const DatabaseActions = ({ databaseRef, headers }) => {
  return (
    <div className="row">
      <div className="col-lg-6 mb-3">
        <ExportData
          databaseRef={databaseRef}
          filename={`${databaseRef}_data.csv`}
          headers={headers}
        />
      </div>
      <div className="col-lg-6 mb-3">
        <CleanDatabase databaseRef={databaseRef} />
      </div>
    </div>
  );
};

export default DatabaseActions;
