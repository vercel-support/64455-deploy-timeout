import { PortableText } from '@shop/components/Sanity';

const TextRegion = ({ item }) => {
  return (
    <>
      <h1>{item.title}</h1>
      <div>
        <PortableText blocks={item.body} />
      </div>
    </>
  );
};

export default TextRegion;