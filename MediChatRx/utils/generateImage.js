export default async function generateImage(image) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${image}`, {
      headers: {
        Authorization:
          "E3RIAOJzGiP9hYzphERxrZacZqGtkCh87OXFXuU6RjrWEdfHR74qmHCa",
      },
    });

    const data = await res.json();

    return data.photos[0].src.landscape;
  } catch (error) {
    console.log(error);
  }
}
