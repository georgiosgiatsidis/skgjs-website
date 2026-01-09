'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Photo {
  url: string
  fileName: string
}

interface EventPhotoGalleryProps {
  photos: Photo[]
  eventTitle: string
}

export function EventPhotoGallery({ photos, eventTitle }: EventPhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (photos.length === 0) {
    return null
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Prepare slides for lightbox
  const slides = photos.map((photo) => ({
    src: photo.url,
    alt: `${eventTitle} - ${photo.fileName}`,
  }))

  return (
    <>
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-js-yellow/20">
            <svg
              className="h-5 w-5 text-js-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Photo Gallery</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {photos.length} photo{photos.length !== 1 ? 's' : ''} from this event
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {photos.map((photo, index) => (
            <button
              key={photo.url}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 ring-2 ring-transparent transition-all duration-300 hover:ring-js-yellow hover:ring-offset-2 hover:ring-offset-white focus:outline-none focus:ring-js-yellow focus:ring-offset-2 dark:bg-gray-800 dark:hover:ring-offset-gray-900 dark:focus:ring-offset-gray-900"
              aria-label={`View photo ${index + 1} of ${photos.length}`}
            >
              <Image
                src={photo.url}
                alt={`${eventTitle} - Photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 dark:bg-gray-900/90">
                <svg
                  className="h-4 w-4 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: photos.length <= 1 }}
      />
    </>
  )
}
