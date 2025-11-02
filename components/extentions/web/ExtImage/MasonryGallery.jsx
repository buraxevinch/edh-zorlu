"use client";
import HandleMedia from "./HandleMedia";

const MasonryGallery = ({ count, height, list }) => {
  const columns = Array.from({ length: count }, () => []);
  const columnHeights = new Array(count).fill(0);

  list.forEach((item, ind) => {
    const height = item.img.hgh;
    const minColIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columns[minColIndex].push({ ...item, flatIndex: ind });
    columnHeights[minColIndex] += height;
  });

  return columns.map((col, ind) => (
    <div key={ind} className="flex-1 space-y-4">
      {col.map((item) => (
        <HandleMedia key={item.id} height={height} item={item} />
      ))}
    </div>
  ));
};

export default MasonryGallery;
