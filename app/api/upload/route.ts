import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import ShortUniqueId from 'short-unique-id';

import { config } from '@/lib/config/';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const width = parseInt(formData.get('width') as string, 10);
  const imageTitle = formData.get('imageTitle') as string;
  const folder = formData.get('folder') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!width || width <= 0) {
    return NextResponse.json(
      { error: 'Invalid width provided' },
      { status: 400 }
    );
  }

  if (!imageTitle || imageTitle.length <= 0) {
    return NextResponse.json(
      { error: 'Invalid image title provided' },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();
  const image = sharp(Buffer.from(buffer));

  const optimizedImage = await image
    .resize(width)
    .webp({ quality: 80 })
    .toBuffer();

  const imageExt = file.name.split('.').slice(-1)[0].toLowerCase();

  const uid = new ShortUniqueId({ length: 8, dictionary: 'alphanum_lower' });
  const newImageTitle = `${imageTitle}-${uid.rnd()}.${imageExt}`;

  const s3 = new S3({
    region: config.s3_region,

    credentials: {
      accessKeyId: config.aws_access_key,
      secretAccessKey: config.aws_secret_access_key,
    },
  });

  const uploadParams = {
    Bucket: config.s3_bucket_name,
    Key: `${folder}/${newImageTitle}`,
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
