import { getBoatData } from "@/lib/getBoatData"
import Link from "next/link"

import styles from "./boatpage.module.scss"
import { capitalize } from "@/lib/utils"
import { BoatParameters } from "./BoatParameters"
import { Contacts } from "@/components/Contacts"
import { Boats } from "@/components/Boats/Boats"
import { RopeDivider } from "@/components/RopeDivider"
import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"

export const BoatPage = async ({
  params,
}: {
  params: Promise<{ boatName: string }>
}) => {
  const { boatName } = await params

  const { data, images, mainImage } = getBoatData(boatName as BoatName)
  const { slug, name, description } = data

  const thumbs = images.slice(1, 4)

  return (
    <>
      <div className={styles.showcase}>
        <h1 className={styles.titleMobile}>{capitalize(slug)}</h1>

        <div className="flex w-3/5 flex-col gap-3">
          <Link
            className="scale-animated-xs relative h-3/4"
            href={`/boats/${name}/gallery?initialSlide=${0}`}
          >
            <BoatImageWithSkeleton
              src={mainImage}
              alt={`Заглавное фото яхты ${slug}`}
              fill
            />
          </Link>
          <div className="flex h-1/4 w-full gap-3">
            {thumbs.map((src, index) => (
              <Link
                key={index}
                className="scale-animated-xs relative w-1/3"
                href={`/boats/${name}/gallery?initialSlide=${index + 1}`}
              >
                <BoatImageWithSkeleton
                  src={src}
                  alt={`Фото яхты ${slug}`}
                  fill
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-2/5 flex-col items-center gap-[80px] px-5 py-12">
          <h1 className={styles.title}>{capitalize(slug)}</h1>
          <BoatParameters {...data} />
        </div>

        <RopeDivider />
      </div>
      <div className={styles.details}>
        <div className={styles.order}>
          <div className={styles.subtitle}>Забронировать</div>
          <Contacts boatData={data} />
        </div>
        <div className={styles.description}>
          <div className={styles.subtitle}>Описание</div>
          <div className={styles.descriptionText}>{description}</div>
        </div>
      </div>

      <Boats title="Другие яхты" currentBoat={name} />
    </>
  )
}

export default BoatPage
