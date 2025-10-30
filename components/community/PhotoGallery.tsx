import Image from 'next/image'

interface Photo {
  src: string
  alt: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return null
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Photo Gallery
      </h2>
      <div
        data-testid="photo-gallery"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            data-testid="gallery-photo"
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}
