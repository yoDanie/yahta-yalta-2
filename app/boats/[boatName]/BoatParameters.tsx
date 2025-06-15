import { boatTypeMapping } from "@/lib/constants"
import { cn, formatPrice } from "@/lib/utils"
import { BoatClauseMapping } from "@/components/BoatClauseMapping"
import {
  Bed,
  MoveHorizontal,
  MoveVertical,
  Ship,
  ShipWheel,
  Users,
} from "lucide-react"

export const BoatParameters = (boatData: BoatData) => {
  const { price, type, capacity, length, width, cabins, sleeps } = boatData

  const clauseMapping = [
    {
      key: "Тип",
      value: boatTypeMapping[type],
      icon: <Ship className="size-5" />,
    },
    {
      key: "Вмещает",
      value: capacity ? `до ${capacity} человек` : null,
      icon: <Users className="size-5" />,
    },
    {
      key: "Длина",
      value: length ? `${length} м` : null,
      icon: <MoveVertical className="size-5" />,
    },
    {
      key: "Ширина",
      value: width ? `${width} м` : null,
      icon: <MoveHorizontal className="size-5" />,
    },
    { key: "Кают", value: cabins, icon: <ShipWheel className="size-5" /> },
    { key: "Спальных мест", value: sleeps, icon: <Bed className="size-5" /> },
  ]

  return (
    <div
      className={cn(
        "flex w-full max-w-[600px] flex-col gap-[50px] rounded-[20px] p-[40px_20px] text-[20px] shadow-[0_0_5px_3px_var(--color-blue)]",
        "bg-gradient-1-3",
      )}
    >
      <div className="text-bronze text-center text-[30px] font-bold">
        {formatPrice(price)}
      </div>
      <BoatClauseMapping
        className="gap-[40px] text-[20px]"
        theme="dark"
        clauseMapping={clauseMapping}
      />
    </div>
  )
}
