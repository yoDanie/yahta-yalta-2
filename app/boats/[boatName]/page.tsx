import { getBoatData } from "@/lib/getBoatData"
import Link from "next/link"

import styles from "./boatpage.module.scss"
import { capitalize } from "@/lib/utils"
import { BoatParameters } from "./BoatParameters"
import { Contacts } from "@/components/Contacts"
import { Boats } from "@/components/Boats/Boats"
import { RopeDivider } from "@/components/RopeDivider"
import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"

import type { Metadata } from "next"
import { boatTypeMapping, dashChar } from "@/lib/constants"

type Params = Promise<{ boatName: string }>

const keywordsMapping = {
  sailing: "парусная яхта в ялте, парусник ялта, прогулка под парусом,",
  motor: "моторная яхта в ялте, рыбалка с катера",
  catamaran: "катамаран ялта, яхта-катамаран",
}

export async function generateMetadata({
  params,
}: {
  params: Params
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { boatName } = await params
  const {
    data: { slug, type, name },
    mainImage,
  } = getBoatData(boatName as BoatName)

  const textAddition = type === "catamaran" ? "" : "яхта"

  const titleMainPart = `${capitalize(slug)} ${dashChar} ${boatTypeMapping[type]} ${textAddition}`

  const description = `${capitalize(boatTypeMapping[type])} ${textAddition} "${capitalize(
    slug,
  )}". Забронировать +7 978-1000-171 | Скидки на аренду светового дня и суток | ${
    type === "sailing"
      ? "Романтическая прогулка под парусом"
      : "Рыбалка на яхте"
  }`

  const keywords = `яхта ${slug}, яхта
  ${slug} ялта, яхта ${name}, яхта ${name} ялта, ${keywordsMapping[type]}, рыбалка на яхте, морская прогулка, аренды яхты, заказать яхту, снять яхту, прогулки на яхте, прогулки на катере, морская прогулка ялта, морские прогулки, ялта, яхта, катер, аренда, морское путешествие, экскурсия, рыбалка, прогулка на яхте, снять яхту, аренда яхты с капитаном, аренда, заказать яхту, морская экскурсия ласточкино гнездо, ласточка, гнездо, гнездышко, гурзуф яхта, медведь гора яхта`

  return {
    title: `${titleMainPart}. Аренда и морская прогулка на ${capitalize(name)} в Ялте`,
    description,
    keywords,
    openGraph: {
      // url: baseURL
      images: mainImage,
      type: "website",
      description,
      title: `${titleMainPart}. Аренда яхты, морская прогулка в Ялте`,
    },
  }
}

const BoatPage = async ({ params }: { params: Params }) => {
  const { boatName } = await params

  const { data, images, mainImage } = getBoatData(boatName as BoatName)
  const { slug, name, description } = data

  const thumbs = images.slice(1, 4)

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{capitalize(slug)}</h1>

      <div className={styles.showcase}>
        <div className={styles.photos}>
          <Link
            className="scale-animated-xs relative h-3/4"
            href={`/boats/${name}/gallery?initialSlide=${0}`}
          >
            <BoatImageWithSkeleton
              src={mainImage}
              alt={`Заглавное фото яхты ${slug}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 60vw"
            />
          </Link>
          <div className={styles.thumbs}>
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
                  sizes="(max-width: 1280px) 33vw, 20vw"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.about}>
          <BoatParameters {...data} />
          <div className={styles.description}>
            <div className={styles.subtitle}>Описание</div>
            <div className={styles.descriptionText}>{description}</div>
          </div>
        </div>
      </div>

      <Boats topRopeDivider title="Другие яхты" currentBoat={name} />
    </div>
  )
}

export default BoatPage
