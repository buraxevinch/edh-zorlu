import React from "react";

const Info = ({ data }) => {
  const { text } = data;

  return (
    <main className="content">
      <div className="text-center">{text.ttl}</div>
    </main>
  );
};

export default Info;
