interface IUploadImage {
  image: string | null | File;
  folder: 'banners' | 'products' | 'categories';
  width?: number;
  title?: string;
  locale?: string;
}

export async function imageUploader({
  image,
  folder,
  width,
  title,
  locale,
}: IUploadImage) {
  if (image instanceof File) {
    const formData = new FormData();

    formData.append('image', image);
    formData.append('folder', folder);

    if (width) formData.append('width', String(width));
    if (title) formData.append('imageTitle', title);
    if (locale) formData.append('locale', locale);

    let response;

    if (folder === 'banners') {
      response = await fetch('/api/v1/admin/banners', {
        method: 'POST',
        body: formData,
      });
    } else if (folder === 'products') {
      response = await fetch('/api/v1/admin/products/image', {
        method: 'POST',
        body: formData,
      });
    }

    const result: { url: string } = response ? await response.json() : null;

    if (result.url) {
      return result.url;
    } else {
      console.error('Something went wrong while image to S3 loading...');
      return null;
    }
  } else {
    return image === null || image === '' ? '/no-image.webp' : image;
  }
}
