import React, { useState } from 'react'
import { wrap } from '@popmotion/popcorn'
import { AnimatePresence, motion } from 'framer-motion'
import { GetBoadDataReturn } from 'getBoatData'

import { Image, Link } from 'components'

import styles from './Carousel.module.scss'

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.2,
  }),
}

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
}

type CarouselProps = {
  images: GetBoadDataReturn['images']
}

export const Carousel = ({ images }: CarouselProps) => {
  const [[imageCount, direction], setImageCount] = useState([0, 0])

  const activeImageIndex = wrap(0, images.length, imageCount)

  const swipeToImage = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection])
  }

  const dragEndHandler = (dragInfo: any) => {
    const draggedDistance = dragInfo.offset.x
    const swipeThreshold = 50
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1)
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1)
    }
  }

  const skipToImage = (imageId: number) => {
    let changeDirection = 1
    if (imageId > activeImageIndex) {
      changeDirection = 1
    } else if (imageId < activeImageIndex) {
      changeDirection = -1
    }
    setImageCount([imageId, changeDirection])
  }

  return (
    <div className={styles.root}>
      <div className={styles['slider-container']}>
        <div className={styles.slider}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              // style={{
              //   backgroundImage: `url(/public/images/boats/alexandra/${images[activeImageIndex].filePath})`,
              // }}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className={styles.image}
            >
              <Image
                src={images[activeImageIndex].default}
                alt={`Заглавное фото `}
                placeholder="empty"
                className={styles.img}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => swipeToImage(-1)}>PREV</button>
          <button onClick={() => swipeToImage(1)}>NEXT</button>
        </div>
      </div>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <div
            key={image.default}
            onClick={() => skipToImage(index)}
            className={styles['thumbnail-container']}
          >
            <Image src={image.default} alt={`Заглавное фото `} placeholder="empty" />
            {/* <div
              className={`active-indicator ${image.id === activeImageIndex ? 'active' : null}`}
            /> */}
          </div>
        ))}
      </div>
    </div>
  )
}
