import React, { useState } from "react";
import { Alert, UncontrolledAlert, Card, CardBody, CardTitle } from "reactstrap";

const Alerts = () => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <div>
      {/* Card 1 */}
      <Card className="mb-6">
        <CardTitle tag="h6" className="border-b p-4 mb-0 text-lg font-semibold">
          <i className="bi bi-bell mr-2"></i> Alert
        </CardTitle>
        <CardBody>
          <div className="mt-3 space-y-3">
            <Alert color="blue">
              This is a primary alert— check it out!
            </Alert>
            <Alert color="gray">
              This is a secondary alert— check it out!
            </Alert>
            <Alert color="green">
              This is a success alert— check it out!
            </Alert>
            <Alert color="red">This is a danger alert— check it out!</Alert>
            <Alert color="yellow">
              This is a warning alert— check it out!
            </Alert>
            <Alert color="cyan">This is a info alert— check it out!</Alert>
            <Alert color="light">This is a light alert— check it out!</Alert>
            <Alert color="dark">This is a dark alert</Alert>
          </div>
        </CardBody>
      </Card>
      
      {/* Card 2 */}
      <Card className="mb-6">
        <CardTitle tag="h6" className="border-b p-4 mb-0 text-lg font-semibold">
          <i className="bi bi-bell mr-2" />
          Alert with Links
        </CardTitle>
        <CardBody>
          <div className="space-y-3">
            <Alert color="blue">
              This is a primary alert with{" "}
              <a href="/" className="underline text-blue-600">
                an example link
              </a>
              . Give it a click if you like.
            </Alert>
            {/* More alert examples */}
          </div>
        </CardBody>
      </Card>
      {/* More Cards can follow the same structure */}
    </div>
  );
};

export default Alerts;
