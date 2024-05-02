import { Filial, Orders} from '../assets/index'
export const sideBarItems = [
    {
        id: 1,
        icon: Orders,
        title: "Заказы",
        path: "/orders"
    },
    {
        id: 2,
        icon: Filial,
        title: "Филиалы",
        path: "/branches"
    }
]

export const f = new Intl.NumberFormat("en-EN").format;