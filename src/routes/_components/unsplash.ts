const apiUrl = import.meta.env.VITE_PUBLIC_UNSPLASH_API_KEY

const fetchData = async (search_term: string) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${search_term}&client_id=${apiUrl}`,
    {
      method: 'GET',
    },
  )
  return await res.json()
}

// export async function getRandomImage(term: string): Promise<ImageFormatted> {
// 	return fetchData(term).then((res) => {
// 		const number_of_images = res.results.length;
// 		const random_number = Math.floor(Math.random() * number_of_images);
// 		const image = res.results[random_number];
// 		const image_formated = {
// 			image_id: image.id,
// 			image_description: image.description,
// 			image_author: image.user.name,
// 			image_url: image.urls.regular,
// 			image_url_small: image.urls.small
// 		};
// 		return image_formated;
// 	});
// }

// export async function getRandomImage(imageThemes: string[], fetch: typeof window.fetch) {
// 	const theme = imageThemes[Math.floor(Math.random() * imageThemes.length)];
// 	const url = `https://api.unsplash.com/search/photos?page=1&query=${theme}&client_id=YOUR_UNSPLASH_API_KEY`;

// 	const response = await fetch(url);
// 	const data = await response.json();

// 	if (!response.ok) {
// 		throw new Error(data.errors || 'Failed to fetch image');
// 	}

// 	const images = data.results;
// 	const randomImage = images[Math.floor(Math.random() * images.length)];

// 	return randomImage;
// }
// }
export async function getRandomImage(
  imageThemes: Array<string>,
): Promise<ImageFormatted> {
  try {
    // Select a random theme from the provided array
    const term = imageThemes[Math.floor(Math.random() * imageThemes.length)]

    // Fetch data using the selected theme
    const res = await fetchData(term as string)

    // Check if results are available
    if (!res || !res.results || res.results.length === 0) {
      throw new Error('No images found for the given theme')
    }

    // Select a random image from the results
    const number_of_images = res.results.length
    const random_number = Math.floor(Math.random() * number_of_images)
    const image = res.results[random_number]

    // Format the selected image data
    const image_formatted = {
      image_id: image.id,
      image_description: image.description || 'No description available',
      image_author: image.user.name || 'Unknown author',
      image_url: image.urls.regular,
      image_url_small: image.urls.small,
    }

    // Return the formatted image data
    return image_formatted
  } catch (error) {
    console.error('Error fetching images:', error)
    return {
      image_id: 'unknown',
      image_description: 'unknown',
      image_author: 'unknown',
      image_url: 'https://source.unsplash.com/random/?stars',
      image_url_small: 'https://source.unsplash.com/random/?stars',
    }
  }
}
