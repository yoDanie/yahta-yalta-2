"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropsWithChildren } from "react"
import { Contacts } from "../Contacts"
import { BookingForm } from "./BookingForm"

export function BookingPopover({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent aria-describedby={undefined} className="sm:min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Способ связи</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="write" className="flex w-full flex-col gap-8">
          <TabsList className="w-full">
            <TabsTrigger value="call">Позвонить</TabsTrigger>
            <TabsTrigger value="write">Написать</TabsTrigger>
          </TabsList>

          <TabsContent value="call" className="flex justify-center">
            <Contacts />
          </TabsContent>

          <TabsContent value="write">
            <BookingForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
