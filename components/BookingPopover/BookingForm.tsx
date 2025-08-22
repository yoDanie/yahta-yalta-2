"use client"
import { Image } from "@/components/Image"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { orderedBoatsData } from "@/data"
import { capitalize } from "@/lib/utils"
import telegram from "@/public/icons/telegram.svg"
import whatsapp from "@/public/icons/whatsapp.svg"
import { FormProvider, useForm } from "react-hook-form"
import { Combobox } from "../ui/combobox"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleQuestionMark } from "lucide-react"
import { Slider } from "../ui/slider"
import { ButtonLink } from "../ui/button-link"
import { TELEGRAM_BASE, WHATSAPP_BASE } from "../Contacts"

function pluralizeHours(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100

  if (mod10 === 1 && mod100 !== 11) return "час"
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "часа"
  return "часов"
}

const messengerOptions = [
  {
    value: "whatsapp",
    label: "Whatsapp",
    icon: (
      <Image
        className="size-5"
        placeholder="empty"
        src={whatsapp}
        alt="wa icon"
      />
    ),
  },
  {
    value: "telegram",
    label: "Телеграм",
    icon: (
      <Image
        className="size-5"
        placeholder="empty"
        src={telegram}
        alt="tg icon"
      />
    ),
  },
]

const boatOptions = orderedBoatsData.map(({ slug }) => {
  const capitalizedSlug = capitalize(slug)

  return {
    value: capitalizedSlug,
    label: capitalizedSlug,
  }
})

const chooseForMeVariant = "помочь с подбором"
boatOptions.unshift({ label: chooseForMeVariant, value: chooseForMeVariant })

export const BookingForm = () => {
  const methods = useForm({
    defaultValues: {
      messenger: "whatsapp",
      selectedBoat: chooseForMeVariant,
      duration: [2, 5],
      people: 2,
    },
  })

  const { messenger, duration, selectedBoat } = methods.watch()
  const [minDuration, maxDuration] = duration

  let durationText = ""
  if (minDuration === maxDuration) {
    durationText = `${minDuration} ${pluralizeHours(minDuration)}`
  } else {
    durationText = `от ${minDuration} до ${maxDuration} ${pluralizeHours(maxDuration)}`
  }

  const orderDetails = encodeURIComponent(
    `Здравствуйте! Желаю забронировать яхту:
• Яхта - ${selectedBoat && selectedBoat !== chooseForMeVariant ? selectedBoat : "помогите подобрать"}
• Длительность прогулки - ${durationText}`,
  )
  //   const orderDetails = encodeURIComponent(
  //     `Здравствуйте! Хочу арендовать яхту:
  // - Яхта: ${selectedBoat}
  // - Людей: ${people}
  // - Время: ${durationText}
  // - Бюджет: ${budget}
  // - Дата: ${date}`,
  //   )

  const submitHref = `${messenger === "telegram" ? TELEGRAM_BASE : WHATSAPP_BASE}?text=${orderDetails}`

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8">
          <div className="grid gap-3">
            <Label htmlFor="messenger">Куда</Label>
            <Combobox
              rules={{ required: "Выберите мессенджер" }}
              name="messenger"
              options={messengerOptions}
              placeholder="мессенджер"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="selectedBoat">Выбранная яхта</Label>
            <Combobox
              name="selectedBoat"
              options={boatOptions}
              placeholder="поможем с подбором"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="people">Количество пассажиров</Label>
            <Input name="people" type="number" rules={{ max: 10 }} />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Label htmlFor="duration">Длительность прогулки</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Минимальная длительность прогулки - 2 часа</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div>{durationText}</div>
              <Slider name="duration" min={2} max={24} step={1} />
            </div>
          </div>

          {/* <div className="grid gap-3">
            <Label htmlFor="phone-1">Телефон</Label>
            <Input id="phone-1" name="phone" placeholder="+7 ..." />
          </div> */}
        </form>
      </FormProvider>
      <DialogFooter>
        <DialogClose asChild>
          <Button size="lg" variant="secondary">
            Закрыть
          </Button>
        </DialogClose>
        <ButtonLink href={submitHref} target="_blank" size="lg">
          Готово
        </ButtonLink>
      </DialogFooter>
    </>
  )
}
