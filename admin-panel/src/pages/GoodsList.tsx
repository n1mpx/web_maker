
import { useEffect, useState } from 'react'
import { getGoods } from '../api/goods'

type Good = {
  id: string
  title: string
  price: number
}

export default function GoodsList() {
  const [goods, setGoods] = useState<Good[]>([])

  useEffect(() => {
    getGoods().then(response => setGoods(response.data))
  }, [])

  return (
    <div>
      <h1>Список товаров</h1>
      <ul>
        {goods.map((good) => (
          <li key={good.id}>
            {good.title} — {good.price}₽
          </li>
        ))}
      </ul>
    </div>
  )
}
