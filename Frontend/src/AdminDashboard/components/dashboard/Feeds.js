import React, { useState } from "react";
import { Card, CardBody, CardTitle, Button, Alert } from "reactstrap";

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "New order received.",
    icon: "bi bi-bag-check",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Server #1 overloaded.",
    icon: "bi bi-hdd",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <Card className="shadow-md">
      <CardBody>
        <CardTitle tag="h5" className="text-xl font-bold">Notifications</CardTitle>
        <div>
          <Alert color="info" isOpen={visible} toggle={onDismiss} className="mb-2">
            I am an alert and I can be dismissed!
          </Alert>
          <Alert color="success" isOpen={visible} toggle={onDismiss} className="mb-2">
            I am an alert and I can be dismissed!
          </Alert>
          <Alert color="warning" isOpen={visible} toggle={onDismiss} className="mb-2">
            I am an alert and I can be dismissed!
          </Alert>
          <Alert color="dark" isOpen={visible} toggle={onDismiss} className="mb-2">
            I am an alert and I can be dismissed!
          </Alert>
        </div>
      </CardBody>
    </Card>
  );
};

export default Feeds;
