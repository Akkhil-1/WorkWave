import React, { useState } from "react";

const FeedData = [
  { title: "Cras justo odio", icon: "bi bi-bell", color: "bg-blue-500", date: "6 minutes ago" },
  { title: "New user registered.", icon: "bi bi-person", color: "bg-green-500", date: "6 minutes ago" },
  { title: "Server #1 overloaded.", icon: "bi bi-hdd", color: "bg-red-500", date: "6 minutes ago" },
  { title: "New order received.", icon: "bi bi-bag-check", color: "bg-yellow-500", date: "6 minutes ago" },
  { title: "Cras justo odio", icon: "bi bi-bell", color: "bg-gray-500", date: "6 minutes ago" },
  { title: "Server #1 overloaded.", icon: "bi bi-hdd", color: "bg-orange-500", date: "6 minutes ago" },
];

const Feeds = () => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <div className="flex gap-10">
      <div className="w-1/2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h5 className="text-xl font-semibold">Notifications</h5>
          <h6 className="text-gray-600 mb-4">Widget you can use</h6>

          <ul>
            {FeedData.map((feed, index) => (
              <li key={index} className="flex items-center justify-between py-3 px-4 border-b last:border-b-0">
                <button className={`rounded-full p-2 ${feed.color} text-white mr-3`}>
                  <i className={feed.icon}></i>
                </button>
                <div className="flex-grow">{feed.title}</div>
                <small className="text-gray-500">{feed.date}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
