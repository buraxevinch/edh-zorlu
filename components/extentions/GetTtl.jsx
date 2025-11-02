const GetTtl = (props) => {
  const { pos, ttl, subttl } = props;
  const cls = pos > 1 ? [" items-center text-center", " before:left-1/2 before:-translate-x-1/2"] : ["", ""];

  return (
    <div className={`lg:mb-5 mb-2 flex flex-col${cls[0]} gap-y-3`}>
      {ttl ? <h3 className={`${cls[1]} lg:text-2xl text-xl`}>{ttl}</h3> : ""}
      {subttl ? /<\/?[a-z][\s\S]*>/i.test(subttl) ? <div className="edt" dangerouslySetInnerHTML={{ __html: subttl }} /> : <p className="lg:text-xl text-lg">{subttl}</p> : ""}
    </div>
  );
};

export default GetTtl;
