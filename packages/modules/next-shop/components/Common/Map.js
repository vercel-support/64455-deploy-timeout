import { useGoogleMaps, useConfig } from '@foundation/next';

const CommonMap = ({ position, zoom, className, ...options }) => {
  const config = useConfig('shop');
  position = position ??
    config('location') ?? { lat: 50.8364634, lng: 4.3556113 };

  const { ref } = useGoogleMaps(process.env.NEXT_PUBLIC_GOOGLEMAPS, {
    marker: { position },
    center: position,
    zoom: zoom ?? 14,
    disableDefaultUI: true,
    ...options,
  });

  className = ['tm-googlemap'].concat(className || '').join(' ');

  return <figure ref={ref} className={className} />;
};

export default CommonMap;
