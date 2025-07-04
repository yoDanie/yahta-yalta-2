import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <Spinner
      withContainer
      size="l"
      containerClassName="h-[calc(100dvh-80px)]"
    />
  )
}
