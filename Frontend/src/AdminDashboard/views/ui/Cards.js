import { Button } from "reactstrap"; // Optional, we'll use Tailwind's Button styling
import {Row} from "reactstrap";

const BlogData = [
  {
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Cards = () => {
  return (
    <div className="container mx-auto p-6">
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2: Alignment Text*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row className="mb-6">
        <h5 className="mb-3 mt-3 text-xl font-semibold">Alignment Text</h5>

        <div className="flex gap-6 flex-wrap">
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h5 className="text-xl font-semibold">Special Title Treatment</h5>
              <p className="text-gray-500 mt-2">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <div className="mt-4">
                <Button color="light-danger" className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                  Go somewhere
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h5 className="text-xl font-semibold">Special Title Treatment</h5>
              <p className="text-gray-500 mt-2">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <div className="mt-4">
                <Button color="light-danger" className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                  Go somewhere
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Row>

      {/* --------------------------------------------------------------------------------*/}
      {/* Blog Cards*/}
      {/* --------------------------------------------------------------------------------*/}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {BlogData.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold">{item.title}</h5>
              <p className="text-sm text-gray-500 mt-2">{item.subtitle}</p>
              <p className="text-gray-700 mt-2">{item.description}</p>
              <Button
                color="light-danger"
                className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
