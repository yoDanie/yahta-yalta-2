import { Boats } from "@/components/Boats"
import { Cards } from "./(home-components)/Cards"
import { Intro } from "./(home-components)/Intro/Intro"

export default function Home() {
  return (
    <main className="flex flex-col">
      <Intro />
      <Cards />
      <Boats />
      {/* <Section title="Контакты">
        <Contacts />
      </Section> */}
      {/* <Reviews /> */}
    </main>
  )
}
