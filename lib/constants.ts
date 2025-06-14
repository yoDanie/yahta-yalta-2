import SailIcon from 'icons/dark-sail-boat.svg'
import PeopleIcon from 'icons/users.svg'
import WalletIcon from 'icons/wallet2.svg'

export const HEADER_HEIGHT = 80

export const boatTypeMapping = {
  sailing: 'парусно-моторная',
  motor: 'моторная',
  catamaran: 'катамаран',
}

export const boatIconMapping = {
  capacity: PeopleIcon,
  price: WalletIcon,
  type: SailIcon,
}

export const dashChar = '—'

export const baseURL = 'https://yahta-yalta.vercel.app'
