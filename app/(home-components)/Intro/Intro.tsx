import { Button } from "@/components/ui/button"
import styles from "./intro.module.scss"
import { IntroWrapper } from "./IntroWrapper"
import bgImage from "./intro-1.jpg"
import { Image } from "@/components/Image"

export const Intro = () => {
  return (
    <IntroWrapper
      bgImage={
        <Image
          priority
          src={bgImage}
          alt="Интро картинка - аренда яхт и катеров в Ялте"
        />
      }
    >
      <div className={styles.content}>
        <div className="flex h-full w-[70%] flex-col items-center justify-between text-center text-shadow-lg/30">
          <div>
            <h1 className={styles.title}>Аренда яхты в Ялте</h1>
            <h2 className={styles.slogan}>
              Совершите настоящее
              <p>морское путешествие!</p>
            </h2>
          </div>

          <h3 className={styles.subtitle}>
            Покупайтесь на диких пляжах или в открытом, чистом море. Полюбуйтесь
            самыми красивыми местами Ялты из яхты, совершая морскую прогулку к
            замку Ласточкино гнездо, скалам Адалары, Медведь-горе, скале Дива...
          </h3>
          <Button>Подобрать яхту</Button>
        </div>
      </div>
    </IntroWrapper>
  )
}
