import "../../../chunks/index.js";
import "pocketbase";
const apiUrl = "CYkDr0Uz91KszajL_mlSyM08cYWvmMmX7V7K0SYfNHI";
const fetchData = async (search_term) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${search_term}&client_id=${apiUrl}`,
    {
      method: "GET"
    }
  );
  return await res.json();
};
async function getRandomImage(imageThemes) {
  try {
    const term = imageThemes[Math.floor(Math.random() * imageThemes.length)];
    const res = await fetchData(term);
    if (!res || !res.results || res.results.length === 0) {
      throw new Error("No images found for the given theme");
    }
    const number_of_images = res.results.length;
    const random_number = Math.floor(Math.random() * number_of_images);
    const image = res.results[random_number];
    const image_formatted = {
      image_id: image.id,
      image_description: image.description || "No description available",
      image_author: image.user.name || "Unknown author",
      image_url: image.urls.regular,
      image_url_small: image.urls.small
    };
    return image_formatted;
  } catch (error) {
    console.error("Error fetching images:", error);
    return {
      image_id: "unknown",
      image_description: "unknown",
      image_author: "unknown",
      image_url: "https://source.unsplash.com/random/?stars",
      image_url_small: "https://source.unsplash.com/random/?stars"
    };
  }
}
const load = async () => {
  const imageThemes = [
    "stars",
    "space",
    "books",
    "planet",
    "planets",
    "library"
  ];
  try {
    const randomImage = await getRandomImage(imageThemes);
    return {
      photo: randomImage
    };
  } catch (error) {
    return {
      photo: null
    };
  }
};
export {
  load
};
