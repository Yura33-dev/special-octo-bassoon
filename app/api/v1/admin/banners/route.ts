import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import ShortUniqueId from 'short-unique-id';

import { config } from '@/lib/config';

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get('image') as File;
  const locale = formData.get('locale') as string;
  const width = 1000;
  const height = 400;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const image = sharp(Buffer.from(buffer));

  const optimizedImage = await image
    .resize(width, height, { fit: 'cover' })
    .webp({ quality: 100 })
    .toBuffer();

  const imageExt = file.name.split('.').slice(-1)[0].toLowerCase();

  const uid = new ShortUniqueId({ length: 8, dictionary: 'alphanum_lower' });
  const newImageTitle = `banner-${locale}-${uid.rnd()}.${imageExt}`;

  const s3 = new S3({
    region: config.s3_region,

    credentials: {
      accessKeyId: config.aws_access_key,
      secretAccessKey: config.aws_secret_access_key,
    },
  });

  const uploadParams = {
    Bucket: config.s3_bucket_name,
    Key: `banners/${newImageTitle}`,
    Body: optimizedImage,
    ContentType: file.type,
  };

  try {
    const data = await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
    return NextResponse.json({ url: data.Location });
  } catch (error: unknown) {
    console.error('Ошибка загрузки на S3:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { bannerImageUa, bannerImageRu } = await req.json();

  if (!bannerImageUa && !bannerImageRu) {
    return NextResponse.json({ error: 'No banners provided' }, { status: 400 });
  }

  const imagesToDelete: string[] = [bannerImageUa, bannerImageRu]
    .filter(Boolean)
    .filter(image => image !== '/no-image.webp');

  if (imagesToDelete.length === 0) {
    return NextResponse.json(
      { error: 'No valid images to delete' },
      { status: 400 }
    );
  }

  try {
    await Promise.all(imagesToDelete.map(image => deleteImageFromS3(image)));
  } catch (error: unknown) {
    console.error('Ошибка при удалении изображений с S3:', error);
    return NextResponse.json(
      { error: 'Failed to delete image from S3' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

async function deleteImageFromS3(imageUrl: string): Promise<void> {
  const s3 = new S3({
    region: config.s3_region,
    credentials: {
      accessKeyId: config.aws_access_key,
      secretAccessKey: config.aws_secret_access_key,
    },
  });

  const url = new URL(imageUrl);
  const key = url.pathname.slice(1);

  await s3.deleteObject({
    Bucket: config.s3_bucket_name,
    Key: key,
  });
}
