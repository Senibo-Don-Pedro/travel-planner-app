interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  );

  const data = await response.json();

  return {
    country: data.address?.country ?? "Unknown",
    formattedAddress: data.display_name ?? "Unknown address",
  };
}
