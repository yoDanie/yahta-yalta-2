import cn from 'classnames'

import styles from './index.module.scss'

type BoatClauseMappingProps = {
  clauseMapping: Record<string, string | number | null | undefined>[]
  className?: string
  theme?: 'light' | 'dark'
}

export const BoatClauseMapping = ({
  clauseMapping,
  className,
  theme = 'light',
}: BoatClauseMappingProps) => {
  const isLightTheme = theme === 'light'
  return (
    <div className={cn(styles.root, className)}>
      {clauseMapping.map(
        ({ key, value }, index) =>
          value && (
            <div key={index} className={cn(styles.clause, !isLightTheme && styles.clauseDark)}>
              <div className={isLightTheme ? styles.keyLight : styles.keyDark}>{key}</div>
              <div className={isLightTheme ? styles.valueLight : styles.valueDark}>{value}</div>
            </div>
          ),
      )}
    </div>
  )
}
