import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card className="shadow-md">
      <CardBody>
        <div className="flex items-center">
          <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
            <i className={props.icon}></i>
          </div>
          <div className="ms-3">
            <h3 className="text-xl font-bold">{props.earning}</h3>
            <small className="text-gray-500">{props.subtitle}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
