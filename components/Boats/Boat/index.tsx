import { boatIconMapping, boatTypeMapping } from "@/lib/constants"
import Link from "next/link"
import { Image } from "@/components/Image"

import { capitalize, cn, formatPrice } from "@/lib/utils"

import styles from "./index.module.scss"
import { getBoatData } from "@/lib/getBoatData"
import { BoatClauseMapping } from "@/components/BoatClauseMapping"

type BoatProps = {
  boatName: BoatName
}

export const Boat = ({ boatName }: BoatProps) => {
  const { data, mainImage } = getBoatData(boatName)

  const { name, capacity, slug, type, price } = data

  const clauseMapping = [
    { key: "Тип", value: boatTypeMapping[type], icon: boatIconMapping.type },
    {
      key: "Вместимость",
      value: `${capacity} человек`,
      icon: boatIconMapping.capacity,
    },
    {
      key: "Цена",
      value: formatPrice(price),
      icon: boatIconMapping.price,
    },
  ]

  return (
    <Link href={`/boat/${name}`} className={cn(styles.root, "bg-sand")}>
      <div className="bg-bronze absolute top-[1%] right-[-4%] z-10 rounded-[8px] px-5 py-2 text-[24px] font-medium text-black">
        {capitalize(slug)}
      </div>

      <Image
        containerClassname={styles.photo}
        loading="lazy"
        src={mainImage}
        fill
        alt={name}
      />

      <BoatClauseMapping clauseMapping={clauseMapping} />
    </Link>
  )
}
